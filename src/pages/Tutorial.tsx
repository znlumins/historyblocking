import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

// --- Komponen Pembantu (Konsisten dengan halaman About) ---
const Section = ({ children, className = '', bg = 'light', ...rest }) => {
  const bgColor = bg === 'dark' ? 'bg-historic-cream-dark' : 'bg-historic-cream';
  return (
    <section className={`py-16 lg:py-24 ${bgColor} ${className}`} {...rest}>
      <div className="container mx-auto px-4 md:px-8">
        {children}
      </div>
    </section>
  );
};

const SectionHeader = ({ eyebrow = null, title, subtitle = null }) => (
  <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
    {eyebrow && <p className="font-quicksand text-sm font-bold uppercase text-historic-brown/60 tracking-widest mb-2">{eyebrow}</p>}
    <h2 className="font-georgia text-4xl lg:text-5xl font-bold text-historic-brown-dark">{title}</h2>
    {subtitle && <p className="font-merriweather text-lg lg:text-xl text-historic-brown/80 mt-4">{subtitle}</p>}
  </div>
);

// --- Komponen BARU untuk Layout Zig-Zag ---
const AlternatingStep = ({ number, title, description, imageUrl, imagePosition = 'right' }) => (
    <div className={`grid md:grid-cols-2 gap-12 items-center ${imagePosition === 'left' ? 'md:grid-flow-col-dense' : ''}`}>
        {/* Kolom Teks */}
        <div className={imagePosition === 'left' ? 'md:col-start-2' : ''}>
            <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-historic-brown text-white font-georgia text-xl font-bold">
                    {number}
                </div>
                <h3 className="font-georgia text-3xl font-bold text-historic-brown-dark">{title}</h3>
            </div>
            <p className="font-merriweather text-lg text-historic-brown/80">{description}</p>
        </div>
        {/* Kolom Gambar */}
        <div className={imagePosition === 'left' ? 'md:col-start-1' : ''}>
            <img src={imageUrl} alt={title} className="rounded-lg shadow-xl w-full" />
        </div>
    </div>
);


