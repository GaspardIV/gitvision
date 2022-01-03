// import Http from h
// const API_ROOT = '/your-api-root';

class ExampleProvider {

    constructor() {
        // ----------------------
        // create a http client instance
        // a good one is https://github.com/mzabriskie/axios
        // this.http = Http.create();
    }

    getAll() {
        // ----------------------
        // API Call
        // this.getAllDataPromise = this.http.get(API_ROOT);
        this.getAllDataPromise = [1, 2, 3, 4, 5, 6,7 ,8 , 9];

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
}

// ----------------------
// Expose public api
export default ExampleProvider;
