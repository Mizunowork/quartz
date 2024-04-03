Users don't exist in the cluster as a resource. Certificates are generated and a single user will use those certificates to authenticate with the API server.

he cloud provider will handle issuing these certificates when the credentials / kubeconfig is retrieved.

The client certificate will be signed by the cluster CA, and the CN is the username.

![[Pasted image 20240401105713.png]]

## Links:



202404011056