const { EntitySchema, JoinTable } = require('typeorm');

const movieEntitySchema = new EntitySchema({
  name: 'movie',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'text',
    },
    releaseYear: {
      type: 'int',
      nullable: true,
    },
    fileUrl: {
      type: 'text',
      nullable: true,
    },
  },
  relations: {
    genres: {
      target: 'genre',
      type: 'many-to-many',
      joinTable: true,
      cascade: true,
    },
    director: {
      target: 'director',
      type: 'many-to-one',
      joinTable: true,
      cascade: true,
    },
  },
});

module.exports = { movieEntitySchema };
