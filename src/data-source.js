const { DataSource } = require('typeorm');

const { dbDevelopmentConfig, dbProductionConfig } = require('./config/db');

const dataSource = new DataSource(
  process.env.NODE_ENV === 'production'
    ? dbProductionConfig
    : dbDevelopmentConfig
);

module.exports = { dataSource };
