const { directorRepository } = require('../repositories/director');

const directorController = {
  async getDirectors(req, res) {
    const directorInstances = await directorRepository.find();
    res.render('directors', { directorInstances });
  },

  async editDirector(req, res) {
    const directorInstance = await directorRepository.findOneBy({
      id: req.params.directorId,
    });

    if (directorInstance === null) {
      res.status(404).end();
    } else if (req.method === 'POST') {
      if (Object.keys(req.body).length === 0) {
        await directorRepository.delete(directorInstance.id);
      } else {
        Object.assign(directorInstance, req.body);
        await directorRepository.save(directorInstance);
      }

      res.redirect('/directors');
    } else {
      res.render('edit-director', { directorInstance });
    }
  },

  async addDirector(req, res) {
    if (req.method === 'POST') {
      const directorInstance = directorRepository.create(req.body);
      await directorRepository.save(directorInstance);

      res.redirect('/directors');
      res.end();
    } else {
      res.render('add-director');
    }
  },
};

module.exports = {
  directorController,
};
