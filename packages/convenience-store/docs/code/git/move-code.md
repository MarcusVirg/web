# Move Code to New Repository

Moving code to a new repository is really easy and can be done with a few git commands

## Setting New Origin

The first step is to change the origin url using this command:

```sh
git remote set-url origin <remote_url>
```

Replace `<remote_url>` with the url of the new repository.

You can verify your change was successful with this command:

```sh
git remote -v
```

Finally you can push your code up using:

```sh
git push
```

You should now see code in the new repository.

## Resetting Commits (Optional)

Sometimes when moving to a new repository, you may want to start fresh with a new commit history.
Doing the steps above does move the code to a new repo but all the commit history comes along with it.

If you would like to start from scratch and squash all the commits on the main branch run this command:

```sh
git reset $(git commit-tree HEAD^{tree} -m "Some initial commit")
```

`git commit-tree HEAD^{tree}` grabs the tip of your current branch and then creates a new commit object with an optional message.

`git reset` just resets the current branch to this new commit object.

Using these commands works a lot better than trying to do a rebase, especially if you have a large number of commits. It is also really fast!

Once you run these commands you will have to force push back into your repository using:

```sh
git push -f
```

This will force push your new commit object up to the current branch on origin.

You should now only see your one new commit in the repository.
