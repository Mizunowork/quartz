
Enabled by setting the following in the apiserver manifests. Enabled by default on kubeadm clusters.

`kube-apiserver --enable-admission-plugins=NodeRestriction` 

The kubelet runs on every node and communicates with the API server. Setting this flag will ensure that the kubelet can only modify its own node, and only pods that are running on that node.

If unset, each kubelet can modify each node.

This way we can isolate workloads using labels.

## Links:



202404051506