# InterLib V2 - คลังนิยายเล่าเรื่องและหนังสือแปลไทย

เว็บแอปพลิเคชันคลังหนังสือแปลไทย Google Docs พร้อมอ่านในตัว, หนังสือต้นฉบับภาษาอังกฤษจาก Project Gutenberg และวิดีโอคลิปนิยายเล่าเรื่องแบบพอตแคสต์ พร้อมระบบฝังฐานข้อมูลจาก Google Sheets ทั้ง 3 ชีทไว้ในโปรเจกต์โดยตรง

---

## 🌟 ฟีเจอร์หลัก (Key Features)

1. **ฝังฐานข้อมูล Google Sheets 3 ชีทในตัว (Pre-embedded Dataset)**
   - ข้อมูลหนังสือแปลไทยจากทั้ง 3 ชีทถูกฝังรวมอยู่ในโปรเจกต์ (`src/data/sheetsData.ts`)
   - ใช้งานและแสดงผลได้ทันทีโดยไม่ต้องรอโหลดชีท แม้เปิดใช้งานออฟไลน์หรือนำไป Deploy บนโฮสต์ใดๆ

2. **ระบบซิงค์ข้อมูลสดอัตโนมัติ (Live Auto-Sync)**
   - ดึงข้อมูลอัตโนมัติและอัปเดตข้อมูลสดใหม่ทันทีเมื่อเปิดเข้าใช้งานหน้าแรก
   - มีระบบดึงข้อมูลแบบแบ่งชุดทีละ 1,000 เล่ม และรวมข้อมูลทั้ง 3 ชีทเข้าด้วยกันอัตโนมัติ
   - บันทึกลงแคชเบราว์เซอร์อัตโนมัติเพื่อให้การเปิดใช้งานครั้งถัดไปรวดเร็วทันใจ

3. **คลังเนื้อหาครบวงจร**
   - **หน้าแรก (คลังหนังสือแปลไทย)**: เปิดอ่านไฟล์เอกสาร Google Docs ทันทีผ่าน Embedded Viewer พร้อมตัวกรองหมวดหมู่และระบบค้นหา
   - **คลังภาษาอังกฤษ**: รวมหนังสือคลาสสิกภาษาอังกฤษจาก Project Gutenberg
   - **นิยายเล่าเรื่อง**: รวมคลิปวิดีโอ YouTube พอตแคสต์ พร้อมเครื่องเล่นในตัว
   - **รายการโปรด**: บันทึกหนังสือและวิดีโอที่ชอบไว้เปิดดูย้อนหลังได้ตลอดเวลา

---

## 🚀 วิธีติดตั้งและรันในเครื่อง (Local Development)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. เริ่มต้นเซิร์ฟเวอร์สำหรับพัฒนา (Development Server)
npm run dev

# 3. บิลด์สำหรับ Production
npm run build

# 4. ทดสอบพรีวิวโค้ดที่บิลด์แล้ว
npm run preview
```

---

## 📤 วิธีอัปเดตโค้ดขึ้น GitHub (Push to GitHub)

### วิธีที่ 1: ใช้ปุ่มส่งออกของ Google AI Studio (ง่ายที่สุด)
1. ที่มุมขวาบนของหน้าจอ AI Studio คลิกที่เมนู **Settings / เมนูตัวเลือก (...)** หรือปุ่ม **Export**
2. เลือก **Export to GitHub**
3. เลือก Repository ที่ต้องการอัปเดต แล้วกดยืนยัน โค้ดทั้งหมดจะถูก Push ขึ้น GitHub ทันที

### วิธีที่ 2: ใช้คำสั่ง Git ผ่าน Terminal
หากต้องการ Push ไปยัง GitHub Repository ของคุณเอง:

```bash
# 1. เชื่อมต่อกับ Repository บน GitHub (เปลี่ยน YOUR_USERNAME และ REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 2. ตั้งชื่อ Branch หลักเป็น main
git branch -M main

# 3. อัปเดตโค้ดทั้งหมด
git add .
git commit -m "Update automatic 3-sheet database embed and GitHub export"

# 4. Push โค้ดขึ้น GitHub
git push -u origin main --force
```

---

## 🛠️ โครงสร้างไฟล์ข้อมูล (Data Architecture)

- `src/data/sheetsData.ts`: ฐานข้อมูลหนังสือแปลไทย 3 ชีทที่ฝังไว้ในโค้ด (พร้อมฟังก์ชันแปลง CSV เป็นโมเดลหนังสือ)
- `src/data/englishBooksData.ts`: ฐานข้อมูลหนังสือภาษาอังกฤษ (Project Gutenberg)
- `src/data/videosData.ts`: ฐานข้อมูลวิดีโอนิยายเล่าเรื่องพอตแคสต์
- `src/services/sheetSync.ts`: Service สำหรับดึงข้อมูลสดจาก Google Sheets อัตโนมัติ
