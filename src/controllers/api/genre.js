const { genreRepository } = require('../../repositories/genre');
const { NotFoundError } = require('../../errors/api/not-found');

const genreApiController = {
  async getGenres(req, res, next) {
    try {
      const instances = await genreRepository.find();

      res.json(instances);
    } catch (err) {
      next(err);
    }
  },

  async editGenre(req, res, next) {
    try {
      const instance = await genreRepository.findOneBy({
        id: req.params.genreId,
      });

      if (instance === null) {
        throw new NotFoundError();
      }

      Object.assign(instance, req.body);

      await genreRepository.save(instance);

      res.json(instance);
    } catch (err) {
      next(err);
    }
  },

  async createGenre(req, res, next) {
    try {
      const instance = genreRepository.create(req.body);

      await genreRepository.save(instance);

      res.json(instance);
    } catch (err) {
      next(err);
    }
  },

  async deleteGenre(req, res, next) {
    try {
      const instance = await genreRepository.findOneBy({
        id: req.params.genreId,
      });

      if (instance === null) {
        throw new NotFoundError();
      }

      await genreRepository.delete({ id: instance.id });

      res.json(instance);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = {
  genreApiController,
};
