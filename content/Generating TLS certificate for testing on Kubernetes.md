openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

This generates a cert.pem and key.pem

Then run

`k create secret tls secure-ingress --cert=cert.pem --key=key.pem`


## Links:



202403291923