# Template Google Sheet untuk Portfolio Projects

## Cara Menggunakan Template Ini

1. Copy struktur di bawah ke Google Sheets Anda
2. Isi dengan data project Anda
3. Pastikan nama sheet adalah "projects"

---

## Struktur Sheet: projects

**Row 1 (Header):**
```
title | description | image | technologies | url
```

**Contoh Data (Row 2-4):**

### Row 2:
```
E-Commerce Website | A fully responsive online store with shopping cart, product catalog, and secure checkout system | https://placehold.co/600x400/1f2937/60a5fa?text=E-Commerce | HTML,CSS,JavaScript,Laravel,MySQL | https://example-ecommerce.com
```

### Row 3:
```
Portfolio Website | Modern and clean portfolio website showcasing projects and skills with smooth animations | https://placehold.co/600x400/1f2937/60a5fa?text=Portfolio | HTML,Tailwind CSS,JavaScript | https://example-portfolio.com
```

### Row 4:
```
Task Management App | Web application for managing tasks and projects with drag-and-drop functionality and team collaboration | https://placehold.co/600x400/1f2937/60a5fa?text=Task+App | React,Node.js,MongoDB,Express | https://example-tasks.com
```

---

## Penjelasan Kolom:

1. **title** (required)
   - Judul project Anda
   - Contoh: "E-Commerce Website"

2. **description** (required)
   - Deskripsi singkat project
   - Max 2-3 kalimat
   - Akan di-truncate di display

3. **image** (required)
   - URL gambar project (600x400px recommended)
   - Bisa dari: ImgBB, Imgur, Cloudinary, GitHub
   - Jika kosong, akan pakai placeholder

4. **technologies** (required)
   - Teknologi yang digunakan
   - Pisahkan dengan koma (,)
   - Contoh: "HTML,CSS,JavaScript,React"
   - Jangan pakai spasi berlebih

5. **url** (optional)
   - Link ke live demo atau GitHub
   - Harus lengkap dengan http:// atau https://
   - Jika kosong, button "View Project" tidak muncul

---

## Tips Upload Gambar:

### ImgBB (Paling Mudah):
1. Buka https://imgbb.com
2. Upload gambar
3. Copy "Direct Link"
4. Paste ke kolom image

### Imgur:
1. Buka https://imgur.com
2. Upload gambar
3. Klik kanan gambar → Copy image address
4. Paste ke kolom image

### Via GitHub:
1. Upload ke repository
2. Buka file, klik "Raw"
3. Copy URL
4. Paste ke kolom image

---

## Contoh Sheet dalam Format Table:

| title | description | image | technologies | url |
|-------|-------------|-------|--------------|-----|
| E-Commerce Website | A fully responsive online store with shopping cart | https://i.ibb.co/xxx/image.jpg | HTML,CSS,JavaScript,Laravel | https://demo.com |
| Portfolio Site | Modern portfolio website | https://i.ibb.co/yyy/image.jpg | HTML,Tailwind,JavaScript | https://portfolio.com |
| Blog Platform | Content management system | https://i.ibb.co/zzz/image.jpg | React,Node.js,MongoDB | https://blog.com |

---

## Struktur Sheet: contacts (untuk Contact Form)

**Row 1 (Header):**
```
Timestamp | Name | Email | Subject | Message
```

Data akan otomatis terisi saat ada yang submit contact form.

---

## ⚠️ Penting:

1. Jangan ubah nama kolom di Row 1
2. Jangan tambah kolom baru di antara kolom yang ada
3. Boleh tambah kolom di akhir untuk notes pribadi
4. Sheet harus di-share sebagai "Anyone with the link can view"
5. Baris kosong akan di-skip otomatis

---

## 🔍 Troubleshooting:

**Projects tidak muncul:**
- Pastikan nama sheet = "projects" (lowercase)
- Pastikan Row 1 adalah header yang benar
- Pastikan minimal ada 1 baris data
- Cek Sheet ID dan API Key

**Gambar tidak muncul:**
- Pastikan URL lengkap (mulai dengan https://)
- Test URL di browser terlebih dahulu
- Gunakan direct image link, bukan page link

**Technologies tidak terpisah:**
- Gunakan koma tanpa spasi
- Contoh: "HTML,CSS,JavaScript" ✅
- Bukan: "HTML, CSS, JavaScript" ❌
