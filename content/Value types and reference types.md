
There are two categories of types types of variables: value types and reference types.

Variables of value type store their contents in the stack. When a program runs on the CPU, the code is allocated memory, and this storage space is called the stack, or stack frame or activation frame. 

Reference variables store their memory in a region called the heap. This is shared across the different applications running on the OS. When running .NET applications, the .NET runtime communicates with the OS to request addresses where it can store the value. 

This memory address is returned to the variable. When the reference type variable is used in the code, the value is looked up by the memory address stored in the variable and the information is retrieved from memory. 

## Links:

[Exercise - Discover reference types - Training | Microsoft Learn](https://learn.microsoft.com/en-us/training/modules/csharp-choose-data-type/5-exercise-reference-types)


202404171405