const { movieRepository } = require('../repositories/movie');
const { directorRepository } = require('../repositories/director');
const { genreRepository } = require('../repositories/genre');
const { getFullName } = require('../utils/get-full-name');
const { bindMethods } = require('../utils/bind-methods');

const movieController = bindMethods({
  async getMovies(req, res) {
    const movieInstances = await movieRepository.find({
      relations: ['genres', 'director'],
    });
    res.render('movies', { movieInstances, getFullName });
  },

  async editMovie(req, res) {
    const movieInstance = await movieRepository.findOne({
      where: {
        id: req.params.movieId,
      },
      relations: ['genres', 'director'],
    });

    if (movieInstance === null) {
      res.status(404).end();
    } else if (req.method === 'POST') {
      if (Object.keys(req.body).length === 0) {
        await movieRepository.delete(movieInstance.id);
      } else {
        this.updateInstanceFromBody(movieInstance, req.body);

        await movieRepository.save(movieInstance);
      }

      res.redirect('/movies');
    } else {
      const [directorInstances, genreInstances] = await Promise.all([
        directorRepository.find(),
        genreRepository.find(),
      ]);

      res.render('edit-movie', {
        movieInstance,
        directorInstances,
        genreInstances,
      });
    }
  },

  async createMovie(req, res) {
    if (req.method === 'POST') {
      const movieInstance = movieRepository.create();

      this.updateInstanceFromBody(movieInstance, req.body);

      await movieRepository.save(movieInstance);

      res.redirect('/movies');
      res.end();
    } else {
      const [directorInstances, genreInstances] = await Promise.all([
        directorRepository.find(),
        genreRepository.find(),
      ]);

      res.render('create-movie', { directorInstances, genreInstances });
    }
  },

  updateInstanceFromBody(instance, body) {
    const genreIdsFromBody = (
      Array.isArray(body.genreId)
        ? body.genreId
        : body.genreId !== undefined
        ? [body.genreId]
        : []
    ).map((genreIdString) => Number(genreIdString));

    instance.name = body.name;
    instance.director = { id: Number(body.directorId) };
    instance.genres = genreIdsFromBody.map((genreId) => ({
      id: genreId,
    }));
  },
});

module.exports = {
  movieController,
};
