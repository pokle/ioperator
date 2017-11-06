import React from 'react'
import ReactDOM from 'react-dom'
import { run } from 'ioperator'
import app from'../pure/app'

const actions = {
  routes: ({ routes }) => {
      ReactDOM.render(<div>hey</div>, document.getElementById('app'))
  }
};

run(actions, app());