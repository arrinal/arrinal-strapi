module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const article = await strapi.entityService.findOne('api::article.article', result.id, {
      populate: { tags: true }
    })
    const articleTags = article.tags
    await strapi.entityService.create("api::preview.preview", {
      data: {
        title: result.title,
        tags: articleTags,
        cover: result.cover
      }
    });
  },
async afterUpdate(event) {
    const { result, params } = event;
    const article = await strapi.entityService.findOne('api::article.article', params.where.id, {
      populate: { tags: true }
    })
    const articleTags = article.tags
    await strapi.entityService.update("api::preview.preview", params.where.id, {
      data: {
        title: result.title,
        tags: articleTags,
        cover: result.cover,
        publishedAt: result.publishedAt
      }
    });
  },
  async afterDelete(event) {
    const { result, params } = event;
    await strapi.entityService.delete("api::preview.preview", params.where.id);
  }
};