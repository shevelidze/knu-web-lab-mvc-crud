const express = require('express');

const { genreApiController } = require('../controllers/api/genre');
const { directorApiController } = require('../controllers/api/director');
const { movieApiController } = require('../controllers/api/movie');

const { apiErrorHandler } = require('../middlewares/api-error-handler');

const apiRouter = express.Router();

apiRouter.use(express.json());

apiRouter.post('/genre', genreApiController.createGenre);
apiRouter.get('/genre', genreApiController.getGenres);
apiRouter.patch('/genre/:genreId', genreApiController.editGenre);
apiRouter.delete('/genre/:genreId', genreApiController.deleteGenre);

apiRouter.post('/director', directorApiController.createDirector);
apiRouter.get('/director', directorApiController.getDirectors);
apiRouter.get('/director/select2', directorApiController.directorsSelect2);
apiRouter.patch('/director/:directorId', directorApiController.editDirector);
apiRouter.delete('/director/:directorId', directorApiController.deleteDirector);

apiRouter.post('/movie', movieApiController.createMovie);
apiRouter.get('/movie', movieApiController.getMovies);
apiRouter.patch('/movie/:movieId', movieApiController.editMovie);
apiRouter.delete('/movie/:movieId', movieApiController.deleteMovie);

apiRouter.use(apiErrorHandler());

module.exports = {
  apiRouter,
};
