import { Hono } from 'hono';
import { chaptersRouter } from './routes/chapters';
import 'dotenv/config';
import { serve } from '@hono/node-server';


const app = new Hono();

app.route('/api/chapters', chaptersRouter);

const port = Number(process.env.PORT);

serve({
  fetch: app.fetch,
  port
})

console.log(`Server is running on port ${port}`)
