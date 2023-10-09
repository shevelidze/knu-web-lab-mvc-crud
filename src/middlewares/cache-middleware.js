const { createClient } = require('redis');

const redisClient = createClient({
  url: 'redis://redis:6379',
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect();

function getCacheKey(method, url) {
  return `${method}-${url}`;
}

function cacheMiddleware(methods, urlRegexp, expireInSeconds) {
  return async (req, res, next) => {
    const { method, url } = req;

    if (methods.includes(method) && urlRegexp.test(url)) {
      const cachedResponseDataString = await redisClient.get(
        getCacheKey(method, url)
      );

      if (cachedResponseDataString) {
        const parsedCachedResponseData = JSON.parse(cachedResponseDataString);

        for (const [headerName, headerValue] of Object.entries(
          parsedCachedResponseData.headers
        )) {
          res.setHeader(headerName, headerValue);
        }

        res.status(parsedCachedResponseData.status);
        res.send(parsedCachedResponseData.body);

        return;
      }
    }

    const initialSend = res.send;

    res.send = (...args) => {
      const cacheKey = getCacheKey(method, url);

      redisClient
        .set(
          cacheKey,
          JSON.stringify({
            status: res.statusCode,
            headers: res.getHeaders(),
            body: args[0],
          })
        )
        .then(() => {
          redisClient.expire(cacheKey, expireInSeconds);
        });

      initialSend.apply(res, args);
    };

    next();
  };
}

module.exports = { cacheMiddleware };
