import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as send from 'koa-send';
import * as serve from 'koa-static';
import * as path from 'path';
import * as graphQLHTTP from 'koa-graphql';
import * as proxy from 'koa-proxy';

import { isProd } from './config/serverConfig';
import schema from './schema';

const app = new Koa();

const router = new Router();

// Serve static files from the /dist folder
app.use(serve(path.join(__dirname, '../dist')));

// Pass all /graphql requests to through to the GraphQL server
router.all(
  '/graphql',
  graphQLHTTP({
    schema,
    graphiql: true
  })
);

// In production, serve the static react app files from the dev server
if (isProd) {
  router.get('*', async ctx => {
    await send(ctx, '/dist/app.html');
  });
}

// Add the routes to Koa
app.use(router.routes());

// In development, proxy request to the parcel server
if (!isProd) {
  app.use(proxy({ url: 'http://localhost:1234/' }));
}

// Start the server
const port = 3000;
app.listen(port);

console.log(`Server running on port ${port}!`);
