# iso example

Here's a way to write isomorphic react apps with IOperator.

The key idea is to keep the application pure - in this case, agnostic of client or server concerns.

- Business concerns belong in `app.js`
    - App logic devoid of infrastructure concerns
    - Pure react view components
- Infrastructure concerns devoid of business logic belong in:
    - `server.js` for the HTTP-server (using expressjs)
    - `client.js` for the browser javascript single page app

# Starting the server

    make start

# Starting the client

    make
    open dist/index.html