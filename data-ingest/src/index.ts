import { fetchChapterLinks } from "./scrape/fetchIndex";
import { fetchChapter } from "./scrape/fetchChapter";
import { normalizeChapterContent } from "./scrape/normalizeContent";
import { hasMeaningfulContent } from "./scrape/validateContent";
import { summarizeChapter } from "./summarize/gemini";
import { upsertChapter } from "./db/chaptersRepo";



async function ingest() {

  const chapters = await fetchChapterLinks();

  for (const ch of chapters) {
    let summary="";

    const {title,content } = await fetchChapter(ch.url);

    console.log(`Ingesting chapter ${ch.chapterNumber} , Title: ${title}`);

    const normalized = normalizeChapterContent(content);
    
    if (hasMeaningfulContent(normalized)) {
      summary = await summarizeChapter(normalized);} 
    else {
      console.warn(
        `Chapter ${ch.chapterNumber} has no meaningful content; skipping summarization`
      );}
   

    await upsertChapter({
      chapterNumber: ch.chapterNumber,
      title,
      content,
      summary
    });

    break;
  }
  }

ingest().catch(console.error);
