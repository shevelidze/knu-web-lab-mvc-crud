const express = require('express');
const path = require('path');
const cors = require('cors')

const { dataSource } = require('./data-source');
const { appConfig } = require('./config/app');

const { cacheMiddleware } = require('./middlewares/cache-middleware');

const { mainRouter } = require('./routers/main');
const { apiRouter } = require('./routers/api');

dataSource
  .initialize()
  .then(() => console.log('Data source has been initialized!'))
  .catch((err) =>
    console.error('Error during data source initialization:', err)
  );

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(cacheMiddleware(['GET'], /\/api\/.*/, 60));

app.use('/', mainRouter);
app.use('/api/', apiRouter);

app.listen(appConfig.port, () =>
  console.log(`App is running on port ${appConfig.port}!`)
);
