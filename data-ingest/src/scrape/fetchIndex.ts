import axios from "axios";
import * as cheerio from "cheerio";

const Base_URL= "https://www.ecatholic2000.com/job/"
const INDEX_URL = `${Base_URL}untitled-53.shtml`;

export async function fetchChapterLinks() {
  const { data } = await axios.get(INDEX_URL);
  const $ = cheerio.load(data);

  let table= $('body > table').eq(2)
  table = table.find('td').eq(1)
  
  const links: { chapterNumber: number; url: string }[] = [];
  
  table.find('p a').each((i, el) => {
  const linkText = $(el).text();       
  const linkHref = $(el).attr('href');  
   if (linkHref && linkHref.includes("-")) {
      links.push({
        chapterNumber: links.length + 1,
        url: new URL(linkHref, Base_URL).toString()
      });
    }
});


  return links;
}
