const { EntitySchema } = require('typeorm');

const directorEntitySchema = new EntitySchema({
  name: 'director',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstName: {
      type: 'text',
      nullable: true,
    },
    lastName: {
      type: 'text',
      nullable: true,
    },
  },
});

module.exports = { directorEntitySchema };
