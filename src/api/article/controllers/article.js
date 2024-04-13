'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const articleLifecycles = require('../content-types/article/lifecycles.js');

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  // Extend the default create method
  async create(ctx) {
    console.log('Create');
    const response = await super.create(ctx);
    await articleLifecycles.afterCreate({ result: response.result });
    return response;
  },

  // Extend the default update method
  async update(ctx) {
    console.log('Update');
    const response = await super.update(ctx);
    await articleLifecycles.afterUpdate({ result: response.result, params: { where: { id: ctx.params.id } } });
    return response;
  }
}));
