const members = [
  { name: 'Andi Pratama', role: 'Frontend Developer', emoji: '👨‍💻', desc: 'Spesialis React & Tailwind CSS dengan pengalaman 4 tahun membangun UI yang elegan dan responsif.', github: '#', linkedin: '#' },
  { name: 'Sari Dewi', role: 'UI/UX Designer', emoji: '👩‍🎨', desc: 'Designer berpengalaman yang menciptakan pengalaman pengguna yang intuitif dan estetis menggunakan Figma.', github: '#', linkedin: '#' },
  { name: 'Budi Santoso', role: 'Backend Developer', emoji: '👨‍🔧', desc: 'Expert Node.js & PostgreSQL. Memastikan server selalu cepat, aman, dan skalabel.', github: '#', linkedin: '#' },
  { name: 'Rina Marlina', role: 'Project Manager', emoji: '👩‍💼', desc: 'Memimpin tim dengan metodologi Agile/Scrum untuk memastikan proyek selesai tepat waktu.', github: '#', linkedin: '#' },
  { name: 'Doni Kurniawan', role: 'Mobile Developer', emoji: '👨‍📱', desc: 'Pengembang React Native yang handal, membangun aplikasi mobile cross-platform berkualitas tinggi.', github: '#', linkedin: '#' },
  { name: 'Maya Putri', role: 'DevOps Engineer', emoji: '👩‍⚙️', desc: 'Mengelola infrastruktur cloud (AWS/GCP), CI/CD pipeline, dan memastikan uptime 99.9%.', github: '#', linkedin: '#' },
]

export default function Team() {
  return (
    <>
      {/* Header */}
      <section className="hero-section text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Tim Kami</h1>
          <p className="lead">Kenali orang-orang hebat di balik DevStudio</p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {members.map((m) => (
              <div className="col-md-4" key={m.name}>
                <div className="card h-100 border-0 shadow-sm text-center team-card">
                  <div className="card-body p-4">
                    <div className="display-1 mb-3">{m.emoji}</div>
                    <h5 className="fw-bold mb-1">{m.name}</h5>
                    <span className="badge bg-primary mb-3">{m.role}</span>
                    <p className="text-muted small">{m.desc}</p>
                  </div>
                  <div className="card-footer bg-transparent border-0 pb-4">
                    <a href={m.github} className="btn btn-sm btn-outline-dark me-2">GitHub</a>
                    <a href={m.linkedin} className="btn btn-sm btn-outline-primary">LinkedIn</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h3 className="fw-bold mb-3">Tertarik bergabung bersama kami?</h3>
          <p className="text-muted mb-4">Kami selalu mencari talenta terbaik yang bersemangat dan inovatif.</p>
          <a href="/contact" className="btn btn-primary btn-lg">Hubungi Kami</a>
        </div>
      </section>

    </>
  )
}
