const express = require('express');
const morgan = require('morgan');

const path = require('path');
// const cors = require('cors');

const { sequelize } = require('./src/models/index');

const app = express();

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     exposedHeaders: 'X-Total-Count',
//   })
// );

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

/**
 *   Adding middlewares
 * */
app.disable('x-powered-by');

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: false, limit: '25mb' }));

// mogran logging

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  })
);

/**
 *   Testing database connection
 * */

(async () => {
  try {
    // await sequelize.sync();
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

/**
 * init Router
 */

app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 3600000 * 24 })
);

app.use('/api', require('./src/routes'));

/* ***************************** */

// Note: you do not need to import @tensorflow/tfjs here.

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(500).send({ error: err.message || 'Internal server error.' });
});

const Port = process.env.PORT;
app.listen(Port, () =>
  console.log(`Server running on http://localhost:${Port}`)
);
