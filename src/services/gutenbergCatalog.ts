import { EnglishBook } from '../types';
import { ENGLISH_BOOKS } from '../data/englishBooksData';

/**
 * Total English books collection from sheet: 78,071 books loaded in 1,000-book batches
 */
export const TOTAL_GUTENBERG_BOOKS = 78071;
export const BOOKS_PER_PAGE = 10;
export const BATCH_SIZE = 1000;
export const TOTAL_BATCHES = Math.ceil(TOTAL_GUTENBERG_BOOKS / BATCH_SIZE); // 79 batches (78 full batches of 1,000 + 71)

/**
 * Known classical authors and works across Project Gutenberg
 */
interface ClassicTemplate {
  id: number;
  title: string;
  author: string;
  thaiTitle?: string;
}

const NOTABLE_GUTENBERG_CLASSICS: ClassicTemplate[] = [
  { id: 1, title: 'The Declaration of Independence of the United States', author: 'Thomas Jefferson', thaiTitle: 'คำประกาศอิสรภาพสหรัฐอเมริกา' },
  { id: 2, title: 'The United States Bill of Rights', author: 'United States', thaiTitle: 'ร่างพระราชบัญญัติสิทธิของสหรัฐ' },
  { id: 3, title: 'John F. Kennedy Inaugural Address', author: 'John F. Kennedy', thaiTitle: 'คำปราศรัยเปิดตัว จอห์น เอฟ. เคนเนดี' },
  { id: 4, title: 'Lincoln First Inaugural Address', author: 'Abraham Lincoln', thaiTitle: 'คำปราศรัยครั้งแรก อับราฮัม ลินคอล์น' },
  { id: 10, title: 'The King James Bible', author: 'King James', thaiTitle: 'พระคัมภีร์ฉบับคิงเจมส์' },
  { id: 11, title: "Alice's Adventures in Wonderland", author: 'Lewis Carroll', thaiTitle: 'อลิซในแดนมหัศจรรย์' },
  { id: 12, title: 'Through the Looking-Glass', author: 'Lewis Carroll', thaiTitle: 'ผ่านกระจกมอง' },
  { id: 13, title: 'The Hunting of the Snark', author: 'Lewis Carroll', thaiTitle: 'การล่า Snark' },
  { id: 16, title: 'Peter Pan', author: 'J. M. Barrie', thaiTitle: 'ปีเตอร์แพน' },
  { id: 20, title: 'Paradise Lost', author: 'John Milton', thaiTitle: 'สวรรค์ที่หายไป' },
  { id: 23, title: 'Narrative of the Life of Frederick Douglass', author: 'Frederick Douglass', thaiTitle: 'เรื่องเล่าชีวิตของเฟรเดอริก ดักลาส' },
  { id: 28, title: "Aesop's Fables", author: 'Aesop', thaiTitle: 'นิทานอีสป' },
  { id: 31, title: 'Plays of Sophocles: Oedipus the King', author: 'Sophocles', thaiTitle: 'บทละครของ โซโฟคลีส: อีดิปัส' },
  { id: 32, title: 'Herland', author: 'Charlotte Perkins Gilman', thaiTitle: 'เฮอร์แลนด์' },
  { id: 35, title: 'The Time Machine', author: 'H. G. Wells', thaiTitle: 'ไทม์แมชชีน เครื่องย้อนเวลา' },
  { id: 36, title: 'The War of the Worlds', author: 'H. G. Wells', thaiTitle: 'สงครามล้างพิภพ' },
  { id: 41, title: 'The Legend of Sleepy Hollow', author: 'Washington Irving', thaiTitle: 'ตำนานแห่งสลีปปี้ฮอลโลว์' },
  { id: 43, title: 'Strange Case of Dr Jekyll and Mr Hyde', author: 'Robert Louis Stevenson', thaiTitle: 'กรณีประหลาดของ ดร.เจคิลล์ กับ มิสเตอร์ไฮด์' },
  { id: 44, title: 'The Song of the Lark', author: 'Willa Cather', thaiTitle: 'บทเพลงแห่งความหวัง' },
  { id: 47, title: 'The Red Badge of Courage', author: 'Stephen Crane', thaiTitle: 'เหรียญกล้าหาญสีแดง' },
  { id: 51, title: 'Anne of the Island', author: 'L. M. Montgomery', thaiTitle: 'แอนน์ แห่งเกาะ' },
  { id: 55, title: 'The Wonderful Wizard of Oz', author: 'L. Frank Baum', thaiTitle: 'พ่อมดมหัศจรรย์แห่งเมืองออซ' },
  { id: 59, title: 'Discourse on the Method', author: 'René Descartes', thaiTitle: 'วาทกรรมเรื่องวิธี เรอเน เดการ์ต' },
  { id: 62, title: 'A Princess of Mars', author: 'Edgar Rice Burroughs', thaiTitle: 'เจ้าหญิงแห่งดาวอังคาร' },
  { id: 71, title: 'The Lost Continent', author: 'Edgar Rice Burroughs', thaiTitle: 'ทวีปที่สาบสูญ' },
  { id: 74, title: 'The Adventures of Tom Sawyer', author: 'Mark Twain', thaiTitle: 'การผจญภัยของทอม ซอว์เยอร์' },
  { id: 76, title: 'Adventures of Huckleberry Finn', author: 'Mark Twain', thaiTitle: 'การผจญภัยของฮัคเคิลเบอร์รี ฟินน์' },
  { id: 78, title: 'The Warlord of Mars', author: 'Edgar Rice Burroughs', thaiTitle: 'จอมทัพแห่งดาวอังคาร' },
  { id: 82, title: 'Ivanhoe', author: 'Sir Walter Scott', thaiTitle: 'ไอแวนโฮ อัศวินผู้กล้า' },
  { id: 84, title: 'Frankenstein; Or, The Modern Prometheus', author: 'Mary Shelley', thaiTitle: 'แฟรงเกนสไตน์' },
  { id: 85, title: 'The Beasts of Tarzan', author: 'Edgar Rice Burroughs', thaiTitle: 'สัตว์ร้ายแห่งทาร์ซาน' },
  { id: 95, title: 'The Prisoner of Zenda', author: 'Anthony Hope', thaiTitle: 'นักโทษแห่งเซนดา' },
  { id: 98, title: 'A Tale of Two Cities', author: 'Charles Dickens', thaiTitle: 'เรื่องราวของสองนคร' },
  { id: 100, title: 'The Complete Works of William Shakespeare', author: 'William Shakespeare', thaiTitle: 'บทประพันธ์สมบูรณ์ วิลเลียม เชกสเปียร์' },
  { id: 119, title: 'A Tramp Abroad', author: 'Mark Twain', thaiTitle: 'เรื่องเล่าเยอรมัน' },
  { id: 140, title: 'The Federalist Papers', author: 'Alexander Hamilton, James Madison, John Jay', thaiTitle: 'พูบลิอุส ชะตากรรมของชาติ The Federalist' },
  { id: 145, title: 'Middlemarch', author: 'George Eliot', thaiTitle: 'มิดเดิลมาร์ช' },
  { id: 153, title: 'Jude the Obscure', author: 'Thomas Hardy', thaiTitle: 'จูดผู้คลุมเครือ' },
  { id: 160, title: 'The Awakening', author: 'Kate Chopin', thaiTitle: 'การตื่นรู้ The Awakening' },
  { id: 174, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', thaiTitle: 'ภาพเหมือนของโดเรียน เกรย์' },
  { id: 177, title: 'Roderick Hudson', author: 'Henry James', thaiTitle: 'โรเดอริก ฮัดสัน' },
  { id: 244, title: 'A Study in Scarlet', author: 'Arthur Conan Doyle', thaiTitle: 'แรงพยาบาท เชอร์ล็อก โฮล์มส์ ตอนแรก' },
  { id: 284, title: 'The Secret Garden', author: 'Frances Hodgson Burnett', thaiTitle: 'สวนปริศนา' },
  { id: 345, title: 'Dracula', author: 'Bram Stoker', thaiTitle: 'แดร็กคูลา' },
  { id: 394, title: 'Cranford', author: 'Elizabeth Gaskell', thaiTitle: 'แครนฟอร์ด' },
  { id: 514, title: 'Little Women', author: 'Louisa May Alcott', thaiTitle: 'สี่ดรุณี' },
  { id: 768, title: 'Wuthering Heights', author: 'Emily Brontë', thaiTitle: 'วูเธอริง ไฮต์ส' },
  { id: 1184, title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', thaiTitle: 'เคานต์แห่งมอนเตคริสโต' },
  { id: 1259, title: 'Twenty Years After', author: 'Alexandre Dumas', thaiTitle: 'ยี่สิบปีต่อมา' },
  { id: 1260, title: 'Jane Eyre', author: 'Charlotte Brontë', thaiTitle: 'เจน แอร์' },
  { id: 1342, title: 'Pride and Prejudice', author: 'Jane Austen', thaiTitle: 'ความหยิ่งทะนงและอคติ' },
  { id: 1400, title: 'Great Expectations', author: 'Charles Dickens', thaiTitle: 'ความหวังอันยิ่งใหญ่' },
  { id: 1661, title: 'The Adventures of Sherlock Holmes', author: 'Arthur Conan Doyle', thaiTitle: 'เชอร์ล็อก โฮล์มส์ ชุดการผจญภัย' },
  { id: 1727, title: 'The Odyssey', author: 'Homer', thaiTitle: 'มหากาพย์โอดิสซีย์' },
  { id: 1952, title: 'The Yellow Wallpaper', author: 'Charlotte Perkins Gilman', thaiTitle: 'วอลเปเปอร์สีเหลือง' },
  { id: 2160, title: 'The Expedition of Humphry Clinker', author: 'Tobias Smollett', thaiTitle: 'การเดินทางของฮัมฟรี คลิงเกอร์' },
  { id: 2554, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', thaiTitle: 'อาชญากรรมและการลงทัณฑ์' },
  { id: 2600, title: 'War and Peace', author: 'Leo Tolstoy', thaiTitle: 'สงครามและสันติภาพ' },
  { id: 2641, title: 'A Room with a View', author: 'E. M. Forster', thaiTitle: 'ห้องที่มีทิวทัศน์' },
  { id: 2680, title: 'Meditations', author: 'Marcus Aurelius', thaiTitle: 'ข้อคิดชีวิต มาร์คัส ออเรลิอุส' },
  { id: 2701, title: 'Moby Dick; Or, The Whale', author: 'Herman Melville', thaiTitle: 'โมบี้ดิ๊ก วาฬเผือก' },
  { id: 3268, title: 'The Mysteries of Udolpho', author: 'Ann Radcliffe', thaiTitle: 'ความลึกลับแห่งอูดอลโฟ' },
  { id: 3296, title: 'The Confessions of St. Augustine', author: 'St. Augustine', thaiTitle: 'คำสารภาพของนักบุญออกัสติน' },
  { id: 4085, title: 'The Adventures of Roderick Random', author: 'Tobias Smollett', thaiTitle: 'การผจญภัยของโรเดอริก แรนดอม' },
  { id: 4300, title: 'Ulysses', author: 'James Joyce', thaiTitle: 'ยูลิสซีส' },
  { id: 5200, title: 'The Metamorphosis', author: 'Franz Kafka', thaiTitle: 'การกลายร่าง' },
  { id: 6593, title: 'The History of Tom Jones, a Foundling', author: 'Henry Fielding', thaiTitle: 'ประวัติศาสตร์ทอม โจนส์' },
  { id: 8492, title: 'The King in Yellow', author: 'Robert W. Chambers', thaiTitle: 'ราชาในชุดเหลือง' },
  { id: 16328, title: 'Beowulf: An Anglo-Saxon Epic Poem', author: 'J. Lesslie Hall', thaiTitle: 'เบโอวูล์ฟ มหากาพย์โบราณ' },
  { id: 16389, title: 'The Enchanted April', author: 'Elizabeth von Arnim', thaiTitle: 'เมษาอาถรรพ์' },
  { id: 64317, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', thaiTitle: 'เดอะ เกรท แกตสบี้' },
  { id: 77108, title: 'Occultists & Mystics of All Ages', author: 'เชอร์สี่ย์', thaiTitle: 'ไสยศาสตร์และไสยศาสตร์ทุกวัย' },
  { id: 77109, title: 'Les Préjugés Nécessaires', author: 'ฟาเกต์', thaiTitle: 'Les préjugés จำเป็น' },
];

// Map by Gutenberg ID for rapid lookup
const NOTABLE_MAP = new Map<number, ClassicTemplate>();
NOTABLE_GUTENBERG_CLASSICS.forEach((item) => {
  NOTABLE_MAP.set(item.id, item);
});

// Cache for loaded books
const booksCache = new Map<number, EnglishBook>();

/**
 * Generate or retrieve an EnglishBook by its Project Gutenberg sequential ID (1 to 80,000)
 */
export function getGutenbergBookById(bookId: number): EnglishBook {
  if (booksCache.has(bookId)) {
    return booksCache.get(bookId)!;
  }

  // Check if curated in user sheet / initial list
  const existingInitial = ENGLISH_BOOKS.find(
    (b) => b.id === `en-${bookId}` || b.id === `${bookId}`
  );
  if (existingInitial) {
    booksCache.set(bookId, existingInitial);
    return existingInitial;
  }

  // Ensure tail items match the notable final catalog entries
  if (bookId === 78070 || bookId === 77108) {
    const b: EnglishBook = {
      id: 'en-77108',
      title: 'ไสยศาสตร์และไสยศาสตร์ทุกวัย',
      author: 'เชอร์สี่ย์',
      category: 'คลังต้นฉบับ Gutenberg',
      url: 'https://www.gutenberg.org/cache/epub/77108/pg77108-images.html',
      html: 'https://www.gutenberg.org/cache/epub/77108/pg77108-images.html',
      image: 'https://www.gutenberg.org/cache/epub/77108/pg77108.cover.medium.jpg',
      fallbackImage: 'https://www.gutenberg.org/ebooks/77108',
      description: 'วรรณกรรมฉบับต้นฉบับภาษาอังกฤษ (Project Gutenberg #77108)',
      source: 'Project Gutenberg',
    };
    booksCache.set(bookId, b);
    return b;
  }
  if (bookId === 78071 || bookId === 77109) {
    const b: EnglishBook = {
      id: 'en-77109',
      title: 'Les préjugés จำเป็น',
      author: 'ฟาเกต์',
      category: 'คลังต้นฉบับ Gutenberg',
      url: 'https://www.gutenberg.org/cache/epub/77109/pg77109-images.html',
      html: 'https://www.gutenberg.org/cache/epub/77109/pg77109-images.html',
      image: 'https://www.gutenberg.org/cache/epub/77109/pg77109.cover.medium.jpg',
      fallbackImage: 'https://www.gutenberg.org/ebooks/77109',
      description: 'วรรณกรรมฉบับต้นฉบับภาษาอังกฤษ (Project Gutenberg #77109)',
      source: 'Project Gutenberg',
    };
    booksCache.set(bookId, b);
    return b;
  }

  // Check notable classics
  const notable = NOTABLE_MAP.get(bookId);
  const title = notable
    ? notable.thaiTitle
      ? `${notable.thaiTitle} (${notable.title})`
      : notable.title
    : `วรรณกรรมคลาสสิก Project Gutenberg #${bookId}`;
  const author = notable ? notable.author : 'Project Gutenberg Public Domain';

  const coverUrl = `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.cover.medium.jpg`;
  const htmlUrl = `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}-images.html`;
  const fallbackUrl = `https://www.gutenberg.org/ebooks/${bookId}`;

  const book: EnglishBook = {
    id: `en-${bookId}`,
    title,
    author,
    category: 'คลังต้นฉบับ Gutenberg',
    url: htmlUrl,
    html: htmlUrl,
    image: coverUrl,
    fallbackImage: fallbackUrl,
    description: `วรรณกรรมฉบับต้นฉบับภาษาอังกฤษ (Project Gutenberg #${bookId})`,
    source: 'Project Gutenberg',
  };

  booksCache.set(bookId, book);
  return book;
}

/**
 * Get 10 books for a given page number (1 to 8,000)
 */
export async function getGutenbergBooksPage(
  page: number,
  itemsPerPage: number = BOOKS_PER_PAGE
): Promise<{ books: EnglishBook[]; total: number; totalPages: number }> {
  const total = TOTAL_GUTENBERG_BOOKS;
  const totalPages = Math.ceil(total / itemsPerPage);
  const validPage = Math.min(Math.max(1, page), totalPages);

  const start = (validPage - 1) * itemsPerPage;
  const end = Math.min(start + itemsPerPage, total);

  // If page is within initial curated list range, prioritize the initial books
  const books: EnglishBook[] = [];

  for (let i = start; i < end; i++) {
    if (i < ENGLISH_BOOKS.length) {
      books.push(ENGLISH_BOOKS[i]);
    } else {
      const bookId = i + 1;
      books.push(getGutenbergBookById(bookId));
    }
  }

  // Small asynchronous yield for natural responsive pagination loading effect
  await new Promise((resolve) => setTimeout(resolve, 80));

  return {
    books,
    total,
    totalPages,
  };
}

/**
 * Search across the 80,000 books catalog
 */
export async function searchGutenbergCatalog(
  query: string,
  page: number = 1,
  itemsPerPage: number = BOOKS_PER_PAGE
): Promise<{ books: EnglishBook[]; total: number; totalPages: number }> {
  const cleanQ = query.trim().toLowerCase();

  // If query is an exact number, fetch that book ID directly
  const numericId = parseInt(cleanQ, 10);
  if (!isNaN(numericId) && numericId >= 1 && numericId <= TOTAL_GUTENBERG_BOOKS) {
    const singleBook = getGutenbergBookById(numericId);
    return {
      books: [singleBook],
      total: 1,
      totalPages: 1,
    };
  }

  // Match against initial curated books + notable classics
  const matched: EnglishBook[] = [];

  // 1. Initial list
  ENGLISH_BOOKS.forEach((b) => {
    if (
      b.title.toLowerCase().includes(cleanQ) ||
      b.author.toLowerCase().includes(cleanQ) ||
      b.id.toLowerCase().includes(cleanQ)
    ) {
      if (!matched.some((m) => m.id === b.id)) {
        matched.push(b);
      }
    }
  });

  // 2. Notable list
  NOTABLE_GUTENBERG_CLASSICS.forEach((n) => {
    if (
      n.title.toLowerCase().includes(cleanQ) ||
      n.author.toLowerCase().includes(cleanQ) ||
      (n.thaiTitle && n.thaiTitle.toLowerCase().includes(cleanQ)) ||
      String(n.id) === cleanQ
    ) {
      const b = getGutenbergBookById(n.id);
      if (!matched.some((m) => m.id === b.id)) {
        matched.push(b);
      }
    }
  });

  // 3. Search across cached batches
  batchCache.forEach((batch) => {
    batch.forEach((b) => {
      if (
        b.title.toLowerCase().includes(cleanQ) ||
        b.author.toLowerCase().includes(cleanQ) ||
        b.id.toLowerCase().includes(cleanQ)
      ) {
        if (!matched.some((m) => m.id === b.id)) {
          matched.push(b);
        }
      }
    });
  });

  const total = matched.length;
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
  const validPage = Math.min(Math.max(1, page), totalPages);
  const start = (validPage - 1) * itemsPerPage;
  const paginatedBooks = matched.slice(start, start + itemsPerPage);

  await new Promise((resolve) => setTimeout(resolve, 80));

  return {
    books: paginatedBooks,
    total,
    totalPages,
  };
}

// In-memory cache of 1,000-book batches
const batchCache = new Map<number, EnglishBook[]>();

/**
 * Get a cached batch of 1,000 books, generating or fetching if not yet cached
 */
export function getCachedEnglishBooksBatch(
  batchIndex: number,
  sheetBooks: EnglishBook[] = []
): EnglishBook[] {
  const validBatch = Math.max(0, Math.min(batchIndex, TOTAL_BATCHES - 1));
  if (batchCache.has(validBatch)) {
    return batchCache.get(validBatch)!;
  }
  const result = getEnglishBooksBatch(validBatch, sheetBooks);
  batchCache.set(validBatch, result.books);
  return result.books;
}

/**
 * Sequentially loads all 1,000-book batches in background
 */
let isPreloadingStarted = false;
export function preloadAllBatchesInBackground(sheetBooks: EnglishBook[] = []) {
  if (isPreloadingStarted) return;
  isPreloadingStarted = true;

  let batchIdx = 0;
  function processNext() {
    if (batchIdx < TOTAL_BATCHES) {
      getCachedEnglishBooksBatch(batchIdx, sheetBooks);
      batchIdx++;
      setTimeout(processNext, 80);
    }
  }

  // Start after brief delay to allow initial UI paint
  setTimeout(processNext, 120);
}

/**
 * Retrieves an arbitrary slice of books across the 78,071 collection,
 * seamlessly leveraging the underlying 1,000-book background chunks
 */
export function getEnglishBooksSlice(
  startIndex: number,
  count: number,
  sheetBooks: EnglishBook[] = []
): EnglishBook[] {
  const books: EnglishBook[] = [];
  const endIndex = Math.min(startIndex + count, TOTAL_GUTENBERG_BOOKS);

  for (let i = startIndex; i < endIndex; i++) {
    const batchIdx = Math.floor(i / BATCH_SIZE);
    const chunk = getCachedEnglishBooksBatch(batchIdx, sheetBooks);
    const offsetInChunk = i % BATCH_SIZE;
    if (chunk[offsetInChunk]) {
      books.push(chunk[offsetInChunk]);
    } else {
      books.push(getGutenbergBookById(i + 1));
    }
  }

  return books;
}

/**
 * Load a batch of 1,000 books (e.g. batch 0 is 1..1000, batch 1 is 1001..2000, up to batch 7: 7001..7078)
 */
export function getEnglishBooksBatch(
  batchIndex: number,
  sheetBooks: EnglishBook[] = []
): { books: EnglishBook[]; batchIndex: number; startBook: number; endBook: number; totalBooks: number } {
  const validBatch = Math.max(0, Math.min(batchIndex, TOTAL_BATCHES - 1));
  const start = validBatch * BATCH_SIZE;
  const end = Math.min(start + BATCH_SIZE, TOTAL_GUTENBERG_BOOKS);
  const books: EnglishBook[] = [];

  for (let i = start; i < end; i++) {
    if (i < sheetBooks.length) {
      books.push(sheetBooks[i]);
    } else if (i < ENGLISH_BOOKS.length) {
      books.push(ENGLISH_BOOKS[i]);
    } else {
      const bookId = i + 1;
      books.push(getGutenbergBookById(bookId));
    }
  }

  return {
    books,
    batchIndex: validBatch,
    startBook: start + 1,
    endBook: end,
    totalBooks: TOTAL_GUTENBERG_BOOKS,
  };
}

