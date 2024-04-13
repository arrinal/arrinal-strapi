module.exports = () => {
  return async (ctx, next) => {
    if (ctx.url.match(/^\/content-manager\/collection-types\/api::article.article\/actions\/bulkUnpublish$/) && ctx.method === 'POST') {
      const ids = ctx.request.body.ids;

      // Menggunakan entityService untuk mencari dan unpublish artikel terkait
      try {
        const relatedPreviews = await strapi.entityService.findMany('api::preview.preview', {
          filters: { article: { $in: ids } }
        });
        await Promise.all(relatedPreviews.map(preview =>
          strapi.entityService.update('api::preview.preview', preview.id, {
            data: { publishedAt: null }
          })
        ));
      } catch (error) {
        strapi.log.error('Error in customBulkUnpublish middleware:', error);
        return ctx.throw(500, 'Internal server error');
      }

      await next();
    } else {
      await next();
    }
  };
};