const { directorRepository } = require('../../repositories/director');
const { NotFoundError } = require('../../errors/api/not-found');
const {
  getPaginationParametersFromQuery,
} = require('../../utils/get-pagination-parameters-from-query');
const {
  generatePaginatedData,
} = require('../../utils/generate-paginated-data');

const directorApiController = {
  async getDirectors(req, res, next) {
    try {
      const { skip, limit } = getPaginationParametersFromQuery(req.query);

      const [instances, totalCount] = await Promise.all([
        directorRepository.find({
          skip,
          take: limit,
        }),
        directorRepository.count(),
      ]);

      res.json(
        generatePaginatedData(
          '/api/director',
          skip,
          limit,
          totalCount,
          instances
        )
      );
    } catch (err) {
      next(err);
    }
  },

  async editDirector(req, res, next) {
    try {
      const instance = await directorRepository.findOneBy({
        id: req.params.directorId,
      });

      if (instance === null) {
        throw new NotFoundError();
      }

      Object.assign(instance, req.body);

      await directorRepository.save(instance);

      res.json(instance);
    } catch (err) {
      next(err);
    }
  },

  async createDirector(req, res, next) {
    try {
      const instance = directorRepository.create(req.body);

      await directorRepository.save(instance);

      res.json(instance);
    } catch (err) {
      next(err);
    }
  },

  async deleteDirector(req, res, next) {
    try {
      const instance = await directorRepository.findOneBy({
        id: req.params.directorId,
      });

      if (instance === null) {
        throw new NotFoundError();
      }

      await directorRepository.delete({ id: instance.id });

      res.json(instance);
    } catch (err) {
      next(err);
    }
  },

  async directorsSelect2(req, res, next) {
    try {
      const { term } = req.query;

      const instances = await directorRepository
        .createQueryBuilder()
        .select(['director.firstName', 'director.lastName', 'director.id'])
        .where(
          "CONCAT(director.firstName, ' ', director.lastName) ILIKE :term",
          { term: `%${term}%` }
        )
        .getMany();

      res.json({
        results: instances.map((instance) => ({
          id: instance.id,
          text: `${instance.firstName} ${instance.lastName}`,
        }))
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = {
  directorApiController,
};
