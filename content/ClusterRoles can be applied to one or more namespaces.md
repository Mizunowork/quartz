
A ClusterRole is available to the entire cluster. But you will only receive these permissions in all namespaces if a **Cluster**Rolebinding is created.

You can also create a normal RoleBinding, which is a namespaced resource. Then the permissions will only apply to that namespace, even though it is a ClusterRole. 

You can also have RoleBindings from multiple namespaces and the ClusterRole will only apply to those namespaces.


## Links:



202404011016