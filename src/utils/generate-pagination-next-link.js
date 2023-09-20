function generatePaginationNextLink(basePath, skip, limit, total) {
  if (skip + limit >= total) {
    return null;
  }

  return `${basePath}?skip=${skip + limit}&limit=${limit}`;
}

module.exports = { generatePaginationNextLink };
