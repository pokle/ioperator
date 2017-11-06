# ioperator

Helps separate your logic from your Input Output operations.

Examples of IO operations are HTTP requests, file system requests, database requests, and generally any functions that have side effects. Functions with side effects are hard to test because they are usually not repeatable.

Keeping your logic pure (free of side-effects) makes it much easier to test, and more generally much easier ot reason about.

ioperater is heavily influenced by Haskell's treatment of IO - Your pure functions describe what needs to be done by returning an IO value. They never perform IO by themselves.

[![Build Status](https://travis-ci.org/pokle/ioperator.svg?branch=master)](https://travis-ci.org/pokle/ioperator)

Install: `npm install --save ioperator`

Try it out live: https://runkit.com/pokle/ioperator-example
## Quick example

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

Dependency injection can be problematic because you have to pass your dependencies all the way through your function call hierarchy. With ioperator, your functions compose easier because you're never passing down dependencies.

## Influences
- Haskell IO Monad
- Purescript Effects, Aff, and IO
- funfix's IO type (https://github.com/funfix/funfix)
- From dependency injection to dependency rejection (http://blog.ploeh.dk/2017/01/27/from-dependency-injection-to-dependency-rejection/)


## Release process

```
npm test
npm version major | minor | patch...
git push
npm publish
```
