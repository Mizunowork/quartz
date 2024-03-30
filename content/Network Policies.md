
By default all pods can communicate with each other.

If you apply a policy rule, ONLY that traffic is allowed.

![[Pasted image 20240324130258.png]]

In this image, they are two separate rules because they are two arrays. 

The second to: applies to the same namespace because no namespaceSelector is given here.

# Multiple Network Policies

If you have multiple network policies targeting the same pods:

- The order does not matter
- Policies will be merged

[[Alleviating confusion about the to field in network policies]]

## Links:

[[Kubernetes]]
[[networking-computers]]
**part of**:: [[CKS]]

202403241249