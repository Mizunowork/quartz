
When you build an image locally using `docker build` it will be added to the image registry on your workstation. 

You can pull it into the Rancher Desktop Kubernetes cluster as follows:

`kubectl run zk --image=zettelkasten-server:latest --image-pull-policy=Never`

The image pull policy of Never will prevent the kubelet from trying to pull the image. You are giving the instruction that the image is somehow already present, and this is true because it's available in the Rancher Desktop registry. Pretty clean. And it is a nice workflow in my opinion.

## Links:



202404010807