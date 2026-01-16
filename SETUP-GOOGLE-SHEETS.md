# Panduan Setup Google Sheets sebagai Database

## 📊 Setup Google Sheets untuk Projects

### 1. Buat Google Sheet Baru

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru
3. Beri nama: "Portfolio Projects"

### 2. Struktur Sheet untuk Projects

Buat sheet dengan nama `projects` dan kolom berikut:

| title | description | image | technologies | url |
|-------|-------------|-------|--------------|-----|
| E-Commerce Website | A fully responsive online store | https://... | HTML,CSS,JavaScript,Laravel | https://... |
| Portfolio Site | Modern portfolio website | https://... | HTML,Tailwind,JavaScript | https://... |

**Kolom yang diperlukan:**
- `title`: Judul project
- `description`: Deskripsi singkat
- `image`: URL gambar (bisa dari ImgBB, Imgur, atau cloud storage)
- `technologies`: Technologies yang digunakan (pisahkan dengan koma)
- `url`: Link ke project (optional)

### 3. Dapatkan Google Sheets API Key

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih existing
3. Enable **Google Sheets API**:
   - Klik "Enable APIs and Services"
   - Cari "Google Sheets API"
   - Klik "Enable"
4. Buat API Key:
   - Pergi ke "Credentials"
   - Klik "Create Credentials" → "API Key"
   - Copy API Key yang dibuat

### 4. Share Google Sheet

1. Klik tombol "Share" di Google Sheet
2. Ubah permission menjadi **"Anyone with the link can view"**
3. Copy **Sheet ID** dari URL:
   - URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy bagian `SHEET_ID_HERE`

### 5. Update Konfigurasi di Code

Edit file `public-site/js/portfolio.js`:

```javascript
const CONFIG = {
    SHEET_ID: 'PASTE_YOUR_SHEET_ID_HERE',
    API_KEY: 'PASTE_YOUR_API_KEY_HERE',
    SHEET_NAME: 'projects', // Nama tab sheet
};
```

---

## 📧 Setup Google Sheets untuk Contact Form

### 1. Buat Google Apps Script

1. Di Google Sheet, buka **Extensions** → **Apps Script**
2. Hapus kode default dan paste kode berikut:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('contacts');
    
    // Parse data
    const data = JSON.parse(e.postData.contents);
    
    // Add row with data
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.subject,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Message received'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Klik **Deploy** → **New deployment**
4. Pilih type: **Web app**
5. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Klik **Deploy**
7. Copy **Web app URL**

### 2. Buat Sheet untuk Contacts

1. Buat sheet baru dengan nama `contacts`
2. Tambahkan header di row pertama:
   - `Timestamp | Name | Email | Subject | Message`

### 3. Update Contact Form URL

Edit file `public-site/js/main.js`:

```javascript
const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';
```

---

## 🚀 Deploy ke Vercel

### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard

1. Push code ke GitHub
2. Buka [Vercel Dashboard](https://vercel.com)
3. Klik "New Project"
4. Import repository GitHub Anda
5. Settings:
   - Framework Preset: **Other**
   - Root Directory: `public-site`
   - Build Command: (kosongkan)
   - Output Directory: (kosongkan)
6. Klik **Deploy**

### 3. Deploy via CLI

```bash
cd /path/to/personal-web
vercel --prod
```

Pilih settings:
- Setup: **No**
- Directory: `public-site`
- Build: **No**

---

## 📝 Upload Gambar Project

### Rekomendasi Service Upload Gambar:

1. **ImgBB** (Gratis, mudah)
   - https://imgbb.com
   - Upload → Copy direct link

2. **Imgur** (Gratis)
   - https://imgur.com
   - Upload → Copy image URL

3. **Cloudinary** (Gratis tier tersedia)
   - https://cloudinary.com
   - Professional option

4. **GitHub** (Gratis, untuk tech projects)
   - Upload ke repo → Copy raw URL

---

## 🔧 Testing Lokal

### Test di Browser:

1. Buka folder `public-site`
2. Double click `index.html`
3. Atau gunakan Live Server:

```bash
cd public-site
python -m http.server 8000
# Atau
npx http-server
```

---

## ✅ Checklist Setup

- [ ] Buat Google Sheet dengan struktur yang benar
- [ ] Enable Google Sheets API
- [ ] Dapatkan API Key
- [ ] Share sheet (public view)
- [ ] Copy Sheet ID
- [ ] Update `portfolio.js` dengan Sheet ID dan API Key
- [ ] Buat Apps Script untuk contact form
- [ ] Deploy Apps Script sebagai Web App
- [ ] Update `main.js` dengan Web App URL
- [ ] Upload gambar projects
- [ ] Test lokal
- [ ] Deploy ke Vercel

---

## 🎯 Tips

- **Gambar**: Gunakan ukuran 600x400px untuk hasil optimal
- **Technologies**: Pisahkan dengan koma tanpa spasi berlebih
- **URL**: Pastikan dimulai dengan `http://` atau `https://`
- **Testing**: Test contact form dan portfolio loading sebelum deploy

---

## 🆘 Troubleshooting

**Projects tidak muncul:**
- Pastikan Sheet ID dan API Key benar
- Pastikan sheet di-share sebagai public
- Cek console browser untuk error

**Contact form tidak berfungsi:**
- Pastikan Apps Script sudah di-deploy
- Pastikan permission di-set ke "Anyone"
- Cek Web App URL sudah benar

**Deploy gagal:**
- Pastikan struktur folder benar
- Cek `vercel.json` configuration
- Pastikan semua file ada di folder `public-site`
