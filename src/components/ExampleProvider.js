// import Http from h
// const API_ROOT = '/your-api-root';

import axios from "axios";

class ExampleProvider {
    owner;
    repo;

    constructor(owner, repo) {
        this.owner = owner;
        this.repo = repo;
    }

    async getBranch(branch="master") {


        let res = await axios.get(`https://api.github.com/repos/${this.owner}/${this.repo}/commits?sha=${branch}`)
        console.log(res.data)
        // ----------------------
        // API Call
        // this.getAllDataPromise = this.http.get(API_ROOT);
        this.getAllDataPromise = res.data;

  //       kacperkonecki@Kacpers-Mac-mini ~ % curl \
  // -H "Accept: application/vnd.github.v3+json" \
  // https://api.github.com/repos/octocat/hello-world/branches

        // kacperkonecki@Kacpers-Mac-mini ~ % curl \
        // -H "Accept: application/vnd.github.v3+json" \
        //  "https://api.github.com/repos/octocat/hello-world/commits?sha=master"

        // kacperkonecki@Kacpers-Mac-mini ~ % curl \
  // -H "Accept: application/vnd.github.v3+json" \
  //  "https://api.github.com/repos/octocat/hello-world/commits?sha=test"

        // ----------------------
        // return promise
        return this.getAllDataPromise;
    }

    async getAllBranches() {
        let res = await axios.get(`https://api.github.com/repos/${this.owner}/${this.repo}/branches`)
        return res.data;
    }
}

// ----------------------
// Expose public api
export default ExampleProvider;
