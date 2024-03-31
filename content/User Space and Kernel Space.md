
User space are the applications and libraries.

Kernel space consists of the Syscall Interface, Kernel and Hardware.

Syscall is the interface to connect with the Linux kernel. Can be seen as the API towards the Linux kernel. The kernel then interfaces with the hardware.

Syscall interface provides functions such as getpid() and reboot() to libraries or applications.

Containerized applications can do direct sys calls to the syscall interface.

Links:

202403241143
