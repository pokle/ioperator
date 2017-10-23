const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { run } = require('ioperator');
const express = require('express');
import app from '../pure/app';

const actions = {

  just: ({value}) => value,

  withTime: () => Date().toString(),

  routes: ({ routes }) => {
    const expressApp = express();
    routes.forEach(({ path, routeIo }) => {
      expressApp.get(path, (req, res) => {
        run(actions, routeIo).then(comp =>
          res.send(ReactDOMServer.renderToString(comp))
        );
      });
    });

    expressApp.listen(3000, function() {
      console.log('IOperator example iso ready. Try http://localhost:3000/');
    });

    return expressApp;
  }
};

run(actions, app());