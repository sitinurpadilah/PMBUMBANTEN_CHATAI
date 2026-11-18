const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware agar server bisa membaca data berformat JSON
app.use(express.json());
app.use(express.static('public'));

const includesAny = (message, keywords) =>
    keywords.some(keyword => message.includes(keyword));

app.post('/api/chat', (req, res) => {
    const userMessage = req.body && typeof req.body.message === 'string'
        ? req.body.message.trim().toLowerCase()
        : '';
    let reply;

    if (!userMessage) {
        reply = 'Silakan tulis pertanyaan seputar PMB Universitas Muhammadiyah Banten.';
    } else if (includesAny(userMessage, ['kip'])) {
        reply = 'Untuk pendaftaran KIP Kuliah, silakan isi formulir berikut: https://docs.google.com/forms/d/e/1FAIpQLSfvB9U4E2m_LwR2J-Ted97Fp2P2p7KSf-PXfUWiD4v58hj1pQ/viewform';
    } else if (includesAny(userMessage, ['rpl', 'rekognisi pembelajaran lampau'])) {
        reply = 'Untuk pendaftaran jalur RPL, silakan isi formulir berikut: https://docs.google.com/forms/d/e/1FAIpQLSe-Gk-juJtPc1PFFSml5qbx-7kGss93QFmC3W4_ShhBrENZZQ/viewform';
    } else if (includesAny(userMessage, ['program studi', 'prodi', 'jurusan', 'fakultas'])) {
        reply = 'Program studi yang tersedia: Fakultas Teknik dan Ilmu Komputer (Sistem Informasi, Informatika, Teknik Industri); Fakultas Pendidikan dan Ilmu Bahasa (Sastra Arab, Sastra Inggris, Sastra Indonesia, Pendidikan Teknologi Informasi); serta Fakultas Kesehatan (Fisioterapi, Administrasi Rumah Sakit). Detailnya ada di halaman Program Studi.';
    } else if (includesAny(userMessage, ['jadwal', 'gelombang'])) {
        reply = 'Jadwal yang tercantum di halaman saat ini: Gelombang 1 Januari–Maret 2026, Gelombang 2 April–Juni 2026, dan Gelombang 3 Juli–Agustus 2026. Jadwal tersebut perlu diperbarui untuk tahun akademik 2027/2028, jadi silakan cek kembali informasi terbaru di halaman PMB.';
    } else if (includesAny(userMessage, ['alur', 'langkah', 'cara daftar', 'pendaftaran', 'daftar'])) {
        reply = 'Alur pendaftaran: 1) Buat akun dengan email dan nomor WhatsApp aktif. 2) Lengkapi formulir dan unggah berkas. 3) Ikuti seleksi atau tes sesuai jadwal. 4) Jika diterima, lakukan daftar ulang. Tautan Reguler tersedia di bagian Link Pendaftaran pada halaman utama.';
    } else if (includesAny(userMessage, ['biaya', 'uang kuliah', 'ukt'])) {
        reply = 'Halaman informasi biaya kuliah dapat dibuka melalui menu Biaya Kuliah. PDF rincian biaya resmi akan tersedia di sana setelah diunggah.';
    } else if (includesAny(userMessage, ['beasiswa'])) {
        reply = 'Informasi jalur KIP Kuliah tersedia melalui formulir pendaftaran KIP di bagian Link Pendaftaran pada halaman utama.';
    } else if (includesAny(userMessage, ['halo', 'hai', 'assalamualaikum', 'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam'])) {
        reply = 'Halo! Saya Asisten PMB Universitas Muhammadiyah Banten. Saya bisa membantu informasi program studi, jadwal, alur pendaftaran, KIP Kuliah, dan RPL.';
    } else if (includesAny(userMessage, ['umb', 'universitas muhammadiyah banten', 'kampus'])) {
        reply = 'Selamat datang di PMB Universitas Muhammadiyah Banten. Tanyakan tentang fakultas, program studi, jadwal, atau proses pendaftaran.';
    } else {
        reply = 'Maaf, saya belum menemukan jawabannya. Coba tanyakan tentang fakultas, program studi, jadwal, alur pendaftaran, biaya, KIP Kuliah, atau RPL.';
    }

    res.json({ reply });
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server chatbot berjalan di http://localhost:${PORT}`);
});