const { dataSource } = require('../data-source');
const { directorEntitySchema } = require('../entity-schemas/director');

const directorRepository = dataSource.getRepository(directorEntitySchema);

module.exports = { directorRepository };
