// A pure isomorphic application

const routes = (routes) => ({ io: 'routes', routes })

function app() /*:IO*/ {
  return routes([
    {
      path: '/',
      then() {
        return "Hey, you should go <a href='/hey'>here</a>";
      }
    },
    {
      path: '/hey',
      then() {
        return 'Hey there';
      }
    }
  ]);
}

module.exports = app;