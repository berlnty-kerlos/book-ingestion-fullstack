import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { chaptersRouter } from './routes/chapters';
import { serve } from '@hono/node-server';
import 'dotenv/config';

const app = new Hono();

app.use(
  '/api/*',
  cors({
    origin: '*',
  })
);

app.route('/api/chapters', chaptersRouter);

const port = Number(process.env.PORT);

serve({
  fetch: app.fetch,
  port
})

console.log(`Server is running on port ${port}`)
