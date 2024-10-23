import gzip
import json
import os
import sys
from itertools import islice
from typing import Dict, List

import git # pip3 install gitpython # https://gitpython.readthedocs.io/en/stable/intro.html


# Used if no path is specified in the command line arguments
DEFAULT_REPO_PATH = './linux.git'


def chunks(data, size):
    """
    Yield successive n-sized chunks from data.
    """
    iterator = iter(data)
    for first in iterator:
        yield [first] + list(islice(iterator, size - 1))


def write_gzip_file(file_path, data):
    """
    Write data to a gzip file.
    """
    with gzip.open(file_path, 'wt') as f:
        json.dump(data, f)
        print(f"Successfully wrote to {file_path}")


def get_tags_json(tags) -> (List[Dict], Dict):
    """
    Construct JSON objects for tags.

    Args:
        tags (Iterable[git.TagReference] or Iterable[git.HeadReference]): An iterable of tags or branches.

    Returns: Tuple[List[Dict], Dict]: A tuple of list of tags in JSON format, and a dictionary mapping tag commit IDs
    to their respective tags or branches.
    """
    tags_json = []
    tag_id_to_tag_map = {}
    for tag in tags:
        try:
            tag_json = {
                "name": tag.name,
                "commitId": tag.commit.hexsha
            }
            tag_id_to_tag_map[tag.commit.hexsha] = tag_json
            tags_json.append(tag_json)
        except:
            print("error during parsing tag/branch ", tag, " ignoring")
    return tags_json, tag_id_to_tag_map


def get_commits_json(repo: git.Repo, branch_id_to_branch_map: Dict, tag_id_to_tag_map: Dict) -> List[Dict]:
    """
    Construct JSON objects for commits.
    """
    commits_json = []
    for commit in repo.iter_commits('--all'):
        commit_json = {
            "summary": commit.summary,
            "committed_date": commit.committed_date,
            "author_name": commit.author.name,
            "author_email": commit.author.email,
            "committer_name": commit.committer.name,
            "committer_email": commit.committer.email,
            "commit_id": commit.hexsha,
            "parent_commits": [parent.hexsha for parent in commit.parents]
        }

        if commit.hexsha in tag_id_to_tag_map:
            tag_json = tag_id_to_tag_map[commit.hexsha]
            commit_json["tag"] = tag_json["name"]
            tag_json["commitMessage"] = commit.summary
            tag_json["commitTime"] = commit.committed_date

        if commit.hexsha in branch_id_to_branch_map:
            branch_json = branch_id_to_branch_map[commit.hexsha]
            commit_json["branch"] = branch_json["name"]
            branch_json["commitMessage"] = commit.summary
            branch_json["commitTime"] = commit.committed_date

        commits_json.append(commit_json)
    commits_json.sort(key=lambda x: x['committed_date'], reverse=True)
    return commits_json


def add_date_order(repo_json):
    """
    Add commit date order to branches, and tags.
    # commits are sorted by date, add to tags and branches field 'dateOrder' being the index of the commit in the commits list.
    """
    commits = repo_json["commits"]
    for tag in repo_json["tags"]:
        tag["dateOrder"] = next((i for i, commit in enumerate(commits) if commit["commit_id"] == tag["commitId"]), None)
    for branch in repo_json["branches"]:
        branch["dateOrder"] = next((i for i, commit in enumerate(commits) if commit["commit_id"] == branch["commitId"]), None)


def get_repo_json(repo: git.Repo) -> Dict:
    """
    Construct JSON object for repository.
    Returns:
        Dict: A dictionary containing branches, tags, and commits in JSON format.
    """
    repo_json = {}
    repo_json["branches"], branch_id_to_branch_map = get_tags_json(repo.branches)
    repo_json["tags"], tag_id_to_tag_map = get_tags_json(repo.tags)
    repo_json["commits"] = get_commits_json(repo, branch_id_to_branch_map, tag_id_to_tag_map)
    print("Number of commits: ", len(repo_json["commits"]))
    print("Number of branches: ", len(repo_json["branches"]))
    print("Number of tags: ", len(repo_json["tags"]))
    add_date_order(repo_json)
    return repo_json


def write_chunked(repo_path, repo_json, CHUNK_SIZE=10000):
    """
    Returns:
     Number: number of chunks.
    """
    branches_and_tags_json = {
        "branches": repo_json["branches"],
        "tags": repo_json["tags"]
    }
    create_dir_cmd = f'mkdir {repo_path}_chunked'
    os.system(create_dir_cmd)
    repo_path = f'{repo_path}_chunked/{repo_path}'
    branches_and_tags_json_path = f'{repo_path}_branches_and_tags.json.gz'
    write_gzip_file(branches_and_tags_json_path, branches_and_tags_json)


    # Save commits to separate files
    commit_chunks = list(chunks(repo_json["commits"], CHUNK_SIZE))
    for i, chunk in enumerate(commit_chunks):
        commits_json_path = f'{repo_path}_commits_{i + 1}.json.gz'
        write_gzip_file(commits_json_path, chunk)
    return len(commit_chunks)


def write_output(repo_path, repo_json, chunked=False):
    """
    Returns:
        Number: number of files created.
    """
    if chunked:
        return write_chunked(repo_path, repo_json) + 1
    else:
        write_gzip_file(repo_path + '.json.gz', repo_json)
        return 1


def main(repo_path: str, chunked=False):
    """
    Main execution function.

    Args:
        repo_path (str): The path to the git repository.

    """
    repo = git.Repo(repo_path)
    repo_json = get_repo_json(repo)
    write_output(repo_path, repo_json, chunked=chunked)


if __name__ == '__main__':
    repo_path = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_REPO_PATH
    main(repo_path)
