const {
  generatePaginationNextLink,
} = require('./generate-pagination-next-link');

function generatePaginatedData(basePath, skip, limit, total, data) {
  return {
    skip: skip,
    limit: limit,
    total,
    data,
    nextLink: generatePaginationNextLink(basePath, skip, limit, total),
  };
}

module.exports = { generatePaginatedData };
