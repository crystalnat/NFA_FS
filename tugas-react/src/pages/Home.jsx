export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section text-center">
        <div className="container">
          <h1 className="display-3 fw-bold mb-3">Selamat Datang di DevStudio</h1>
          <p className="lead mb-4">
            Kami adalah tim pengembang web yang bersemangat menciptakan solusi digital kreatif,
            modern, dan berdampak nyata.
          </p>
          <a href="/team" className="btn btn-light btn-lg me-3 fw-semibold">Kenali Tim Kami</a>
          <a href="/contact" className="btn btn-outline-light btn-lg fw-semibold">Hubungi Kami</a>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Apa yang Kami Tawarkan</h2>
          <div className="row g-4">
            {[
              { icon: '💻', title: 'Web Development', desc: 'Membangun website modern, responsif, dan cepat menggunakan teknologi terkini seperti React & Node.js.' },
              { icon: '📱', title: 'Mobile Friendly', desc: 'Setiap produk kami dirancang agar tampil sempurna di semua perangkat, mulai dari desktop hingga smartphone.' },
              { icon: '🎨', title: 'UI/UX Design', desc: 'Desain antarmuka yang intuitif dan menarik agar pengguna betah dan mudah menggunakan produk Anda.' },
              { icon: '🚀', title: 'Performa Tinggi', desc: 'Optimasi kode dan server untuk memastikan aplikasi Anda berjalan cepat dan efisien.' },
              { icon: '🔒', title: 'Keamanan Terjamin', desc: 'Implementasi best practice keamanan untuk melindungi data dan privasi pengguna Anda.' },
              { icon: '📊', title: 'Analitik & Laporan', desc: 'Dashboard dan laporan real-time untuk membantu Anda mengambil keputusan berbasis data.' },
            ].map(({ icon, title, desc }) => (
              <div className="col-md-4" key={title}>
                <div className="card h-100 border-0 shadow-sm p-4 text-center team-card">
                  <div className="display-4 mb-3">{icon}</div>
                  <h5 className="fw-bold">{title}</h5>
                  <p className="text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <div className="row g-4">
            {[['50+', 'Proyek Selesai'], ['20+', 'Klien Puas'], ['3+', 'Tahun Pengalaman'], ['100%', 'Komitmen']].map(([num, label]) => (
              <div className="col-6 col-md-3" key={label}>
                <h2 className="display-5 fw-bold">{num}</h2>
                <p className="mb-0">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
