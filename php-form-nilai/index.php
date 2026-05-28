<?php
// ── Form Processing ──
$submitted = false;
$nama      = '';
$email     = '';
$nilai     = '';
$status    = '';
$errors    = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $submitted = true;

    // Sanitasi input
    $nama  = htmlspecialchars(trim($_POST['nama']  ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $nilai = trim($_POST['nilai'] ?? '');

    // Validasi
    if ($nama === '') {
        $errors[] = 'Nama tidak boleh kosong.';
    }
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email tidak valid.';
    }
    if ($nilai === '' || !is_numeric($nilai)) {
        $errors[] = 'Nilai ujian harus berupa angka.';
    } elseif ((int)$nilai < 0 || (int)$nilai > 100) {
        $errors[] = 'Nilai ujian harus antara 0 – 100.';
    }

    // ── Struktur Kendali ──
    if (empty($errors)) {
        $nilai = (int)$nilai;

        if ($nilai > 70) {
            $status = 'Lulus';
        } else {
            $status = 'Remedial';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Nilai Ujian</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', sans-serif;
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }

    .container {
      width: 100%;
      max-width: 480px;
    }

    /* ── Header ── */
    .header {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #fff;
    }
    .header .icon { font-size: 3rem; display: block; margin-bottom: .4rem; }
    .header h1 { font-size: 1.5rem; font-weight: 700; }
    .header p  { font-size: .875rem; color: rgba(255,255,255,.6); margin-top: .3rem; }

    /* ── Card ── */
    .card {
      background: #fff;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 20px 60px rgba(0,0,0,.3);
    }

    /* ── Form ── */
    .form-group { margin-bottom: 1.2rem; }
    label {
      display: block;
      font-size: .875rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: .4rem;
    }
    label span { color: #ef4444; }

    .input-wrap {
      display: flex;
      align-items: center;
      border: 1.5px solid #d1d5db;
      border-radius: 8px;
      overflow: hidden;
      transition: border-color .2s;
    }
    .input-wrap:focus-within { border-color: #3b82f6; }
    .input-icon {
      padding: 0 .75rem;
      font-size: 1rem;
      color: #9ca3af;
      background: #f9fafb;
      height: 44px;
      display: flex;
      align-items: center;
      border-right: 1.5px solid #d1d5db;
    }
    input[type="text"],
    input[type="email"],
    input[type="number"] {
      flex: 1;
      border: none;
      outline: none;
      padding: 0 .875rem;
      height: 44px;
      font-size: .9375rem;
      color: #111827;
      background: transparent;
    }

    /* ── Submit Button ── */
    button[type="submit"] {
      width: 100%;
      padding: .75rem;
      background: linear-gradient(90deg, #1a1a2e, #0d6efd);
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-top: .5rem;
      transition: opacity .2s;
    }
    button[type="submit"]:hover { opacity: .88; }

    /* ── Errors ── */
    .errors {
      background: #fef2f2;
      border: 1px solid #fca5a5;
      border-radius: 8px;
      padding: .875rem 1rem;
      margin-bottom: 1.2rem;
    }
    .errors p { font-size: .875rem; font-weight: 600; color: #dc2626; margin-bottom: .4rem; }
    .errors ul { padding-left: 1.2rem; }
    .errors li { font-size: .85rem; color: #b91c1c; margin-top: .2rem; }

    /* ── Result Card ── */
    .result {
      border-radius: 12px;
      padding: 1.5rem;
      margin-top: 1.5rem;
      border: 2px solid;
    }
    .result.lulus {
      background: #f0fdf4;
      border-color: #86efac;
    }
    .result.remedial {
      background: #fffbeb;
      border-color: #fcd34d;
    }

    .result-header {
      display: flex;
      align-items: center;
      gap: .75rem;
      margin-bottom: 1rem;
    }
    .result-icon { font-size: 2rem; }
    .result-title { font-size: 1.1rem; font-weight: 700; }
    .result.lulus    .result-title { color: #15803d; }
    .result.remedial .result-title { color: #b45309; }

    .result-table { width: 100%; border-collapse: collapse; }
    .result-table td {
      padding: .4rem .2rem;
      font-size: .9rem;
      color: #374151;
      vertical-align: top;
    }
    .result-table td:first-child {
      font-weight: 600;
      width: 100px;
      color: #6b7280;
    }

    .status-badge {
      display: inline-block;
      padding: .3rem 1rem;
      border-radius: 999px;
      font-weight: 700;
      font-size: .9rem;
    }
    .badge-lulus    { background: #dcfce7; color: #15803d; }
    .badge-remedial { background: #fef3c7; color: #92400e; }

    .nilai-bar-wrap {
      margin-top: 1rem;
    }
    .nilai-label {
      display: flex;
      justify-content: space-between;
      font-size: .8rem;
      color: #6b7280;
      margin-bottom: .3rem;
    }
    .nilai-bar {
      height: 10px;
      background: #e5e7eb;
      border-radius: 999px;
      overflow: hidden;
    }
    .nilai-fill {
      height: 100%;
      border-radius: 999px;
      transition: width .6s ease;
    }
    .lulus    .nilai-fill { background: #22c55e; }
    .remedial .nilai-fill { background: #f59e0b; }

    /* ── Reset link ── */
    .reset-link {
      display: block;
      text-align: center;
      margin-top: 1rem;
      font-size: .85rem;
      color: #6b7280;
      text-decoration: none;
    }
    .reset-link:hover { color: #3b82f6; }
  </style>
</head>
<body>
<div class="container">

  <!-- Header -->
  <div class="header">
    <span class="icon">📝</span>
    <h1>Form Nilai Ujian</h1>
    <p>Isi data di bawah untuk mengetahui status kelulusan</p>
  </div>

  <!-- Card -->
  <div class="card">

    <?php if ($submitted && !empty($errors)): ?>
    <!-- Error messages -->
    <div class="errors">
      <p>⚠️ Terdapat kesalahan:</p>
      <ul>
        <?php foreach ($errors as $err): ?>
          <li><?= $err ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
    <?php endif; ?>

    <?php if (!($submitted && empty($errors))): ?>
    <!-- Form -->
    <form method="POST" action="">

      <div class="form-group">
        <label for="nama">Nama Lengkap <span>*</span></label>
        <div class="input-wrap">
          <span class="input-icon">👤</span>
          <input type="text" id="nama" name="nama"
                 value="<?= htmlspecialchars($nama) ?>"
                 placeholder="Masukkan nama lengkap" required>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email <span>*</span></label>
        <div class="input-wrap">
          <span class="input-icon">✉️</span>
          <input type="email" id="email" name="email"
                 value="<?= htmlspecialchars($email) ?>"
                 placeholder="contoh@email.com" required>
        </div>
      </div>

      <div class="form-group">
        <label for="nilai">Nilai Ujian <span>*</span> <small style="font-weight:400;color:#9ca3af">(0 – 100)</small></label>
        <div class="input-wrap">
          <span class="input-icon">🎯</span>
          <input type="number" id="nilai" name="nilai"
                 value="<?= htmlspecialchars($nilai) ?>"
                 min="0" max="100" placeholder="Contoh: 85" required>
        </div>
      </div>

      <button type="submit">Cek Kelulusan →</button>
    </form>

    <?php else: ?>
    <!-- ── Hasil ── -->
    <?php $kelasResult = strtolower($status); ?>
    <div class="result <?= $kelasResult ?>">
      <div class="result-header">
        <span class="result-icon"><?= $status === 'Lulus' ? '🎉' : '📖' ?></span>
        <div>
          <div class="result-title"><?= $status === 'Lulus' ? 'Selamat, Anda Lulus!' : 'Perlu Remedial' ?></div>
          <span class="status-badge badge-<?= $kelasResult ?>"><?= $status ?></span>
        </div>
      </div>

      <table class="result-table">
        <tr>
          <td>Nama</td>
          <td>: <?= $nama ?></td>
        </tr>
        <tr>
          <td>Email</td>
          <td>: <?= $email ?></td>
        </tr>
        <tr>
          <td>Nilai Ujian</td>
          <td>: <strong><?= $nilai ?></strong> / 100</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>: <span class="status-badge badge-<?= $kelasResult ?>"><?= $status ?></span></td>
        </tr>
      </table>

      <!-- Progress bar nilai -->
      <div class="nilai-bar-wrap">
        <div class="nilai-label">
          <span>0</span>
          <span>Nilai: <?= $nilai ?></span>
          <span>100</span>
        </div>
        <div class="nilai-bar">
          <div class="nilai-fill" style="width: <?= $nilai ?>%"></div>
        </div>
      </div>
    </div>

    <a href="index.php" class="reset-link">← Isi form lagi</a>
    <?php endif; ?>

  </div><!-- .card -->
</div><!-- .container -->
</body>
</html>
