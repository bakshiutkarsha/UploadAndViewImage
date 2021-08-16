// next.config.js
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
if(!process.env.NEXT_PUBLIC_BUCKET) {
    throw new Error('Please configure S3 bucket locally');
}

module.exports = withPlugins([[withSass({})], [withImages]]);
