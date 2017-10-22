// A pure isomorphic application
const React = require('react')
const routes = routes => ({ io: 'routes', routes });

const Hello = ({ name }) => <h1>Hello {name}</h1>;

function app() /*:IO*/ {
  return routes([
    {
      path: '/',
      then() {
        return (
          <div>
            Hey, you should go <a href="/hey">here</a>
          </div>
        );
      }
    },
    {
      path: '/hey',
      then() {
        return <Hello name="there" />;
      }
    }
  ]);
}

module.exports = app;
