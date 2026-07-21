# HOL 4 - Conflict Resolution

## Objective

Create a controlled merge conflict, resolve it manually, commit the resolution and clean up temporary conflict files.

## Commands

```bash
git status

git switch -c GitWork
mkdir -p conflict-resolution
cat > conflict-resolution/hello.xml <<'XML'
<message>
  <text>Hello from GitWork branch</text>
</message>
XML
git add conflict-resolution/hello.xml
git commit -m "Add hello xml from GitWork"

git switch main
cat > conflict-resolution/hello.xml <<'XML'
<message>
  <text>Hello from main branch</text>
</message>
XML
git add conflict-resolution/hello.xml
git commit -m "Add hello xml from main"

git diff main..GitWork
git merge GitWork
```

Git reports a conflict in `conflict-resolution/hello.xml`. Resolve it by keeping the final agreed content:

```xml
<message>
  <text>Hello from the resolved Git hands-on merge</text>
  <source>Main and GitWork changes were reviewed together</source>
</message>
```

Finish the merge:

```bash
git add conflict-resolution/hello.xml
git commit -m "Resolve hello xml merge conflict"
printf "*.orig\n" >> .gitignore
git add .gitignore
git commit -m "Ignore merge backup files"
git branch -d GitWork
```

## Notes

- Merge conflict markers are removed before staging the resolved file.
- `*.orig` is ignored because merge tools can create backup files during conflict resolution.
