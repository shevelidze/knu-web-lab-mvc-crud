function getPaginationParametersFromQuery(query) {
  let skip = 0;
  let limit = 10;

  const skipFromQuery = Number(query.skip);
  const limitFromQuery = Number(query.limit);

  if (!isNaN(skipFromQuery)) {
    skip = skipFromQuery;
  }

  if (!isNaN(limitFromQuery)) {
    limit = limitFromQuery;
  }

  return { skip, limit };
}

module.exports = { getPaginationParametersFromQuery };
