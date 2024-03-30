
emptyDir volumes are only deleted when the pod is removed from a node. If you have a pod where containers are constantly crashing, the data will still persist on the emptyDir volume.

## Links:



202403300538