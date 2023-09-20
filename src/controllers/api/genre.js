const { genreRepository } = require('../../repositories/genre');
const { NotFoundError } = require('../../errors/api/not-found');
const {
  getPaginationParametersFromQuery,
} = require('../../utils/get-pagination-parameters-from-query');
const {
  generatePaginatedData,
} = require('../../utils/generate-paginated-data');

const genreApiController = {
  async getGenres(req, res, next) {
    try {
      const { skip, limit } = getPaginationParametersFromQuery(req.query);

      const [instances, totalCount] = await Promise.all([
        genreRepository.find({
          skip,
          take: limit,
        }),
        genreRepository.count(),
      ]);

      res.json(
        generatePaginatedData('/api/genre', skip, limit, totalCount, instances)
      );
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
