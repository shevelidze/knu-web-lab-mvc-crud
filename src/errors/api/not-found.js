const { ApiError } = require('./api-error');

class NotFoundError extends ApiError {
  constructor(message = 'Not found!') {
    super(404, message);
  }
}

module.exports = { NotFoundError };
