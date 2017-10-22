// A pure isomorphic application
import React from 'react'

const routes = routes => ({ io: 'routes', routes });

const Home = () => (
  <div>
    Hey, you should go <a href="/hey">here</a>{' '}
  </div>
);

const Hello = ({ name }) => <h1>Hello {name}</h1>;
const Hey = () => <Hello name="there" />;

export default function app() /*:IO*/ {
  return routes([{ path: '/', then: Home }, { path: '/hey', then: Hey }]);
}
