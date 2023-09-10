const { dataSource } = require('../data-source');
const { genreEntitySchema } = require('../entity-schemas/genre');

const genreRepository = dataSource.getRepository(genreEntitySchema);

module.exports = { genreRepository };
