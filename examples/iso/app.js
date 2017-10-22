// A pure isomorphic application
const React = require('react');
const routes = routes => ({ io: 'routes', routes });

const Home = () => (
  <div>
    {' '}
    Hey, you should go <a href="/hey">here</a>{' '}
  </div>
);

const Hello = ({ name }) => <h1>Hello {name}</h1>;
const Hey = () => <Hello name="there" />;

function app() /*:IO*/ {
  return routes([{ path: '/', then: Home }, { path: '/hey', then: Hey }]);
}

module.exports = app;
