const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const error = require('koa-json-error');
const chalk = require('chalk');
const {
  addComment,
  deleteComment,
  editComment,
  getComments,
} = require('./commentsService');

const app = new Koa();
const router = new Router();

const fakeSleep = ms => new Promise(res => setTimeout(res, ms));

const standardSleep = 1000;

app.use(koaBody());
app.use(cors());
app.use(error());

router.get('/comments', async (ctx, next) => {
  // await fakeSleep(standardSleep);

  ctx.body = await getComments();
});

router.post('/comments', async (ctx, next) => {
  await fakeSleep(standardSleep);

  const { name, text } = ctx.request.body;
  if (!name || typeof name !== 'string' || name.length < 3) {
    ctx.throw(
      400,
      'The request must include a name with a length greater than 2 characters',
    );
  }

  if (!text || typeof text !== 'string' || text === '') {
    console.log(text === '');

    ctx.throw(400, 'The request must include some text');
  }
  // return addComment();
  ctx.body = await addComment(await getComments(), { name, text });
});

router.delete('/comment/:id', async (ctx, next) => {
  await fakeSleep(standardSleep);
  const { id } = ctx.params;
  try {
    await deleteComment(await getComments(), id);
    ctx.body = true;
  } catch (err) {
    ctx.body = false;
  }
});

router.put('/comment/:id', async (ctx, next) => {
  await fakeSleep(standardSleep);

  const { id } = ctx.params;

  const { name, text } = ctx.request.body;

  if (!name || typeof name !== 'string' || name.length < 3) {
    ctx.throw(
      400,
      'The request must include a name with a length greater than 2 characterste',
    );
  }

  if (!text || typeof text !== 'string' || text === '') {
    ctx.throw(400, 'The request must include some text');
  }

  try {
    ctx.body = await editComment(await getComments(), { name, text, id });
  } catch (err) {
    ctx.throw(500, 'Internal server error');
  }
});

app.use(router.routes()).use(router.allowedMethods());

console.log(chalk.yellow('starting server'));
app.listen(3001);
console.log(chalk.green('server started'));
