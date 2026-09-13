import { EnglishBook } from '../types';

/**
 * Google Sheet ID & Published URL for English Books (Project Gutenberg)
 * https://docs.google.com/spreadsheets/d/e/2PACX-1vR5Fum_p5Qqbw58C-SAjYEtXZKbZkdIuVMUQ6B8FyECTCE7Ra9_MMOjq71N7qLiQyZD8IZK6oNhaKnp/pub?output=csv
 */
export const GUTENBERG_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR5Fum_p5Qqbw58C-SAjYEtXZKbZkdIuVMUQ6B8FyECTCE7Ra9_MMOjq71N7qLiQyZD8IZK6oNhaKnp/pub?output=csv';

/**
 * Raw CSV data matching the user's Google Sheet:
 * id,title,author,image,html
 */
export const RAW_ENGLISH_BOOKS_CSV = `id,title,author,image,html
20,สวรรค์ที่หายไป,มิลตัน,https://www.gutenberg.org/cache/epub/20/pg20.cover.medium.jpg,https://www.gutenberg.org/cache/epub/20/pg20-images.html
51,แอนน์ แห่งเกาะ,มอนต์โกเมอรี,https://www.gutenberg.org/cache/epub/51/pg51.cover.medium.jpg,https://www.gutenberg.org/cache/epub/51/pg51-images.html
16,ปีเตอร์แพน,Barrie,https://www.gutenberg.org/cache/epub/16/pg16.cover.medium.jpg,https://www.gutenberg.org/cache/epub/16/pg16-images.html
23,เรื่องเล่าชีวิตของเฟรเดอริก ดักลาส,Frederick Douglass,https://www.gutenberg.org/cache/epub/23/pg23.cover.medium.jpg,https://www.gutenberg.org/cache/epub/23/pg23-images.html
44,บทเพลงแห่งความหวัง,Cather,https://www.gutenberg.org/cache/epub/44/pg44.cover.medium.jpg,https://www.gutenberg.org/cache/epub/44/pg44-images.html
29,การสำรวจสำมะโนประชากร,สหรัฐอเมริกา. สำนักสำรวจ,https://www.gutenberg.org/cache/epub/29/pg29.cover.medium.jpg,https://www.gutenberg.org/cache/epub/29/pg29-images.html
3,คำปราศรัยเปิดตัว,เคนเนดี,https://www.gutenberg.org/cache/epub/3/pg3.cover.medium.jpg,https://www.gutenberg.org/cache/epub/3/pg3-images.html
48,หนังสือข้อเท็จจริงของโลก,สหรัฐอเมริกา. สำนักข่าวกรอง,https://www.gutenberg.org/cache/epub/48/pg48.cover.medium.jpg,https://www.gutenberg.org/cache/epub/48/pg48-images.html
35,ไทม์แมชชีน,เวลส์,https://www.gutenberg.org/cache/epub/35/pg35.cover.medium.jpg,https://www.gutenberg.org/cache/epub/35/pg35-images.html
32,เฮอร์แลนด์,Gilman,https://www.gutenberg.org/cache/epub/32/pg32.cover.medium.jpg,https://www.gutenberg.org/cache/epub/32/pg32-images.html
12,ผ่านกระจกมอง,แครอล,https://www.gutenberg.org/cache/epub/12/pg12.cover.medium.jpg,https://www.gutenberg.org/cache/epub/12/pg12-images.html
8,คำปราศรัยครั้งแรก,ลินคอล์น,https://www.gutenberg.org/cache/epub/8/pg8.cover.medium.jpg,https://www.gutenberg.org/cache/epub/8/pg8-images.html
43,กรณีประหลาดของ ดร.เจคิลล์ กับ มิสเตอร์ไฮด์,สตีเวนสัน,https://www.gutenberg.org/cache/epub/43/pg43.cover.medium.jpg,https://www.gutenberg.org/cache/epub/43/pg43-images.html
31,บทละครของ โซโฟคลีส,โซโฟคลีส,https://www.gutenberg.org/cache/epub/31/pg31.cover.medium.jpg,https://www.gutenberg.org/cache/epub/31/pg31-images.html
2,ร่างพระราชบัญญัติสิทธิของสหรัฐ,สหรัฐอเมริกา,https://www.gutenberg.org/cache/epub/2/pg2.cover.medium.jpg,https://www.gutenberg.org/cache/epub/2/pg2-images.html
14,หนังสือข้อเท็จจริงของโลก 1990,สหรัฐอเมริกา. สำนักข่าวกรอง,https://www.gutenberg.org/cache/epub/14/pg14.cover.medium.jpg,https://www.gutenberg.org/cache/epub/14/pg14-images.html
62,เจ้าหญิงแห่งดาวอังคาร,Burroughs,https://www.gutenberg.org/cache/epub/62/pg62.cover.medium.jpg,https://www.gutenberg.org/cache/epub/62/pg62-images.html
95,นักโทษแห่งเซนดา,ความหวัง,https://www.gutenberg.org/cache/epub/95/pg95.cover.medium.jpg,https://www.gutenberg.org/cache/epub/95/pg95-images.html
28,นิทานอีสป,อีสป,https://www.gutenberg.org/cache/epub/28/pg28.cover.medium.jpg,https://www.gutenberg.org/cache/epub/28/pg28-images.html
88,ดัชนีราคา/ต้นทุน,ชาร์ต,https://www.gutenberg.org/cache/epub/88/pg88.cover.medium.jpg,https://www.gutenberg.org/cache/epub/88/pg88-images.html
52,สแควร์รูทของ 2,เคอร์,https://www.gutenberg.org/cache/epub/52/pg52.cover.medium.jpg,https://www.gutenberg.org/cache/epub/52/pg52.epub
59,วาทกรรมเรื่องวิธี,Descartes,https://www.gutenberg.org/cache/epub/59/pg59.cover.medium.jpg,https://www.gutenberg.org/cache/epub/59/pg59-images.html
10,พระคัมภีร์ฉบับคิงเจมส์,James,https://www.gutenberg.org/cache/epub/10/pg10.cover.medium.jpg,https://www.gutenberg.org/cache/epub/10/pg10-images.html
13,การล่า Snark: ความปั่นป่วน,Carroll,https://www.gutenberg.org/cache/epub/13/pg13.cover.medium.jpg,https://www.gutenberg.org/cache/epub/13/pg13-images.html
30,พระคัมภีร์ ฉบับสมบูรณ์,เสร็จสมบูรณ์,https://www.gutenberg.org/cache/epub/30/pg30.cover.medium.jpg,https://www.gutenberg.org/cache/epub/30/pg30-images.html
22,อรรถาภิธานของ Roget,Roget,https://www.gutenberg.org/cache/epub/22/pg22.cover.medium.jpg,https://www.gutenberg.org/cache/epub/22/pg22-images.html
98,เรื่องราวของสองนคร,ดิคเกนส์,https://www.gutenberg.org/cache/epub/98/pg98.cover.medium.jpg,https://www.gutenberg.org/cache/epub/98/pg98-images.html
85,สัตว์ร้ายแห่งทาร์ซาน,เบอร์โรห์ส,https://www.gutenberg.org/cache/epub/85/pg85.cover.medium.jpg,https://www.gutenberg.org/cache/epub/85/pg85-images.html
75,อีเมล 101,กู๊ดวิน,https://www.gutenberg.org/cache/epub/75/pg75.cover.medium.jpg,https://www.gutenberg.org/cache/epub/75/pg75-images.html
41,ตำนานแห่งสลีปปี้ฮอลโลว์,Irving,https://www.gutenberg.org/cache/epub/41/pg41.cover.medium.jpg,https://www.gutenberg.org/cache/epub/41/pg41-images.html
66,รุ่งอรุณแห่งวิทยาศาสตร์,Joly,https://www.gutenberg.org/cache/epub/66/pg66.cover.medium.jpg,https://www.gutenberg.org/cache/epub/66/pg66-images.html
18,เอกสารของรัฐบุรุษ,แฮมิลตัน,https://www.gutenberg.org/cache/epub/18/pg18.cover.medium.jpg,https://www.gutenberg.org/cache/epub/18/pg18-images.html
40,คู่มือทรัพยากรอินเทอร์เน็ต,คอชเมอร์,https://www.gutenberg.org/cache/epub/40/pg40.cover.medium.jpg,https://www.gutenberg.org/cache/epub/40/pg40-images.html
57,อะลาดินและตะเกียงวิเศษ,ไม่ทราบ,https://www.gutenberg.org/cache/epub/57/pg57.cover.medium.jpg,https://www.gutenberg.org/cache/epub/57/pg57-images.html
100,ผลงานที่สมบูรณ์ของเชกสเปียร์,เช็คสเปียร์,https://www.gutenberg.org/cache/epub/100/pg100.cover.medium.jpg,https://www.gutenberg.org/cache/epub/100/pg100-images.html
65,100 คนแรก,ห้องน้ำในตัว,https://www.gutenberg.org/cache/epub/65/pg65.cover.medium.jpg,https://www.gutenberg.org/cache/epub/65/pg65.txt.utf8
54,ดินแดนมหัศจรรย์แห่งออซ,บอม,https://www.gutenberg.org/cache/epub/54/pg54.cover.medium.jpg,https://www.gutenberg.org/cache/epub/54/pg54-images.html
11,อลิซในแดนมหัศจรรย์,Lewis Carroll,https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg,https://www.gutenberg.org/cache/epub/11/pg11-images.html
84,แฟรงเกนสไตน์,Mary Shelley,https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg,https://www.gutenberg.org/cache/epub/84/pg84-images.html
345,แดร็กคูลา,Bram Stoker,https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg,https://www.gutenberg.org/cache/epub/345/pg345-images.html
74,การผจญภัยของทอม ซอว์เยอร์,Mark Twain,https://www.gutenberg.org/cache/epub/74/pg74.cover.medium.jpg,https://www.gutenberg.org/cache/epub/74/pg74-images.html
1342,ความหยิ่งทะนงและอคติ,Jane Austen,https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg,https://www.gutenberg.org/cache/epub/1342/pg1342-images.html
1661,เชอร์ล็อก โฮล์มส์,Arthur Conan Doyle,https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg,https://www.gutenberg.org/cache/epub/1661/pg1661-images.html
2701,โมบี้ดิ๊ก,Herman Melville,https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg,https://www.gutenberg.org/cache/epub/2701/pg2701-images.html
1260,เจน แอร์,Charlotte Brontë,https://www.gutenberg.org/cache/epub/1260/pg1260.cover.medium.jpg,https://www.gutenberg.org/cache/epub/1260/pg1260-images.html
768,วูเธอริง ไฮต์ส,Emily Brontë,https://www.gutenberg.org/cache/epub/768/pg768.cover.medium.jpg,https://www.gutenberg.org/cache/epub/768/pg768-images.html
174,ภาพเหมือนของโดเรียน เกรย์,Oscar Wilde,https://www.gutenberg.org/cache/epub/174/pg174.cover.medium.jpg,https://www.gutenberg.org/cache/epub/174/pg174-images.html
5200,การกลายร่าง,Franz Kafka,https://www.gutenberg.org/cache/epub/5200/pg5200.cover.medium.jpg,https://www.gutenberg.org/cache/epub/5200/pg5200-images.html
64317,เดอะ เกรท แกตสบี้,F. Scott Fitzgerald,https://www.gutenberg.org/cache/epub/64317/pg64317.cover.medium.jpg,https://www.gutenberg.org/cache/epub/64317/pg64317-images.html
55,พ่อมดมหัศจรรย์แห่งเมืองออซ,L. Frank Baum,https://www.gutenberg.org/cache/epub/55/pg55.cover.medium.jpg,https://www.gutenberg.org/cache/epub/55/pg55-images.html
76,การผจญภัยของฮัคเคิลเบอร์รี ฟินน์,Mark Twain,https://www.gutenberg.org/cache/epub/76/pg76.cover.medium.jpg,https://www.gutenberg.org/cache/epub/76/pg76-images.html
4300,ยูลิสซีส,James Joyce,https://www.gutenberg.org/cache/epub/4300/pg4300.cover.medium.jpg,https://www.gutenberg.org/cache/epub/4300/pg4300-images.html
1400,ความหวังอันยิ่งใหญ่,Charles Dickens,https://www.gutenberg.org/cache/epub/1400/pg1400.cover.medium.jpg,https://www.gutenberg.org/cache/epub/1400/pg1400-images.html
1952,วอลเปเปอร์สีเหลือง,Charlotte Perkins Gilman,https://www.gutenberg.org/cache/epub/1952/pg1952.cover.medium.jpg,https://www.gutenberg.org/cache/epub/1952/pg1952-images.html
3268,ความลึกลับแห่งอูดอลโฟ,Ann Radcliffe,https://www.gutenberg.org/cache/epub/3268/pg3268.cover.medium.jpg,https://www.gutenberg.org/cache/epub/3268/pg3268-images.html
394,แครนฟอร์ด,Elizabeth Gaskell,https://www.gutenberg.org/cache/epub/394/pg394.cover.medium.jpg,https://www.gutenberg.org/cache/epub/394/pg394-images.html
2641,ห้องที่มีทิวทัศน์,E. M. Forster,https://www.gutenberg.org/cache/epub/2641/pg2641.cover.medium.jpg,https://www.gutenberg.org/cache/epub/2641/pg2641-images.html
2554,อาชญากรรมและการลงทัณฑ์,Fyodor Dostoevsky,https://www.gutenberg.org/cache/epub/2554/pg2554.cover.medium.jpg,https://www.gutenberg.org/cache/epub/2554/pg2554-images.html
514,สี่ดรุณี,Louisa May Alcott,https://www.gutenberg.org/cache/epub/514/pg514.cover.medium.jpg,https://www.gutenberg.org/cache/epub/514/pg514-images.html
2680,ข้อคิดชีวิต,Marcus Aurelius,https://www.gutenberg.org/cache/epub/2680/pg2680.cover.medium.jpg,https://www.gutenberg.org/cache/epub/2680/pg2680-images.html
145,มิดเดิลมาร์ช,George Eliot,https://www.gutenberg.org/cache/epub/145/pg145.cover.medium.jpg,https://www.gutenberg.org/cache/epub/145/pg145-images.html
100,บทประพันธ์วิลเลียม เชกสเปียร์,William Shakespeare,https://www.gutenberg.org/cache/epub/100/pg100.cover.medium.jpg,https://www.gutenberg.org/cache/epub/100/pg100-images.html
1184,เคานต์แห่งมอนเตคริสโต,Alexandre Dumas,https://www.gutenberg.org/cache/epub/1184/pg1184.cover.medium.jpg,https://www.gutenberg.org/cache/epub/1184/pg1184-images.html
16389,เมษาอาถรรพ์,Elizabeth von Arnim,https://www.gutenberg.org/cache/epub/16389/pg16389.cover.medium.jpg,https://www.gutenberg.org/cache/epub/16389/pg16389-images.html
2160,การเดินทางของฮัมฟรี คลิงเกอร์,Tobias Smollett,https://www.gutenberg.org/cache/epub/2160/pg2160.cover.medium.jpg,https://www.gutenberg.org/cache/epub/2160/pg2160-images.html
8492,ราชาในชุดเหลือง,Robert W. Chambers,https://www.gutenberg.org/cache/epub/8492/pg8492.cover.medium.jpg,https://www.gutenberg.org/cache/epub/8492/pg8492-images.html
1727,มหากาพย์โอดิสซีย์,Homer,https://www.gutenberg.org/cache/epub/1727/pg1727.cover.medium.jpg,https://www.gutenberg.org/cache/epub/1727/pg1727-images.html
1259,ยี่สิบปีต่อมา,Alexandre Dumas,https://www.gutenberg.org/cache/epub/1259/pg1259.cover.medium.jpg,https://www.gutenberg.org/cache/epub/1259/pg1259-images.html
2600,สงครามและสันติภาพ,Leo Tolstoy,https://www.gutenberg.org/cache/epub/2600/pg2600.cover.medium.jpg,https://www.gutenberg.org/cache/epub/2600/pg2600-images.html
4085,การผจญภัยของโรเดอริก แรนดอม,Tobias Smollett,https://www.gutenberg.org/cache/epub/4085/pg4085.cover.medium.jpg,https://www.gutenberg.org/cache/epub/4085/pg4085-images.html
6593,ประวัติศาสตร์ทอม โจนส์,Henry Fielding,https://www.gutenberg.org/cache/epub/6593/pg6593.cover.medium.jpg,https://www.gutenberg.org/cache/epub/6593/pg6593-images.html
16328,เบโอวูล์ฟ มหากาพย์โบราณ,J. Lesslie Hall,https://www.gutenberg.org/cache/epub/16328/pg16328.cover.medium.jpg,https://www.gutenberg.org/cache/epub/16328/pg16328-images.html
244,แรงพยาบาท,Arthur Conan Doyle,https://www.gutenberg.org/cache/epub/244/pg244.cover.medium.jpg,https://www.gutenberg.org/cache/epub/244/pg244-images.html
3296,คำสารภาพของนักบุญออกัสติน,St. Augustine,https://www.gutenberg.org/cache/epub/3296/pg3296.cover.medium.jpg,https://www.gutenberg.org/cache/epub/3296/pg3296-images.html
47,เหรียญกล้าหาญสีแดง,Stephen Crane,https://www.gutenberg.org/cache/epub/47/pg47.cover.medium.jpg,https://www.gutenberg.org/cache/epub/47/pg47-images.html
82,ไอแวนโฮ อัศวินผู้กล้า,Sir Walter Scott,https://www.gutenberg.org/cache/epub/82/pg82.cover.medium.jpg,https://www.gutenberg.org/cache/epub/82/pg82-images.html
284,สวนปริศนา,Frances Hodgson Burnett,https://www.gutenberg.org/cache/epub/284/pg284.cover.medium.jpg,https://www.gutenberg.org/cache/epub/284/pg284-images.html
78,จอมทัพแห่งดาวอังคาร,Edgar Rice Burroughs,https://www.gutenberg.org/cache/epub/78/pg78.cover.medium.jpg,https://www.gutenberg.org/cache/epub/78/pg78-images.html
41,ตำนานแห่งสลีปปี้ฮอลโลว์,Washington Irving,https://www.gutenberg.org/cache/epub/41/pg41.cover.medium.jpg,https://www.gutenberg.org/cache/epub/41/pg41-images.html
140,พูบลิอุส ชะตากรรมของชาติ The Federalist,Alexander Hamilton,https://www.gutenberg.org/cache/epub/140/pg140.cover.medium.jpg,https://www.gutenberg.org/cache/epub/140/pg140-images.html
71,ทวีปที่สาบสูญ,Edgar Rice Burroughs,https://www.gutenberg.org/cache/epub/71/pg71.cover.medium.jpg,https://www.gutenberg.org/cache/epub/71/pg71-images.html
160,การตื่นรู้ The Awakening,Kate Chopin,https://www.gutenberg.org/cache/epub/160/pg160.cover.medium.jpg,https://www.gutenberg.org/cache/epub/160/pg160-images.html
153,จูดผู้คลุมเครือ Jude the Obscure,Thomas Hardy,https://www.gutenberg.org/cache/epub/153/pg153.cover.medium.jpg,https://www.gutenberg.org/cache/epub/153/pg153-images.html
119,เรื่องเล่าเยอรมัน A Tramp Abroad,Mark Twain,https://www.gutenberg.org/cache/epub/119/pg119.cover.medium.jpg,https://www.gutenberg.org/cache/epub/119/pg119-images.html
177,โรเดอริก ฮัดสัน,Henry James,https://www.gutenberg.org/cache/epub/177/pg177.cover.medium.jpg,https://www.gutenberg.org/cache/epub/177/pg177-images.html`;

