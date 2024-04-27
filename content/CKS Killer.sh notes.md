
To list constraints, first look at CRDS

k get crd

The constraints show the statuses:

k get constraints

But to do adjust the actual constraints, you need to edit the constrainttemplate.

k edit constrainttemplate 

# Apparmor

Very important! 

In k8s docks 1.30 it is configured differently!!!

NOT through annotations anymore, but through securityContext:

# Hacking secrets

I knew I had to curl as service account but there's no way you can do this udring hte exam

```bash
curl https://kubernetes.default/api/v1/namespaces/restricted/secrets -H "Authorization: Bearer $(cat /run/secrets/kubernetes.io/serviceaccount/token)" -k
```



Links:

202404201346
