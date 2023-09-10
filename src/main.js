const express = require('express');
const path = require('path');

const { dataSource } = require('./data-source');
const { appConfig } = require('./config/app');

const { genreController } = require('./controllers/genre');
const { directorController } = require('./controllers/director');
const { movieController } = require('./controllers/movie');
const { homeController } = require('./controllers/home');

dataSource
  .initialize()
  .then(() => console.log('Data source has been initialized!'))
  .catch((err) =>
    console.error('Error during data source initialization:', err)
  );

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/genres', genreController.getGenres);
app.use('/genres/:genreId', genreController.editGenre);
app.use('/add-genre', genreController.addGenre);

app.get('/directors', directorController.getDirectors);
app.use('/directors/:directorId', directorController.editDirector);
app.use('/add-director', directorController.addDirector);

app.get('/movies', movieController.getMovies);
app.use('/movies/:movieId', movieController.editMovie);
app.use('/add-movie', movieController.addMovie);

app.get('/', homeController.getHome);

app.listen(appConfig.port, () =>
  console.log(`App is running on port ${appConfig.port}!`)
);
