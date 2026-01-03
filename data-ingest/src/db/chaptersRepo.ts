import { createClient } from "@supabase/supabase-js";
import { Chapter } from "../types/chapter";
import "dotenv/config";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function upsertChapter(chapter: Chapter) {
  const { error } = await supabase
    .from("chapters")
    .upsert({
      chapter_number: chapter.chapterNumber,
      title: chapter.title,
      content: chapter.content,
      summary: chapter.summary
    });

  if (error) throw error;
}
