# HTTP Duck

Using HTTPDuck you'll be able to define HTTP/S receptors and interceptors. So you can analyse any HTTP transaction.

## Features 
![HTTP Receptor](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/http_receptor.jpg)
- #### Record HTTP requests
    - Define HTTP responses for recorded requests
        - Custom HTTP Headers
        - Response body in plain text
        - Response body in uploadable binary format
    - Customizable HTTP response status
    - Customizable HTTP response message
    - Supported HTTP methods
        - GET
        - POST
        - PUT
        - DELETE
    - Allows view/download recorded HTTP requests

![HTTP Interceptor](https://raw.githubusercontent.com/kdkanishka/httpduck/master/docs/images/http_interceptor.jpg)

- #### Record HTTP transactions
    - Acts like a man in the middle for a HTTP transactions
    - Allows defining HTTP request forwarding
    - Provide a user friendly view for inspecting recorded HTTP transaction
        - Original request including HTTP body/headers
        - Forwaded request with same functionallity
        - Allows downloading the payloads

## Implementation
HTTPDuck is written in JavaScript(NodeJS) using express framework.

MongoDB is used to persist all the data.

## Deployment

### Configuration using environment variables

`NODE_ENV` : 'production' means the production environment

`APP_BASE_URL` : Defines the base URL for the application. Reception/Interception urls are generated based on this.

`APP_TEMP_DIR` : Temporary file path that is used to manipulate files in basic operations.

## User Guide
- [How to record a HTTP request](https://github.com/kdkanishka/httpduck/blob/master/docs/receptor.md)
- [Act like a man in the Middle for a HTTP transaction](https://github.com/kdkanishka/httpduck/blob/master/docs/interceptor.md)

## Support / Contact
Having troubles setting up HTTPDuck ? Contact me via kdkanishka@gmail.com .

## Contributions
Your contributions are welcome. Please feel free to suggest improvements, report bugs and new features :) 
![](https://sstatic1.histats.com/0.gif?4201594&101)
