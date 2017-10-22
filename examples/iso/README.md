# iso example

This is an example of one way to write an isomorphic react app with IOperator.

The key idea is to keep the application pure - in this case, agnostic of client or server concerns.

- Business logic belongs in `app.js`
- Infrastructure code belongs in `server.js` and `client.js`

# Starting the server

    make start

# Starting the client

    make
    open dist/index.html