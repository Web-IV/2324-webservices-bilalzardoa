const Router = require('@koa/router');
const destinationReviewService = require('../src/service/destinationReviewService');

const getAllReviews = async (ctx) => {
  ctx.body = destinationReviewService.getAllReviews(); // Use the new service method
};

const createReview = async (ctx) => {
  try {
    const { userId, destinationId, rating, comments } = ctx.request.body;

    const newReview = destinationReviewService.createReview({
      userId,
      destinationId,
      rating,
      comments,
    });

    ctx.body = newReview;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
};

const getReviewById = async (ctx) => {
  ctx.body = destinationReviewService.getReviewById(Number(ctx.params.id));
};

const updateReview = async (ctx) => {
  ctx.body = destinationReviewService.updateReviewById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

const deleteReview = async (ctx) => {
  destinationReviewService.deleteReviewById(Number(ctx.params.id));
  ctx.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/reviews',
  });

  router.get('/', getAllReviews);
  router.post('/', createReview);
  router.get('/:id', getReviewById);
  router.put('/:id', updateReview);
  router.delete('/:id', deleteReview);

  app.use(router.routes())
     .use(router.allowedMethods());
};
