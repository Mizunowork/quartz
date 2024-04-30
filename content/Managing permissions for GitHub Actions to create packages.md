- On the main page of your organization, go to Packages
- Go to the package and open "Package settings" in the right sidebar
- Under Manage Actions access, add the repo as the source
- Make sure to allow Write acces

![[Pasted image 20240429145500.png]]

In the source repo, where the GitHub Actions Workflow is running, go to settings, actions, select the workflow, and add write permission there too.

![[Pasted image 20240429151841.png]]

Finally, we also need to add permissions in the workflow yaml:

```yaml
build_and_push:
    name: Build image & push
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
```

See also:

[github actions - ERROR: denied: installation not allowed to Create organization package - Stack Overflow](https://stackoverflow.com/questions/76607955/error-denied-installation-not-allowed-to-create-organization-package)

[denied: installation not allowed to Create organization package · Issue #606 · docker/build-push-action (github.com)](https://github.com/docker/build-push-action/issues/606)



## Links:



202404301753