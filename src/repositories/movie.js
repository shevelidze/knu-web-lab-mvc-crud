const { dataSource } = require('../data-source');
const { movieEntitySchema } = require('../entity-schemas/movie');

const movieRepository = dataSource.getRepository(movieEntitySchema);

module.exports = { movieRepository };