/**
 * Parse CSV text into EnglishBook array with adaptive column mapping
 */
export function parseEnglishBooksCSV(csvText: string): EnglishBook[] {
  if (!csvText || !csvText.trim()) return [];

  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  const books: EnglishBook[] = [];

  // Determine if first line is a header
  const firstLineLower = lines[0].toLowerCase();
  const startIndex = (firstLineLower.includes('id') || firstLineLower.includes('title') || firstLineLower.includes('ชื่อ')) ? 1 : 0;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Split CSV respecting quotes
    const cols: string[] = [];
    let current = '';
    let inQuote = false;

    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === ',' && !inQuote) {
        cols.push(current.trim().replace(/^["“]+|["”]+$/g, ''));
        current = '';
      } else {
        current += ch;
      }
    }
    cols.push(current.trim().replace(/^["“]+|["”]+$/g, ''));

    if (cols.length < 2) continue;

    let rawId = '';
    let rawTitle = '';
    let rawAuthor = '';
    let rawImage = '';
    let rawHtml = '';

    // Detect format based on column content:
    // Format A (User's sheet): Col A empty/index, Col B = ID (e.g. 6, 96), Col C = Title/Author, Col D = Link, Col E = HTML
    if ((!cols[0] || /^\d+$/.test(cols[0])) && cols[1] && /^\d+$/.test(cols[1])) {
      rawId = cols[1].trim();
      const titleAndAuthor = cols[2] || '';
      // Try to split title and author if multiple spaces exist
      const parts = titleAndAuthor.split(/\s{2,}|\t/).filter(Boolean);
      if (parts.length >= 2) {
        rawTitle = parts[0].trim();
        rawAuthor = parts[1].trim();
      } else {
        rawTitle = titleAndAuthor.trim();
        rawAuthor = '';
      }
      rawHtml = cols[4] || cols[3] || '';
    }
    // Format B (Standard 5-col): Col 0 = ID, Col 1 = Title, Col 2 = Author, Col 3 = Image, Col 4 = HTML
    else if (cols[0] && /^\d+$/.test(cols[0])) {
      rawId = cols[0].trim();
      rawTitle = cols[1] || 'ไม่มีชื่อ';
      rawAuthor = cols[2] || '';
      rawImage = cols[3] || '';
      rawHtml = cols[4] || '';
    }
    // Format C: General fallback
    else {
      // Check if any column contains a Gutenberg epub ID
      for (const col of cols) {
        const idMatch = col.match(/\/epub\/(\d+)/);
        if (idMatch) {
          rawId = idMatch[1];
          break;
        }
      }
      rawTitle = cols[1] || cols[0] || 'ไม่มีชื่อ';
      rawAuthor = cols[2] || '';
      rawHtml = cols[cols.length - 1] || '';
    }

    if (!rawId && !rawTitle) continue;

    // Ensure valid cover URL for Project Gutenberg
    let imageUrl = rawImage;
    if (!imageUrl && rawId) {
      imageUrl = `https://www.gutenberg.org/cache/epub/${rawId}/pg${rawId}.cover.medium.jpg`;
    }

    // Ensure valid HTML reading link
    let htmlUrl = rawHtml;
    if ((!htmlUrl || !htmlUrl.includes('images.html')) && rawId) {
      htmlUrl = `https://www.gutenberg.org/cache/epub/${rawId}/pg${rawId}-images.html`;
    }

    books.push({
      id: `en-${rawId || i}`,
      title: rawTitle,
      author: rawAuthor,
      category: 'คลังต้นฉบับ Gutenberg',
      url: htmlUrl || `https://www.gutenberg.org/ebooks/${rawId}`,
      html: htmlUrl,
      image: imageUrl,
      fallbackImage: rawId ? `https://www.gutenberg.org/cache/epub/${rawId}/pg${rawId}.cover.medium.jpg` : '',
      description: `วรรณกรรมฉบับต้นฉบับภาษาอังกฤษ (Project Gutenberg #${rawId || i})`,
      source: 'Project Gutenberg',
    });
  }

  return books;
}

/**
 * English books sourced from the user's Google Sheet dataset:
 * Parses all books with their IDs, Thai titles, cover images, and Gutenberg links.
 */
export const ENGLISH_BOOKS: EnglishBook[] = parseEnglishBooksCSV(RAW_ENGLISH_BOOKS_CSV);



