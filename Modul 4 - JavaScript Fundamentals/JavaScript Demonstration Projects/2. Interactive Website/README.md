# Interactive Website - Dengan JavaScript

## Deskripsi

Website ini dibuat dengan HTML, CSS, dan JavaScript. Demonstrasi ini menunjukkan kekuatan JavaScript dalam membuat website yang interaktif dan responsif.

## Fitur yang Tersedia

- Interaksi pengguna yang responsif
- Konten dinamis yang berubah
- Notifikasi dan toast messages
- Validasi form real-time
- Animasi dan transisi smooth
- Demo interaktif (counter, color changer, text animator)
- Keyboard shortcuts
- Loading states
- Error handling

## Struktur File

```
2. Interactive Website/
├── index.html          # Halaman utama
├── styles.css          # Styling CSS
├── script.js          # JavaScript functionality
└── README.md          # Dokumentasi ini
```

## Cara Menjalankan

1. Buka file `index.html` di browser
2. Coba semua tombol dan fitur interaktif
3. Isi form dan lihat validasi real-time
4. Coba keyboard shortcuts:
   - Tekan 'A' untuk animasi
   - Tekan 'C' untuk counter
   - Tekan 'Escape' untuk menutup loading

## Fitur JavaScript yang Didemonstrasikan

### 1. Event Handling

- Click events pada tombol
- Input events pada form
- Keyboard events
- Hover effects

### 2. DOM Manipulation

- Mengubah konten secara dinamis
- Menambah/menghapus class CSS
- Mengubah styling elemen
- Menampilkan/menyembunyikan elemen

### 3. Form Validation

- Validasi real-time
- Error messages yang dinamis
- Visual feedback (warna hijau/merah)
- Mencegah submit jika ada error

### 4. Animasi dan Efek

- CSS transitions dengan JavaScript
- Custom animations
- Loading states
- Toast notifications

### 5. Interactive Demo

- **Counter**: Increment/decrement dengan animasi
- **Color Changer**: Mengubah warna dengan rotasi
- **Text Animator**: Mengubah teks dengan efek

## Kode JavaScript Utama

### Event Listeners

```javascript
// Button click events
primaryBtn.addEventListener("click", function () {
  showToast("Tombol berfungsi dengan sempurna!", "success");
});
```

### Form Validation

```javascript
// Real-time validation
nameInput.addEventListener("input", function () {
  validateName(this);
});
```

### DOM Manipulation

```javascript
// Dynamic content change
hero.textContent = "JavaScript membuat website menjadi hidup!";
```

## Tujuan Pembelajaran

- Memahami kekuatan JavaScript dalam web development
- Melihat perbedaan website statis vs interaktif
- Belajar event handling dan DOM manipulation
- Memahami validasi form dengan JavaScript
- Melihat implementasi animasi dan efek

## Perbandingan dengan Website Statis

| Aspek           | Website Statis     | Website Ini (Interaktif) |
| --------------- | ------------------ | ------------------------ |
| Tombol          | Tidak berfungsi    | Berfungsi dengan baik    |
| Form            | Tidak ada validasi | Validasi real-time       |
| Animasi         | Hanya CSS          | JavaScript + CSS         |
| Feedback        | Tidak ada          | Notifikasi dan alert     |
| Interaksi       | Terbatas           | Kaya dan responsif       |
| User Experience | Statis             | Dinamis dan engaging     |

## Kesimpulan

JavaScript mengubah website dari sekadar tampilan statis menjadi aplikasi interaktif yang responsif terhadap pengguna. Ini adalah kunci untuk pengalaman web modern yang engaging dan fungsional.

## Tips Pengembangan

1. **Selalu validasi input pengguna**
2. **Berikan feedback visual yang jelas**
3. **Gunakan animasi untuk meningkatkan UX**
4. **Handle errors dengan graceful**
5. **Test di berbagai browser**
6. **Optimasi performa JavaScript**
