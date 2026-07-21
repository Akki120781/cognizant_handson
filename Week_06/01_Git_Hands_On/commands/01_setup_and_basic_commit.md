# HOL 1 - Git Setup and Basic Commit

## Objective

Configure Git, create a repository, add a starter file, commit it, pull from the remote and push the local branch.

## Commands

```bash
git --version
git config --global user.name "Akki"
git config --global user.email "akki@example.com"
git config --global core.editor "notepad++ -multiInst -notabbar -nosession -noPlugin"

mkdir GitDemo
cd GitDemo
git init
git status

printf "Welcome to Git hands-on practice.\n" > welcome.txt
git add welcome.txt
git commit -m "Add welcome file"

git remote add origin https://github.com/Akki120781/cognizant_handson.git
git branch -M main
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Notes

- `git status` is used before and after staging to confirm the working tree state.
- `git pull` is run before pushing so local work is integrated with the remote branch.
- Notepad++ is configured as the default editor for commit message editing on Windows.
