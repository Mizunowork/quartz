At least as far as I've seen up until now:

These commands run two containers in the same PID namespace.

Can check if they are running in the same namespace by running the exec.

```bash
podman run --name app1 -d nginx:alpine sh -c 'sleep infinity'
podman run --name app2 --pid=container:app1 -d nginx:alpine sh -c 'sleep infinity'

```

```bash
controlplane $ podman exec app2 ps aux
PID   USER     TIME  COMMAND
    1 root      0:00 sleep infinity
    2 root      0:00 sleep infinity
    3 root      0:00 ps aux
controlplane $ podman exec app1 ps aux
PID   USER     TIME  COMMAND
    1 root      0:00 sleep infinity
    2 root      0:00 sleep infinity
    4 root      0:00 ps aux
```


The sleep command appears twice in each container with a different PID.

Also note that there are multiple processes running as root.

## Links:

[[Podman]]
[[docker]]

202403241224