const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
  env: {
    API_URL:
      process.env.NODE_ENV === 'production' ? 'null' : 'http://localhost:3333/',
    LOGIN_URL:
      process.env.NODE_ENV === 'production'
        ? 'null'
        : 'http://localhost:3000/api',
    SECRET_COOKIE_PASSWORD: 'GWbBorjVtqutY2RdZMNACZ7jcG3n6ZGq'
  }
});
