const { directorEntitySchema } = require('../entity-schemas/director');
const { movieEntitySchema } = require('../entity-schemas/movie');
const { genreEntitySchema } = require('../entity-schemas/genre');

const dbDevelopmentConfig = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'web_main',
  synchronize: true,
  entities: [directorEntitySchema, movieEntitySchema, genreEntitySchema],
};

const dbProductionConfig = {
  entities: [directorEntitySchema, movieEntitySchema, genreEntitySchema],
};

module.exports = {
  dbDevelopmentConfig,
  dbProductionConfig,
};
