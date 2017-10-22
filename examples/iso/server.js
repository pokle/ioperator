const ioperator = require('ioperator');
const express = require('express');
const app = require('./app');

const actions = {
  routes: ({ routes }) => {
    const expressApp = express();
    routes.forEach(({ path, then }) => {
      expressApp.get(path, (req, res) => {
        res.send(then());
      });
    });

    expressApp.listen(3000, function() {
      console.log('IOperator example/iso Ready. Try http://localhost:3000/');
    });

    return expressApp;
  }
};

ioperator.run(actions, app());