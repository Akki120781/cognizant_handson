# HOL 2 - Ignore Log Files and Log Folders

## Objective

Use `.gitignore` to keep generated log files and log folders out of version control.

## Commands

```bash
touch application.log
mkdir log
touch log/server.log
git status --short

printf "*.log\nlog/\n" >> .gitignore
git add .gitignore
git status --short
git commit -m "Add log ignore rules"
```

## Verification

```bash
git status --ignored --short
```

Expected result:

```text
!! application.log
!! log/
```

Only `.gitignore` is staged and committed. The generated log files remain untracked and ignored.
