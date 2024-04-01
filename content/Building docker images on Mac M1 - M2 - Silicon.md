
Must include `
```bash
docker build --platform amd64 .
```

or add this in dockerfile

```yaml
FROM --platform=amd64 debian
...
```
## Links:
[creating amd64 docker image on m1 - Stack Overflow](https://stackoverflow.com/questions/68881910/creating-amd64-docker-image-on-m1)


202403311844