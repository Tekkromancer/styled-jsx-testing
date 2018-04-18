const express = require('express');
const next = require('next');
// const routes = require('./app/config/routes');

const dev = process.env.NODE_ENV !== 'production';
const dir = undefined; // './app';
const app = next({ dev, dir });
// const handler = routes.getRequestHandler(app);
const handler = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // Home Page
    server.get('/', (req, res) => {
      const actualPage = '/index';
      app.render(req, res, actualPage);
    });

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    const port = dev ? 5000 : 8000;
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

/*

app.prepare()
  .then(() => {
    const server = express();
    server.get('*', (req, res) => {
      return handler(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000'); // eslint-disable-line
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

*/
