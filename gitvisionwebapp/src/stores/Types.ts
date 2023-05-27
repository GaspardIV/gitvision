
export type Repo = {
  url: string
  title: string
  description: string
  size: string
  branchingStrategy: string
  notes: string
  assetPath: string
  iconUrl?: string
}
export class Commit {
  constructor(
    public author: string,
    public authorMail: string,
    public branch: string,
    public committer: string,
    public committerMail: string,
    public id: string,
    public parentsIds: string[],
    public short: string,
    public time: Date,
    public tag: string
  ) {}
}


export class Branch {
  constructor(
    public name: string,
    public commitId: string,
    public commitMessage: string,
    public commitTime: Date
  ) {}
}

export class Tag {
  constructor(
    public tagId: string,
    public commitId: string,
    public tag: string,
    public commitMessage: string,
    public commitTime: Date
  ) {}
}
