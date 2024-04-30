One of the problems I needed to solve was that I needed build multiple images, but I didn't want to have a code block for each. After some research I found a way to loop over multiple values in GitHub Actions using matrices.

In the example below, I set three variables in the matrix and each of these are called in the Build and push step.

```yaml
  build_and_push:
    permissions:
      contents: write
      packages: write

    runs-on: ubuntu-latest

    strategy:
      matrix:
        include:
          - image: ghcr.io/ssi-dk/sap-web
            dockerfile: app/Dockerfile
            path: app
          - image: ghcr.io/ssi-dk/sap-api
            dockerfile: web/Dockerfile
            path: web
          - image: ghcr.io/ssi-dk/bifrost-queue-broker
            dockerfile: bifrost/bifrost_queue_broker/Dockerfile
            path: bifrost/bifrost_queue_broker

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      # loops over all images in the matrix defined on top

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: ${{ matrix.path }}
          platforms: linux/amd64
          tags: ${{ matrix.image }}:${{ needs.prepare_tag.outputs.tag }}
          file: ${{ matrix.dockerfile }}
          push: true

```


## Links:

[Using a matrix for your jobs - GitHub Docs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)

202404291839