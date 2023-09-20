const { movieRepository } = require('../../repositories/movie');
const { NotFoundError } = require('../../errors/api/not-found');

const movieApiController = {
  async getMovies(req, res, next) {
    try {
      const instances = await movieRepository.find({
        relations: ['genres', 'director'],
      });

      res.json(instances);
    } catch (err) {
      next(err);
    }
  },

  async editMovie(req, res, next) {
    try {
      const instance = await movieRepository.findOne({
        where: {
          id: req.params.movieId,
        },
        relations: ['genres', 'director'],
      });

      if (instance === null) {
        throw new NotFoundError();
      }

      Object.assign(instance, req.body);

      await movieRepository.save(instance);

      const instanceWithRelations = await movieRepository.findOne({
        where: {
          id: instance.id,
        },
        relations: ['genres', 'director'],
      });

      res.json(instanceWithRelations);
    } catch (err) {
      next(err);
    }
  },

  async createMovie(req, res, next) {
    try {
      const instance = movieRepository.create(req.body);

      await movieRepository.save(instance);

      const instanceWithRelations = await movieRepository.findOne({
        where: {
          id: instance.id,
        },
        relations: ['genres', 'director'],
      });

      res.json(instanceWithRelations);
    } catch (err) {
      next(err);
    }
  },

  async deleteMovie(req, res, next) {
    try {
      const instance = await movieRepository.findOne({
        where: {
          id: req.params.movieId,
        },
        relations: ['genres', 'director'],
      });

      if (instance === null) {
        throw new NotFoundError();
      }

      await movieRepository.delete({ id: instance.id });

      res.json(instance);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = {
  movieApiController,
};
