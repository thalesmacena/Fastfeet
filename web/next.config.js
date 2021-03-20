const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
  env: {
    API_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://rocketshoes-thalesmacena.vercel.app/api'
        : 'http://localhost:3000/api'
  }
});
