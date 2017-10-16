# iox

An exploration of the Haskell IO patterns, in pure Javascript.

## What?

Instead of passing dependencies to your functions, instead arrange for them return:
- A description of what IO operation they would like carried out.
- What to do after the IO operation has completed.

For example:

    function lowerCaseInput() {
        return { io: 'read-file', file: '/etc/hosts', then: (str) => str.toLowerCase() }
    }

So how do you run this? Check out the full example at [examples/lowercase-file.js](examples/lowercase-file.js)

## Why?

Functions that perform input & output operations are usually quite hard to test. (As opposed to pure functions)
- You might use mocking techniques - painful.
- You might use dependency injection (to inject mocks and genuine implementations)

Dependency injection can be problematic because you have to pass your dependencies all the way through your function call hierarchy. With iox, your functions compose easier because you're never passing down dependencies.

## Influences
- Haskell IO Monad
- Purescript Effects, Aff, and IO
- funfix's IO type (https://github.com/funfix/funfix)
- From dependency injection to dependency rejection (http://blog.ploeh.dk/2017/01/27/from-dependency-injection-to-dependency-rejection/)


## The examples

The io1.js - ioN.js files show how to perform the following imperative pseudocode using the IO pattern:

    while the queue has messages to read:
        read the message
        write the message to a file
        log that we wrote the message to a file

This is typical of any backend system that reacts to events from a queuing system such as SNS, RabbitMQ, etc.
