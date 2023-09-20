const express = require('express');

const { genreController } = require('../controllers/genre');
const { directorController } = require('../controllers/director');
const { movieController } = require('../controllers/movie');
const { homeController } = require('../controllers/home');

const mainRouter = express.Router();

mainRouter.use(express.urlencoded({ extended: true }));

mainRouter.get('/genres', genreController.getGenres);
mainRouter.use('/genres/:genreId', genreController.editGenre);
mainRouter.use('/create-genre', genreController.createGenre);

mainRouter.get('/directors', directorController.getDirectors);
mainRouter.use('/directors/:directorId', directorController.editDirector);
mainRouter.use('/create-director', directorController.createDirector);

mainRouter.get('/movies', movieController.getMovies);
mainRouter.use('/movies/:movieId', movieController.editMovie);
mainRouter.use('/create-movie', movieController.createMovie);

mainRouter.get('/', homeController.getHome);

module.exports = {
  mainRouter,
};
