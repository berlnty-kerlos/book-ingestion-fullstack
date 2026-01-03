import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchChapter(url: string) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const title = $("h1,h2").eq(1).text().trim();
  const content = $("p")
    .map((_, el) => $(el).text())
    .get()
    .join("\n\n");

  return { title,content };
}
