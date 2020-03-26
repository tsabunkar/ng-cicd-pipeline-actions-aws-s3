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

# Rules added to protect Portfolio Repo:

- Github Actions added which will check the build process only. It will not restrict the push/PR if the build fails.
- In order to prevent the direct push to master branch and also verify PR to master must pass all C.I build process:
  - github hooks are added locally go to press CTRL + H (toggle hide/unhide) -> .git/hooks/ [create the copy of pre-push.sample file called: pre-push (removing .sample extension) then add the script https://gist.github.com/tsabunkar/86224fb8240afd46529b82b5bcb4f100 ]
  - Branch Protection Rule Added: Protect matching branches rule added for Master branch like:
    - Require pull request reviews before merging (this will prevent contributor who don't have admin/owner privilege cannot directly push to master branch)
    - Require status checks to pass before merging (this will ensure All build process in C.I is passed before enabling merging PR button ).

---
Changes done by tejassabunkar-> master branch
