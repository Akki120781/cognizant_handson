# HOL 5 - Cleanup and Push

## Objective

Confirm the repository is clean, synchronize with the remote branch and push completed work.

## Commands

```bash
git status --short
git branch -a
git pull origin main
git status
git push origin main
```

## Verification Checklist

- `git status --short` prints no tracked file changes before pulling.
- Local branch is `main`.
- Completed commits are visible in `git log --oneline`.
- `git push origin main` completes without rejected updates.
