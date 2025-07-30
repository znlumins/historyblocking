import Navbar from "@/components/Navbar";

// --- Ikon yang sudah final ---
const EmailIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> );
const GithubIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> );
const InstagramIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.013 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.556.556-1.112.9-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.013-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6.406-11.845a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"/></svg> );
const LinkedinIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> );

// --- Komponen Pembantu untuk Kerapian ---
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

const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
    {eyebrow && <p className="font-quicksand text-sm font-bold uppercase text-historic-brown/60 tracking-widest mb-2">{eyebrow}</p>}
    <h2 className="font-georgia text-4xl lg:text-5xl font-bold text-historic-brown-dark">{title}</h2>
    {subtitle && <p className="font-merriweather text-lg lg:text-xl text-historic-brown/80 mt-4">{subtitle}</p>}
  </div>
);

const StatCard = ({ value, label }) => (
    <div className="bg-historic-cream p-6 text-center rounded-lg shadow-md border border-historic-brown/10">
        <p className="font-georgia text-6xl font-bold text-historic-brown">{value}</p>
        <p className="font-merriweather text-sm text-historic-brown/80 mt-2">{label}</p>
    </div>
)

// --- Halaman Utama ---
const About = () => {
  const pageData = {
    teamMembers: [
      { name: "Aymardayanti Pagril", role: "Co-Founder", subtitle: "Head of Finance, Sales, and Marketing", description: "Bertanggung jawab dalam strategi pemasaran dan pengembangan bisnis Historic Block.", imageUrl: "/aymar.png", links: { email: "aymardayanti@student.ub.ac.id", instagram: "https://www.instagram.com/aymardyanti/", linkedin: "https://linkedin.com/in/aymardayanti", }, },
      { name: "Adenia Raesita", role: "Chief Executive Officer", description: "Memimpin visi dan strategi pengembangan Historic Block sebagai platform edukasi sejarah yang inovatif.", imageUrl: "/adenia.png", links: { email: "adeniaaresitaaa@gmail.com", instagram: "https://www.instagram.com/adeniarst_/", linkedin: "https://www.linkedin.com/in/adenia-raesita-a67510274/", }, },
      { name: "Daffa Ahmad Al Attas", role: "Co-Founder", subtitle: "Head of Technology and Product Development", description: "Memimpin pengembangan teknologi dan implementasi fitur-fitur inovatif dalam aplikasi.", imageUrl: "/daffa.jpg", links: { email: "daffaahmadalsch@student.ub.ac.id", github: "https://github.com/znlumins", instagram: "https://www.instagram.com/dfaahm/", linkedin: "https://www.linkedin.com/in/daffa-ahmad-al-attas-824294322/", }, },
    ],
    testimonials: [
      { name: "Citro Ahmad Faishol S.Pd", role: "Guru Sejarah MAN IC Pasuruan", quote: "Media pembelajaran yang inovatif diperlukan karena target kurikulum merdeka bukan lagi menghafal, tetapi melatih analisis atau deep learning.", image: "/guru-citro.png" },
      { name: "Euis Iskantini", role: "Guru Sejarah SMAN 1 Sukaresmi", quote: "Kami berusaha mencoba menggunakan media pembelajaran inovatif untuk pembelajaran sejarah, karena guru dituntut untuk memberi pengajaran dengan kreatif.", image: "/guru-euis.png" },
      { name: "Arif Bawono Surya", role: "Co-Founder Lets Play Indonesia", quote: "Belajar Sejarah seasik bermain bisa dilakukan melalui Boardgame Historic Block ini karena partisipan bisa belajar melalui simulasi langsung mengelola artikel-artikel peristiwa bersejarah Indonesia.", image: "/founder-letsplay.png" },
    ],
    partners: [
      { name: "MAN IC Pasuruan", logo: "/logo-manic.png" },
      { name: "SMAN 1 Sukaresmi", logo: "/logo-sman1sukaresmi.png" },
      { name: "Lets Play Indonesia", logo: "/logo-letsplay.png" },
    ],
  };

  return (
    <div className="bg-historic-cream text-historic-brown-dark">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap" />
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <Section className="!py-0">
          <div className="min-h-screen flex items-center">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="font-georgia text-5xl md:text-7xl lg:text-8xl font-bold text-historic-brown-dark leading-tight">
                  HISTORIC BLOCK
                </h1>
                <p className="font-merriweather text-xl md:text-2xl mt-6 max-w-xl mx-auto md:mx-0 text-historic-brown/80">
                  Merevolusi pendidikan melalui permainan papan yang imersif, strategis, dan menyenangkan.
                </p>
                <a href="#problem-section" className="mt-10 inline-block bg-historic-brown text-white font-quicksand font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-historic-brown-dark transition-all duration-300 transform hover:scale-105">
                  Ungkap Ceritanya →
                </a>
              </div>
              <div className="hidden md:block">
                <img src="/product-shot-hero.png" alt="Historic Block Board Game" className="w-full max-w-lg mx-auto rounded-lg shadow-2xl" />
              </div>
            </div>
          </div>
        </Section>

        {/* 2. PROBLEM SECTION */}
        <Section bg="dark" id="problem-section">
          <SectionHeader
            eyebrow="Tantangan Nyata"
            title="Mengapa Belajar Sejarah Terasa Membosankan?"
            subtitle="Data dan suara dari lapangan menunjukkan sebuah pola yang jelas: metode konvensional gagal memicu imajinasi dan keterlibatan siswa."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <StatCard value="50%" label="Siswa Merasa Buku Sejarah Kurang Menarik" />
            <StatCard value="54%" label="Siswa Merasa Pembelajaran Membingungkan" />
            <StatCard value="359" label="Skor Literasi PISA Indonesia (di bawah rata-rata OECD 476)" />
            <StatCard value="35%" label="Siswa Merasa Pelajaran Sejarah Menarik (dari 75% yg menganggapnya penting)" />
          </div>

          <div className="text-center mt-16">
            <h3 className="font-georgia text-2xl text-historic-brown-dark font-bold">Dan Inilah Realitas di Ruang Kelas...</h3>
          </div>

          {/* --- INI BAGIAN YANG DIPERBAIKI --- */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
            {pageData.testimonials.slice(0, 2).map(testi => (
              <div key={testi.name} className="bg-historic-cream p-8 rounded-lg shadow-lg border-l-4 border-historic-brown flex flex-col">
                <p className="font-merriweather italic text-lg text-historic-brown-dark flex-grow">"{testi.quote}"</p>
                <div className="mt-6 pt-6 border-t border-historic-brown/10 flex items-center gap-4">
                  <img src={testi.image} alt={testi.name} className="w-14 h-14 rounded-full object-cover"/>
                  <div>
                    <p className="font-quicksand font-bold text-historic-brown-dark">{testi.name}</p>
                    <p className="font-quicksand text-sm text-gray-500">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
        
        {/* 3. SOLUTION SECTION */}
        <Section>
          <SectionHeader
            eyebrow="Solusi Terintegrasi"
            title="Kami Menghadirkan Tiga Pengalaman dalam Satu"
            subtitle="Historic Block bukan sekadar produk, melainkan sebuah ekosistem belajar yang memadukan dunia fisik dan digital."
          />
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🎲', title: 'Board Game Fisik', desc: 'Gameplay roleplay jurnalisme yang strategis, kompetitif, dan kooperatif.' },
              { icon: '📱', title: 'Fitur AR Imersif', desc: 'Menghidupkan artefak dan peristiwa sejarah di dunia nyata melalui kamera ponsel.' },
              { icon: '🏆', title: 'Kuis Interaktif', desc: 'Menguji pemahaman dengan cara yang seru dan mendorong semangat kompetisi.' }
            ].map(item => (
              <div key={item.title} className="bg-historic-cream p-8 rounded-lg shadow-md hover:shadow-xl border border-historic-brown/10 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-georgia text-2xl font-bold mb-2">{item.title}</h3>
                <p className="font-merriweather text-historic-brown/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        
        {/* 4. TEAM SECTION */}
        <Section bg="dark">
          <SectionHeader
            eyebrow="Tim Kami"
            title="Inovator di Balik Historic Block"
            subtitle="Sebuah tim multidisiplin dari Universitas Brawijaya dengan semangat yang sama untuk merevolusi pendidikan sejarah."
          />
          <div className="flex flex-wrap justify-center items-start gap-8 lg:gap-10">
            {pageData.teamMembers.map((member) => (
              <div key={member.name} className={`group relative bg-historic-cream rounded-2xl p-6 shadow-lg transition-all duration-300 ease-in-out transform border border-historic-brown/10 w-full max-w-xs flex flex-col ${ member.role === 'Chief Executive Officer' ? 'lg:-translate-y-6 hover:shadow-2xl hover:lg:-translate-y-8' : 'hover:shadow-xl hover:-translate-y-2' }`}>
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-historic-brown to-historic-brown-dark rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300 p-1 overflow-hidden"><img src={member.imageUrl} alt={`Foto profil ${member.name}`} className="w-full h-full object-cover object-top rounded-[14px]"/></div>
                <div className="text-center mb-5"><h3 className="font-georgia text-xl font-bold text-historic-brown-dark mb-2">{member.name}</h3><div className="inline-block bg-historic-brown text-white px-3 py-1 rounded-full font-quicksand font-semibold text-xs mb-2">{member.role}</div>{member.subtitle && (<div className="font-quicksand text-xs text-historic-brown/60 font-medium mt-1">{member.subtitle}</div>)}</div>
                <p className="font-merriweather text-sm text-historic-brown/80 mb-6 leading-relaxed text-center flex-grow">{member.description}</p>
                <div className="border-t border-historic-brown/10 pt-5"><div className="flex justify-center items-center gap-4">
                    {member.links.email && (<a href={`mailto:${member.links.email}`} aria-label="Email" title="Kirim Email" className="flex h-10 w-10 items-center justify-center rounded-full bg-historic-cream-dark text-historic-brown/60 transition-all duration-300 hover:-translate-y-1 hover:bg-historic-brown hover:text-white"><EmailIcon className="h-5 w-5"/></a>)}
                    {member.links.github && (<a href={member.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full bg-historic-cream-dark text-historic-brown/60 transition-all duration-300 hover:-translate-y-1 hover:bg-historic-brown hover:text-white"><GithubIcon className="h-5 w-5"/></a>)}
                    {member.links.instagram && (<a href={member.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-historic-cream-dark text-historic-brown/60 transition-all duration-300 hover:-translate-y-1 hover:bg-historic-brown hover:text-white"><InstagramIcon className="h-5 w-5"/></a>)}
                    {member.links.linkedin && (<a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full bg-historic-cream-dark text-historic-brown/60 transition-all duration-300 hover:-translate-y-1 hover:bg-historic-brown hover:text-white"><LinkedinIcon className="h-5 w-5"/></a>)}
                </div></div>
              </div>
            ))}
          </div>
        </Section>
        
        {/* 5. VALIDATION SECTION */}
        <Section>
          <SectionHeader
            eyebrow="Dukungan Industri"
            title="Divalidasi oleh Ahli & Komunitas"
            subtitle="Konsep kami telah diakui dan didukung oleh para praktisi di industri board game dan pendidikan."
          />
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-historic-cream-dark p-8 rounded-lg shadow-lg border border-historic-brown/10 text-center relative">
              <img src={pageData.testimonials[2].image} alt={pageData.testimonials[2].name} className="w-24 h-24 rounded-full object-cover border-4 border-historic-cream absolute -top-12 left-1/2 -translate-x-1/2"/>
              <p className="font-merriweather text-xl italic text-historic-brown-dark mt-10">"{pageData.testimonials[2].quote}"</p>
              <div className="mt-6">
                <p className="font-quicksand font-bold text-historic-brown-dark">{pageData.testimonials[2].name}</p>
                <p className="font-quicksand text-sm text-gray-500">{pageData.testimonials[2].role}</p>
              </div>
            </div>
          </div>
          <div className="mt-20 text-center">
              <h3 className="font-quicksand text-lg font-bold text-historic-brown/80 mb-6">Partner Sekolah & Institusi Kami</h3>
              <div className="flex justify-center items-center gap-8 lg:gap-12 flex-wrap">
                  {pageData.partners.map(p => (
                      <img key={p.name} src={p.logo} alt={p.name} title={p.name} className="h-16 md:h-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"/>
                  ))}
              </div>
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

export default About;