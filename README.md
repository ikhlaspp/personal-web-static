# Portfolio Website - Static Version for Vercel

Website portfolio personal yang telah dikonversi dari Laravel ke HTML/CSS/JavaScript murni dengan Google Sheets sebagai database.

## 🚀 Quick Start

### Struktur Folder

```
public-site/
├── index.html          # Halaman utama
├── css/
│   └── style.css      # Custom styles
├── js/
│   ├── main.js        # JavaScript utama
│   └── portfolio.js   # Google Sheets integration
```

### Deploy ke Vercel

1. **Via Vercel Dashboard:**
   ```bash
   # Push code ke GitHub terlebih dahulu
   git add .
   git commit -m "Convert to static site"
   git push
   ```
   
   Kemudian:
   - Buka https://vercel.com
   - Import repository
   - Root Directory: `public-site`
   - Deploy!

2. **Via Vercel CLI:**
   ```bash
   npm install -g vercel
   cd public-site
   vercel --prod
   ```

## 📊 Setup Google Sheets

Lihat panduan lengkap di [SETUP-GOOGLE-SHEETS.md](SETUP-GOOGLE-SHEETS.md)

### Ringkasan Singkat:

1. **Buat Google Sheet** dengan kolom:
   - title, description, image, technologies, url

2. **Dapatkan API Key:**
   - Google Cloud Console → Enable Sheets API → Create Credentials

3. **Update Config** di `js/portfolio.js`:
   ```javascript
   const CONFIG = {
       SHEET_ID: 'your-sheet-id',
       API_KEY: 'your-api-key',
       SHEET_NAME: 'projects'
   };
   ```

4. **Setup Contact Form:**
   - Buat Apps Script
   - Deploy as Web App
   - Update URL di `js/main.js`

## 🎨 Kustomisasi

### Informasi Personal

Edit `index.html`:

- **Nama:** Line ~78
- **Social Media:** Line ~90-104
- **Email & Contact Info:** Line ~390-420

### Warna & Style

Edit `css/style.css`:

- **Gradient Colors:** Line ~24-28
- **Background:** Line ~31-36

## 📁 File Penting

- `index.html` - Halaman utama website
- `css/style.css` - Custom styling
- `js/main.js` - Functionality utama (typing, navigation, contact form)
- `js/portfolio.js` - Google Sheets integration
- `vercel.json` - Vercel configuration

## 🔧 Testing Lokal

```bash
cd public-site
python -m http.server 8000
# atau
npx http-server
```

Buka: http://localhost:8000

## ✨ Fitur

- ✅ Fully Responsive
- ✅ Modern Design with Tailwind CSS
- ✅ Smooth Animations
- ✅ Google Sheets as Database
- ✅ Contact Form Integration
- ✅ Zero Backend Required
- ✅ Perfect for Vercel/Netlify

## 📝 Catatan

- Website ini sepenuhnya static, tidak memerlukan server backend
- Data portfolio dimuat dari Google Sheets via API
- Contact form mengirim data ke Google Sheets via Apps Script
- Perfect untuk hosting gratis seperti Vercel, Netlify, GitHub Pages

## 🆘 Support

Jika ada masalah:
1. Cek [SETUP-GOOGLE-SHEETS.md](SETUP-GOOGLE-SHEETS.md)
2. Pastikan API Key dan Sheet ID sudah benar
3. Test di browser console untuk melihat error

## 📄 License

Free to use and modify for your own portfolio!

---

**Note:** Jangan lupa update informasi personal Anda sebelum deploy! 🎯
