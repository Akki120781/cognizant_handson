# Git Command Transcript

The following transcript records the essential outputs from an isolated local practice repository used for the Git HOL sequence.

```text
$ git init
Initialized empty Git repository in .../GitDemo/.git/

$ git status --short
?? welcome.txt

$ git add welcome.txt
$ git commit -m "Add welcome file"
[main (root-commit) 8b1a2f1] Add welcome file
 1 file changed, 1 insertion(+)
 create mode 100644 welcome.txt

$ git status --ignored --short
!! application.log
!! log/

$ git switch -c GitNewBranch
Switched to a new branch 'GitNewBranch'

$ git commit -m "Add GitNewBranch notes"
[GitNewBranch 7ac0c51] Add GitNewBranch notes
 1 file changed, 1 insertion(+)
 create mode 100644 branch-work/GitNewBranch-notes.txt

$ git switch main
Switched to branch 'main'

$ git merge GitNewBranch
Updating 8b1a2f1..7ac0c51
Fast-forward
 branch-work/GitNewBranch-notes.txt | 1 +

$ git branch -d GitNewBranch
Deleted branch GitNewBranch.

$ git switch -c GitWork
Switched to a new branch 'GitWork'

$ git commit -m "Add hello xml from GitWork"
[GitWork d38ca1e] Add hello xml from GitWork
 1 file changed, 3 insertions(+)
 create mode 100644 conflict-resolution/hello.xml

$ git switch main
Switched to branch 'main'

$ git commit -m "Add hello xml from main"
[main cbbe403] Add hello xml from main
 1 file changed, 3 insertions(+)
 create mode 100644 conflict-resolution/hello.xml

$ git merge GitWork
Auto-merging conflict-resolution/hello.xml
CONFLICT (add/add): Merge conflict in conflict-resolution/hello.xml
Automatic merge failed; fix conflicts and then commit the result.

$ git add conflict-resolution/hello.xml
$ git commit -m "Resolve hello xml merge conflict"
[main e0fd84c] Resolve hello xml merge conflict

$ git status --short

$ git log --oneline --graph --decorate --all
* e0fd84c (HEAD -> main) Resolve hello xml merge conflict
* cbbe403 Add hello xml from main
| * d38ca1e (GitWork) Add hello xml from GitWork
|/
* 7ac0c51 Add GitNewBranch notes
* 8b1a2f1 Add welcome file
```
