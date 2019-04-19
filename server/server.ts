import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as send from 'koa-send';
import * as serve from 'koa-static';
import * as path from 'path';
import * as graphQLHTTP from 'koa-graphql';

import schema from './schema';

const app = new Koa();

const router = new Router();

// Serve static files from the /dist folder
app.use(serve(path.join(__dirname, '../dist')));

router.all(
  '/graphql',
  graphQLHTTP({
    schema,
    graphiql: true
  })
);

// Serve up the static files for the react app compiled by parcel
router.get('*', async ctx => {
  await send(ctx, '/dist/app.html');
});

// Add the routes to Koa
app.use(router.routes());

// Start the server
const port = 3000;
app.listen(port);

console.log(`Server running on port ${port}!`);
