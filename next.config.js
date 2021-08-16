// next.config.js
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([[withSass({})], [withImages]]);
