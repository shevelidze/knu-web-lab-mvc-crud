const { EntitySchema } = require('typeorm');

const genreEntitySchema = new EntitySchema({
  name: 'genre',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'text',
    },
  },
});

module.exports = { genreEntitySchema };
