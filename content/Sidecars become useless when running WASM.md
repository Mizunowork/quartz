# Sidecars become useless when running WASM

#publish


Because you cannot mix containers and WASM in the same pod, you can't run sidecar containers on WASM applications in Kubernetes. This makes service meshes that rely on sidecars like Istio useless.

