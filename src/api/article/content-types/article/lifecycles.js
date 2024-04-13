module.exports = {
  async afterCreate(event) {
    const { result } = event;
    await strapi.entityService.create("api::preview.preview", {
      data: {
        title: result.title
      }
    });
  },
  async afterUpdate(event) {
    const { result, params } = event;
    await strapi.entityService.update("api::preview.preview", params.where.id, {
      data: {
        title: result.title,
        publishedAt: result.publishedAt
      }
    });
  },
  async afterDelete(event) {
    const { result, params } = event;
    await strapi.entityService.delete("api::preview.preview", params.where.id);
  }
};