// --- Halaman Utama Tutorial ---
const Tutorial = () => {
  const gameplaySteps = [
    { number: '1', title: 'Tarik Kartu Peristiwa', description: 'Setiap giliran dimulai dengan mengambil kartu dari dek peristiwa. Kartu ini akan memberimu misi, sumber daya, atau tantangan sejarah yang harus diatasi.', imageUrl: '/images/tutorial/step-1-tarik-kartu.png' },
    { number: '2', title: 'Susun Berita Anda', description: 'Gunakan sumber daya untuk menempatkan tile (artikel, foto) di papan permainan pribadimu. Susun seperti puzzle untuk membentuk sebuah halaman koran yang koheren.', imageUrl: '/images/tutorial/step-2-susun-tile.png' },
    { number: '3', title: 'Hidupkan Sejarah dengan AR', description: 'Arahkan kamera ponselmu ke tile. Saksikan ringkasan materi, video, atau model 3D artefak muncul secara imersif, memberikan konteks mendalam.', imageUrl: '/images/tutorial/step-3-scan-ar.png' },
    { number: '4', title: 'Jawab Kuis & Raih Poin', description: 'Setiap tile terhubung dengan kuis di website melalui QR Code. Jawab pertanyaan untuk menguji pemahamanmu dan dapatkan poin jurnalisme yang menentukan kemenangan.', imageUrl: '/images/tutorial/step-4-kuis.png' },
  ];
  
  return (
    <div className="bg-historic-cream text-historic-brown-dark">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap" />
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <Section bg="dark">
            <div className="grid md:grid-cols-2 gap-12 items-center py-8">
                <div>
                    <p className="font-quicksand text-sm font-bold uppercase text-historic-brown/60 tracking-widest mb-2">Tutorial Gameplay</p>
                    <h1 className="font-georgia text-5xl md:text-7xl font-bold text-historic-brown-dark leading-tight">
                        Misi Anda: Menjadi Jurnalis Sejarah
                    </h1>
                    <p className="font-merriweather text-xl md:text-2xl mt-6 max-w-2xl text-historic-brown/80">
                        Pelajari alur permainan yang akan membawa Anda dalam petualangan menyusun berita dari peristiwa-peristiwa besar Indonesia.
                    </p>
                </div>
                <div className="flex justify-center">
                    <img src="/images/tutorial/hero-game-layout.png" alt="Layout Permainan Historic Block" className="rounded-xl shadow-2xl" />
                </div>
            </div>
        </Section>
        
        {/* 2. SETUP SECTION */}
        <Section>
            <SectionHeader
                eyebrow="Persiapan Cepat"
                title="Siapkan Medan Laporan Anda dalam 3 Langkah"
            />
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
                <div className="bg-historic-cream-dark p-8 rounded-lg border border-historic-brown/10">
                    <img src="/images/tutorial/icon-board.svg" alt="Papan Jurnalis" className="h-20 mx-auto mb-4" />
                    <h3 className="font-georgia text-xl font-bold">Ambil Papan</h3>
                    <p className="font-merriweather mt-2 text-historic-brown/80">Setiap pemain mengambil satu <strong>Papan Jurnalis</strong> sebagai area kerja mereka.</p>
                </div>
                <div className="bg-historic-cream-dark p-8 rounded-lg border border-historic-brown/10">
                    <img src="/images/tutorial/icon-cards.svg" alt="Kocok Dek" className="h-20 mx-auto mb-4" />
                    <h3 className="font-georgia text-xl font-bold">Kocok Dek</h3>
                    <p className="font-merriweather mt-2 text-historic-brown/80">Kocok <strong>Dek Kartu Peristiwa</strong> & <strong>Tile Berita</strong>, letakkan di tengah area bermain.</p>
                </div>
                <div className="bg-historic-cream-dark p-8 rounded-lg border border-historic-brown/10">
                    <img src="/images/tutorial/icon-phone.svg" alt="Siapkan Ponsel" className="h-20 mx-auto mb-4" />
                    <h3 className="font-georgia text-xl font-bold">Siapkan Ponsel</h3>
                    <p className="font-merriweather mt-2 text-historic-brown/80">Buka website kami untuk fitur <strong>AR</strong> & <strong>Kuis Online</strong> yang terintegrasi.</p>
                </div>
            </div>
        </Section>

        {/* 3. CORE LOOP SECTION */}
        <Section bg="dark">
            <SectionHeader
                eyebrow="Alur Permainan"
                title="Setiap Giliran, Sebuah Cerita Baru"
                subtitle="Ikuti langkah-langkah ini untuk mengumpulkan informasi, menyusun cerita, dan membuktikan pemahaman Anda."
            />
            <div className="max-w-6xl mx-auto space-y-24">
                {gameplaySteps.map((step, index) => (
                    <AlternatingStep 
                        key={step.number} 
                        {...step} 
                        // Tentukan posisi gambar: genap di kiri, ganjil di kanan
                        imagePosition={index % 2 === 0 ? 'right' : 'left'} 
                    />
                ))}
            </div>
        </Section>

        {/* 4. EDUCATIONAL VALUE SECTION */}
        <Section>
            <SectionHeader
                eyebrow="Di Balik Permainan"
                title="Bukan Sekadar Poin & Pemenang"
                subtitle="Setiap mekanisme di Historic Block dirancang secara sadar untuk mengasah keterampilan Abad ke-21."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: "Berpikir Kritis", desc: "Menyusun tile berita memaksa pemain menganalisis hubungan sebab-akibat antar peristiwa." },
                    { title: "Literasi Digital", desc: "Integrasi AR dan Kuis QR Code membiasakan pemain mencari dan memvalidasi informasi dari sumber digital." },
                    { title: "Pemecahan Masalah", desc: "Kartu peristiwa menyajikan tantangan yang membutuhkan strategi dan adaptasi." },
                    { title: "Kreativitas", desc: "Tidak ada satu cara benar untuk menyusun berita, mendorong pemain untuk bercerita secara kreatif." },
                ].map(item => (
                    <div key={item.title} className="bg-historic-cream-dark p-6 rounded-lg border border-historic-brown/10 transform hover:-translate-y-1 transition-transform duration-300">
                        <h3 className="font-georgia text-xl font-bold mb-2">{item.title}</h3>
                        <p className="font-merriweather text-sm text-historic-brown/80">{item.desc}</p>
                    </div>
                ))}
            </div>
            <div className="text-center mt-16">
                 <Link to="/about" className="inline-block bg-historic-brown text-white font-quicksand font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-historic-brown-dark transition-all duration-300 transform hover:scale-105">
                    ‹ Pelajari Tentang Tim Kami
                </Link>
            </div>
        </Section>
      </main>

      <footer className="w-full bg-historic-brown-dark py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-merriweather text-historic-cream">
            Dikembangkan dengan ❤️ oleh Tim Historic Block - Universitas Brawijaya
          </p>
          <p className="text-sm text-gray-400 mt-2">© 2024 Historic Block. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Tutorial;