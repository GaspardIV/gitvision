1. **Install GitPython:**
   The script requires the `gitpython` package, which also includes `gitdb` and `smmap` as dependencies. You can install `GitPython` using pip:

    ```bash
    pip install gitpython
    ```

2. **Download the Python script:**
   To download the 'tool.py' script, please follow these steps:

   1. download 'tool.py' file on GitHub at this URL: https://github.com/GaspardIV/gitvision/blob/main/tool/tool.py
   
   You can also clone the whole repository.
3. **Clone the Git repository:**
   Clone the repository you want to analyze. For instance:

    ```bash
    git clone REPOSITORY_URL
    ```

   This command will clone the repository into a folder named after the repository in your current directory.

4. **Generate data:**
   To generate data from the cloned Git repository, run the Python script and provide the path to the repository as a command-line argument:

    ```bash
    python3 tool.py <path_to_your_git_repository>
    ```

   After running the script, a `.json.gz` file will be created in the same directory.

5. **Use the data:**

   - For `gitvis.web.app`: Go to [gitvis.web.app](https://gitvis.web.app) and upload the `.json.gz` file at the bottom of the website.

   - For building from sources`gitvisionwebapp`: First, you need to clone and build `gitvisionwebapp` from its sources. Once done, rename the generated `.json.gz` file to `own.json.gz` and paste it into `gitvisionwebapp/public/repos`. Then, go to `localhost:<your_port>/own` in your web browser. Alternatively you can go to `localhost:port` and upload the `.json.gz` file at the bottom of the website.
