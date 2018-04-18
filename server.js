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

    // Diagnose Flow
    server.get('/diagnose', (req, res) => {
      const actualPage = '/diagnose';
      app.render(req, res, actualPage);
    });

    server.get('/diagnose/category', (req, res) => {
      const actualPage = '/diagnose';
      app.render(req, res, actualPage);
    });
    server.get('/diagnose/category/:categoryId', (req, res) => {
      const actualPage = '/diagnose';
      app.render(req, res, actualPage);
    });
    server.get('/diagnose/category/:categoryId/:brand', (req, res) => {
      const actualPage = '/diagnose';
      app.render(req, res, actualPage);
    });
    server.get('/diagnose/category/:categoryId/:brand/:symptomId', (req, res) => {
      const actualPage = '/diagnose';
      app.render(req, res, actualPage);
    });

    // Model
    server.get('/diagnose/:modelNumber', (req, res) => {
      const actualPage = '/diagnose';
      app.render(req, res, actualPage);
    });
    server.get('/diagnose/:modelNumber/:symptomId', (req, res) => {
      const actualPage = '/diagnose';
      app.render(req, res, actualPage);
    });


    // Shop for Parts
    server.get('/shop-for-parts/:queryIds/:seoText', (req, res) => {
      const actualPage = '/shop-for-parts';
      app.render(req, res, actualPage);
    });

    server.get('/shop/:partId', (req, res) => {
      const actualPage = '/part-detail';
      app.render(req, res, actualPage);
    });

    server.get('/cart', (req, res) => {
      const actualPage = '/cart';
      app.render(req, res, actualPage);
    });

    server.get('/checkout', (req, res) => {
      const actualPage = '/checkout';
      app.render(req, res, actualPage);
    });

    server.get('/order-confirmation/:orderId', (req, res) => {
      const actualPage = '/order-confirmation';
      app.render(req, res, actualPage);
    });

    // Test Pages
    server.get('/list', (req, res) => {
      const actualPage = '/list';
      app.render(req, res, actualPage);
    });

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    const port = dev ? 3000 : 8000;
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
