const { genreRepository } = require('../repositories/genre');

const genreController = {
  async getGenres(req, res) {
    const genreInstances = await genreRepository.find();
    res.render('genres', { genreInstances });
  },

  async editGenre(req, res) {
    const genreInstance = await genreRepository.findOneBy({
      id: req.params.genreId,
    });

    if (genreInstance === null) {
      res.status(404).end();
    } else if (req.method === 'POST') {
      if (Object.keys(req.body).length === 0) {
        await genreRepository.delete(genreInstance.id);
      } else {
        Object.assign(genreInstance, req.body);
        await genreRepository.save(genreInstance);
      }

      res.redirect('/genres');
    } else {
      res.render('edit-genre', { genreInstance });
    }
  },

  async addGenre(req, res) {
    if (req.method === 'POST') {
      const genreInstance = genreRepository.create(req.body);
      await genreRepository.save(genreInstance);

      res.redirect('/genres');
    } else {
      res.render('add-genre');
    }
  },
};

module.exports = {
  genreController,
};
