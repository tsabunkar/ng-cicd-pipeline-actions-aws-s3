# Tejas Sabunkar Portfolio

[![build status](https://github.com/coryrylan/angular-github-actions/workflows/Build/badge.svg)](https://github.com/tsabunkar/ng-portfolio/actions)

---

<img src='https://github.com/byangular/angular-github-actions-s3-deploy/raw/images/architecture.png' border='0' alt='architecture' />

Implementing automatic distribution of [AWS](https://aws.amazon.com/ko/) product [S3](https://aws.amazon.com/ko/s3/) through [GitHub Actions](https://github.com/features/actions) operation.

Notifications over [Slack](https://slack.com/intl/en-kr/) using through [GitHub Actions](https://github.com/features/actions)

> Create smart aws diagrams [Cloudcraft](https://cloudcraft.co/)

<br />

## What is AWS ?

Whether you're looking for compute power, database storage, content delivery, or other features with services operated by Amazon,

AWS has services to help you build sophisticated applications with increased flexibility, scalability, and reliability.

## What is S3 ?

Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance.

This means customers of all sizes and industries can use it to store and protect any amount of data for a range of use cases, such as websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics.

▾ Amazon S3 works

<img src='https://github.com/byangular/angular-github-actions-s3-deploy/raw/images/s3-works.png' border='0' alt='s3-works' />

## What is GitHub Actions ?

GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub.

Make code reviews, branch management, and issue triaging work the way you want.

## What is Slack ?

Slack is a collaboration hub that can replace email to help you and your team work together seamlessly.

It’s designed to support the way people naturally work together, so you can collaborate with people online as efficiently as you do face-to-face.

---

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

## Deploying to AWS S3 bucket when event is triggered in GitHub Actions

- Add new workflow aws.yml
- Github project > Settings > Secrets (tab) > add all AWS Secrets mentioned in aws.yml file like - AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, etc
- Create a aws s3 bucket :
  - Services > S3 > Create-bucket > tsabunkar-portfolio >
  - Disable - block public access > Create bucket
  - Permissions > Bucket Policy > (Add the json schema)
  - Properties > Static Web hosting > Use this bucket to host a website : index.html
- Onces bucket is created add the bucket name in your nodejs.yml file, syntax: s3://bucket-name/ (ex- s3://tsabunkar-portfolio/)

- NOTE: You can create AWS S3 bucket and but cannot configure this bucket with webhost services, making public policy as- public, Disabling- block public access. For this you need to create the aws s3 bucket manually.

---
