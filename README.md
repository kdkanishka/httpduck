# HTTP Duck

Using HTTPDuck you'll be able to define HTTP/S receptors and interceptors. So you can analyse any HTTP transaction.

## Features 
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

## User Guide
- How to record a HTTP request
- Act like a man in the Middle for a HTTP transaction

## Support / Contact
Having troubles setting up HTTPDuck ? Contact me via kdkanishka@gmail.com .

## Contributions
Your contributions are welcome. Please feel free to suggest improvements, report bugs and new features :) 

`NODE_ENV` : 'production' means the production environment

`APP_BASE_URL` : Defines the base URL for the application. Reception/Interception urls are generated based on this

`APP_TEMP_DIR` : Temporary file path that is used to manipulate files in basic operations

