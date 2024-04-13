'use strict';

/**
 * preview service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::preview.preview');
