const { ApiError } = require('../errors/api/api-error');

function apiErrorHandler() {
  return (err, req, res, next) => {
    if (err instanceof ApiError) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error' });
    }
  };
}

module.exports = { apiErrorHandler };
