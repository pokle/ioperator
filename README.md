# Javascript IO Meditations

An exploration of the Haskell IO patterns, in pure Javascript.

## What?

Instead of passing dependencies to your functions, instead arrange for them return a description of what IO operations they would like carried out.

## Why?

Functions that perform input & output operations are usually quite hard to test. (As opposed to pure functions)
- You might use mocking techniques - painful.
- You might use dependency injection (to inject mocks and genuine implementations)

## Influences
- Haskell IO Monad
- funfix's IO type (https://github.com/funfix/funfix)

## The examples

The io1.js - ioN.js files show how to perform the following imperative pseudocode using the IO pattern:

    while the queue has messages to read:
        read the message
        write the message to a file
        log that we wrote the message to a file

This is typical of any backend system that reacts to events from a queuing system such as SNS, RabbitMQ, etc.
