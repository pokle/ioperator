// A pure isomorphic application
import React from 'react';

const routes = routes => ({ io: 'routes', routes });
const withTime = then => ({ io: 'withTime', then });
const just = value => ({ io: 'just', value });

const Home = ({ time }) => (
  <div>
    Hey, it's late ({time}). You should go <a href="/hey">here</a>
  </div>
);

const Hello = ({ name }) => <h1>Hello {name}</h1>;
const Hey = () => <Hello name="there" />;

export default function app() /*:IO*/ {
  return routes([
    {
      path: '/',
      routeIo: withTime(time => <Home time={time} />)
    },
    { path: '/hey', routeIo: just(<Hey />) }
  ]);
}
