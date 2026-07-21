# HOL 3 - Branching and Merge

## Objective

Create a feature branch, commit branch-specific work, compare the branch with `main`, merge it and delete the branch after the merge.

## Commands

```bash
git status
git branch

git switch -c GitNewBranch
mkdir -p branch-work
printf "Work completed on GitNewBranch.\n" > branch-work/GitNewBranch-notes.txt
git add branch-work/GitNewBranch-notes.txt
git commit -m "Add GitNewBranch notes"

git branch -a
git switch main
git diff main..GitNewBranch
git merge GitNewBranch
git log --oneline --graph --decorate --all
git branch -d GitNewBranch
```

## Notes

- `git diff main..GitNewBranch` shows the file changes that exist on the branch before the merge.
- `git log --oneline --graph --decorate --all` gives a compact view of branch movement and merge history.
- The branch is deleted only after the merge succeeds.
