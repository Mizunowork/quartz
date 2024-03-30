```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: my-app-network-policy
  namespace: default
spec:
  podSelector: {} # select all pods in the same namespace
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector: {} 
  egress:
  - to:
    - podSelector: {}

```

If no other policies are applied, this is the only allowed traffic. Therefore, this policy will deny all other traffic.

We are targeting all pods within the same namespace with the first podSelector.

Then, under the from and to elements, we are only allowing pods in the same namespace because we use the podselctor for all pods

## Links:

**part of**:: [[Network Policies]]
[[CKS]]

202403251057