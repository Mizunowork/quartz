
The Linux Kernel has a way to isolate processes, which can be used to isolate containers.

You can limit PID from seeing other processes. This is called the PID namespace.

The mount namespace restricts access to /mnt and root filesystem.

Networking can be isolated in the networking namespace. Can be configured to only access certain network devices and limit the visibility of traffic or endpoints.

User IDs can be different between namespaces. The root user (0) can be different between namespaces.

## Links:

**from**:: [[CKS Video Course]]
**related research**:: [[What Have Namespaces Done for You Lately?]]
**related to**:: [[Container Isolation]]

202403241155