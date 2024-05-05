
I used the following action from the marketplace for increasing the versions based on conventional commits:

[Semver Conventional Commits · Actions · GitHub Marketplace](https://github.com/marketplace/actions/semver-conventional-commits)

In the example below, I'm running a separate job to increase the version based on the latest tag of the repository. The job has an output which I can use later to tag the images themselves.

```yaml
jobs:
  prepare_tag:
    outputs:
      tag: ${{ steps.semver.outputs.next }}
    permissions:
      contents: write

    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # Defaults to patch version, will bump minor on "feat" commit

      - name: Get Next Version
        id: semver
        uses: ietf-tools/semver-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          branch: master
          patchAll: true

      - name: Push tag
        id: tag_version
        uses: mathieudutour/github-tag-action@v6.2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          custom_tag: ${{ steps.semver.outputs.next }}
          tag_prefix: ""

```


The Get Next Version step increments the version based on the configuration provided. I used the `patchAll: true` setting to always default on a patch incrementation if the word "feat" is not in the commit. If the commit would contain "BREAKING CHANGE", the major version would be incremented.

To push the new version to the current repo, I used this action:

[GitHub Tag · Actions · GitHub Marketplace](https://github.com/marketplace/actions/github-tag)

Since the semver-action already adds a "v" to the tag, I adjusted the `tag_prefix` to `""`.

## Links:


202404291453