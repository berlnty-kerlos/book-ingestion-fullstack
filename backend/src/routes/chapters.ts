import { Hono } from 'hono';
import { getAllChapters, getChapterById } from '../services/chapterService';

export const chaptersRouter = new Hono();

chaptersRouter.get('/', async (c) => {
  try {
    const chapters = await getAllChapters();
    return c.json(chapters);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

chaptersRouter.get('/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const chapter = await getChapterById(id);
    if (!chapter) return c.json({ error: 'Chapter not found' }, 404);
    return c.json(chapter);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});
