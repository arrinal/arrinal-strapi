'use strict';

/**
 * preview router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::preview.preview');
