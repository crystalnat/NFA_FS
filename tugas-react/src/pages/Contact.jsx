import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      {/* Header */}
      <section className="hero-section text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Hubungi Kami</h1>
          <p className="lead">Ada pertanyaan atau ingin bekerja sama? Kami siap membantu!</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Info */}
            <div className="col-lg-4">
              <h4 className="fw-bold mb-4">Informasi Kontak</h4>
              {[
                { icon: '📍', label: 'Alamat', val: 'Jl. Teknologi No. 42, Jakarta Selatan, DKI Jakarta 12345' },
                { icon: '📞', label: 'Telepon', val: '+62 821-0000-1234' },
                { icon: '📧', label: 'Email', val: 'hello@devstudio.id' },
                { icon: '🕐', label: 'Jam Kerja', val: 'Senin – Jumat, 09.00 – 17.00 WIB' },
              ].map(({ icon, label, val }) => (
                <div className="d-flex mb-4" key={label}>
                  <div className="fs-3 me-3">{icon}</div>
                  <div>
                    <h6 className="fw-bold mb-1">{label}</h6>
                    <p className="text-muted mb-0 small">{val}</p>
                  </div>
                </div>
              ))}

              <h6 className="fw-bold mt-4 mb-3">Ikuti Kami</h6>
              <div className="d-flex gap-2">
                {['Instagram', 'Twitter', 'LinkedIn', 'GitHub'].map((s) => (
                  <a key={s} href="#" className="btn btn-sm btn-outline-secondary">{s}</a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4">
                <h4 className="fw-bold mb-4">Kirim Pesan</h4>
                {sent ? (
                  <div className="alert alert-success text-center py-4">
                    <div className="display-4 mb-2">✅</div>
                    <h5 className="fw-bold">Pesan Terkirim!</h5>
                    <p className="mb-0">Terima kasih, kami akan segera menghubungi Anda.</p>
                  </div>
                ) : (
                  <form onSubmit={submit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Nama Lengkap</label>
                        <input name="name" type="text" className="form-control" placeholder="John Doe" value={form.name} onChange={handle} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Email</label>
                        <input name="email" type="email" className="form-control" placeholder="john@example.com" value={form.email} onChange={handle} required />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Subjek</label>
                        <input name="subject" type="text" className="form-control" placeholder="Konsultasi proyek website" value={form.subject} onChange={handle} required />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Pesan</label>
                        <textarea name="message" className="form-control" rows={5} placeholder="Ceritakan kebutuhan Anda..." value={form.message} onChange={handle} required />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-lg w-100">
                          Kirim Pesan 🚀
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-4 text-center">
        <p className="mb-0">© 2025 DevStudio. Dibuat dengan ❤️ menggunakan React & Bootstrap.</p>
      </footer>
    </>
  )
}
