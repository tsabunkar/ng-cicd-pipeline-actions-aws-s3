# Tejas Sabunkar Portfolio

[![build status](https://github.com/coryrylan/angular-github-actions/workflows/Build/badge.svg)](https://github.com/tsabunkar/ng-portfolio/actions)

---

# Technologies to be used

- Angular
- Angular-Material
- C.I -> Github Actions and Protected Branch rules (To restrict on build failure)
- C.D -> Deploy in AWS
- Host : Godaddy url -> https://tsabunkar.in

---

# continuous integretion

- Git project > Actions
- Nodejs template for worflow
- copy + paste the content of .github/workflows/nodejs.yml for your nodejs projects -> to set-up C.I pipeline

---

# Rules added to protect Portfolio Repo:

- Github Actions added which will check the build process only. It will not restrict the push/PR if the build fails.
- In order to prevent the direct push to master branch and also verify PR to master must pass all C.I build process:
  - github hooks are added locally go to press CTRL + H (toggle hide/unhide) -> .git/hooks/ [create the copy of pre-push.sample file called: pre-push (removing .sample extension) then add the script https://gist.github.com/tsabunkar/86224fb8240afd46529b82b5bcb4f100 ]
  - Branch Protection Rule Added: Protect matching branches rule added for Master branch like:
    - Require pull request reviews before merging (this will prevent contributor who don't have admin/owner privilege cannot directly push to master branch)
    - Require status checks to pass before merging (this will ensure All build process in C.I is passed before enabling merging PR button ).

---

# Bypass git hooks locally and its solution

- Since we can break above local git hooks -> Using the flag --no-verify won’t trigger hooks.
- Also we cannot go to each user and ask them to configure/add git hooks folder, rather to automate this process :
  - \$ mkdir .githooks
  - \$ ls -a .git/hooks/ | grep -v ".sample" (find all the files which doesn't have .sample extension)
  - (Copy all your hooks file from .git/hooks to .githooks)
  - \$ git config core.hooksPath .githooks/ (change the hooks folder to githooks instead of .git/hooks)
  - git hooks are written in shell scripts (but for node u can use husky-> act as wrapper over shell scripts)
  - push this .githooks to your remote repo
  - Onces the developer takes the latest pull of your remote repo- ask them to execute this commands : git config core.hooksPath .githooks/ (In order to obtain the symbolic linkl b/w both of this direcotries, or rather add this scripts on git-pull/npm install)

---

# continuous deployment

## AWS CLI Configuration

- Install aws cli locally in ur linux :
  - \$ cd ~/tejas/other-apps/aws
  - \$ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  - \$ unzip awscliv2.zip
  - \$ cd aws
  - \$ sudo ./install
  - \$ aws --version
  - \$ which aws
- To check for aws latest update and update
  - \$ cd ~/tejas/other-apps/aws
  - \$ sudo ./aws/install --bin-dir /usr/local/bin --install-dir /usr/local/aws-cli --update (Update aws cli versio)
- To configure for aws for specific user/developer
  - Services > Security, Identity, & Compliance > IAM
  - Users
  - Tejas-Dev (Who current have admin access)
  - Security Credentials
  - Access Key (tab), If you have not downloaded Secrete access key in your local delete previous entry and create new accessKeys.csv file store in your local.
  - \$ aws configure
    - (enter your access key ID and Secret access key)
    - Default region name: us-east-1 [US East (N. Virginia)]
    - Default output format: json
  - \$ aws s3 ls

## Deploying to AWS S3 bucket when event is triggered in GitHub Actions

- Add new workflow aws.yml
- Github project > Settings > Secrets (tab) > add all AWS Secrets mentioned in aws.yml file like - AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, etc
