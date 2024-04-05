
Each Service Account receives a token which is mounted in the pod at 

`/var/run/secrets/kubernetes.io/serviceaccount`

You can cat the token and inspect it at [JSON Web Tokens - jwt.io](https://jwt.io/)

The auto mounting can be disabled by configuring either the Service account or the pod as follows:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-robot
automountServiceAccountToken: false
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  serviceAccountName: build-robot
  automountServiceAccountToken: false
  ...
```

## Links:



202404050951