# 🚀 Quick Deploy Guide - 5 Langkah ke Vercel

## Langkah 1: Setup Google Sheets (15 menit)

### A. Buat Sheet untuk Projects
1. Buka https://sheets.google.com
2. Buat spreadsheet baru: "Portfolio Projects"
3. Buat tab baru, rename jadi `projects`
4. Isi header di Row 1:
   ```
   title | description | image | technologies | url
   ```
5. Isi minimal 1-3 project (contoh di GOOGLE-SHEETS-TEMPLATE.md)

### B. Dapatkan Sheet ID
1. Lihat URL Google Sheet:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_DISINI/edit
   ```
2. Copy bagian `SHEET_ID_DISINI`

### C. Share Sheet
1. Klik tombol "Share"
2. Ubah ke: "Anyone with the link" → "Viewer"
3. Klik "Done"

---

## Langkah 2: Dapatkan Google API Key (5 menit)

1. Buka https://console.cloud.google.com/
2. Buat project baru atau pilih existing
3. Cari "Google Sheets API" → Enable
4. Pergi ke "Credentials"
5. Klik "Create Credentials" → "API Key"
6. Copy API Key yang muncul
7. (Optional) Restrict key ke "Google Sheets API" saja

---

## Langkah 3: Update Kode (2 menit)

Edit file `public-site/js/portfolio.js`:

```javascript
const CONFIG = {
    SHEET_ID: 'PASTE_SHEET_ID_KAMU',
    API_KEY: 'PASTE_API_KEY_KAMU',
    SHEET_NAME: 'projects',
};
```

**Save file!**

---

## Langkah 4: Setup Contact Form (10 menit)

### A. Buat Tab Contacts
1. Di Google Sheet yang sama, buat tab baru: `contacts`
2. Isi header:
   ```
   Timestamp | Name | Email | Subject | Message
   ```

### B. Buat Apps Script
1. Di Google Sheet, klik **Extensions** → **Apps Script**
2. Hapus semua kode, paste ini:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('contacts');
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.subject,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
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
4. Type: **Web app**
5. Execute as: **Me**
6. Who has access: **Anyone**
7. Klik **Deploy** → **Authorize access** (login & allow)
8. Copy **Web app URL**

### C. Update Contact Form
Edit `public-site/js/main.js`, cari baris ~54:

```javascript
const GOOGLE_SCRIPT_URL = 'PASTE_WEB_APP_URL_KAMU';
```

**Save file!**

---

## Langkah 5: Deploy ke Vercel (3 menit)

### Option A: Via Dashboard (Paling Mudah)

1. **Push ke GitHub:**
   ```bash
   git add .
   git commit -m "Convert to static site for Vercel"
   git push
   ```

2. **Deploy di Vercel:**
   - Buka https://vercel.com
   - Login dengan GitHub
   - Klik "New Project"
   - Import repository Anda
   - **Root Directory:** Ketik `public-site`
   - Klik **Deploy**
   - Tunggu 1-2 menit
   - ✅ Done! Copy URL

### Option B: Via CLI

```bash
npm install -g vercel
cd public-site
vercel --prod
```

Ikuti prompts, pilih:
- Setup: No
- Root: ./
- Deploy: Yes

---

## ✅ Checklist Sebelum Deploy

- [ ] Google Sheet sudah dibuat
- [ ] Sheet ID sudah dicopy
- [ ] Google Sheets API sudah enabled
- [ ] API Key sudah didapat
- [ ] Sheet di-share sebagai public (Anyone with link)
- [ ] `portfolio.js` sudah diupdate dengan Sheet ID & API Key
- [ ] Apps Script sudah dibuat dan di-deploy
- [ ] Web App URL sudah dicopy
- [ ] `main.js` sudah diupdate dengan Web App URL
- [ ] Gambar project sudah diupload (ImgBB/Imgur)
- [ ] Code sudah di-push ke GitHub
- [ ] Ready to deploy!

---

## 🧪 Test Sebelum Deploy

### Test Lokal:
```bash
cd public-site
python -m http.server 8000
```

Buka http://localhost:8000

**Check:**
- ✅ Projects muncul dari Google Sheets
- ✅ Contact form bisa submit
- ✅ Responsive di mobile
- ✅ Semua link berfungsi

---

## 📝 Setelah Deploy

1. **Update Personal Info:**
   - Nama di Hero section
   - Social media links
   - Email & phone
   - Location

2. **Upload Projects:**
   - Tambah projects di Google Sheet
   - Refresh website

3. **Custom Domain (Optional):**
   - Vercel Dashboard → Settings → Domains
   - Add your domain
   - Update DNS

---

## 🎯 URLs Penting

- **Google Cloud Console:** https://console.cloud.google.com/
- **Google Sheets:** https://sheets.google.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **ImgBB (Upload Gambar):** https://imgbb.com

---

## 🆘 Troubleshooting Cepat

**Projects tidak muncul:**
```javascript
// Buka browser console (F12)
// Lihat error message
// Pastikan Sheet ID dan API Key benar
```

**Contact form error:**
```javascript
// Pastikan Web App URL benar
// Pastikan Apps Script sudah di-deploy
// Pastikan permission = "Anyone"
```

**Deploy gagal:**
```bash
# Pastikan di folder public-site
cd public-site
vercel --prod
```

---

## 💡 Tips

- Upload gambar pakai ImgBB (paling mudah)
- Test di browser console untuk debug
- Vercel auto-deploy saat push ke GitHub
- Free tier Vercel cukup untuk portfolio
- Bisa custom domain gratis di Vercel

---

**Total waktu: ~35 menit** ⚡

Selamat! Website Anda sekarang live di internet! 🎉
