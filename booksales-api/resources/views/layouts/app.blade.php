<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'BookSales') — BookSales</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { background: #f0f2f5; }
    .topbar {
      background: linear-gradient(90deg, #1a1a2e, #16213e);
      padding: .75rem 0;
    }
    .topbar .brand { color: #fff; text-decoration: none; font-weight: 700; font-size: 1.2rem; }
    .topbar nav a {
      color: rgba(255,255,255,.65);
      font-size: .9rem;
      padding: .4rem .9rem;
      border-radius: 6px;
      text-decoration: none;
      transition: background .2s;
    }
    .topbar nav a:hover,
    .topbar nav a.active { background: rgba(255,255,255,.15); color: #fff; }
    .content { max-width: 960px; margin: 2rem auto; padding: 0 1rem; }
    .card { border: none; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,.08); }
    .badge-cat {
      background: #e8f0fe; color: #1a73e8;
      padding: .3rem .8rem; border-radius: 99px; font-size: .8rem; font-weight: 600;
    }
    .book-img { width: 60px; height: 80px; object-fit: cover; border-radius: 6px; }
    footer { text-align: center; padding: 2rem 0; color: #9ca3af; font-size: .82rem; margin-top: 2rem; }
  </style>
</head>
<body>

<div class="topbar">
  <div class="content d-flex align-items-center justify-content-between py-0">
    <a href="/" class="brand">📚 BookSales</a>
    <nav class="d-flex gap-1">
      <a href="/books"   class="{{ request()->is('books*')   ? 'active' : '' }}">📖 Buku</a>
      <a href="/authors" class="{{ request()->is('authors*') ? 'active' : '' }}">✍️ Author</a>
      <a href="/genres"  class="{{ request()->is('genres*')  ? 'active' : '' }}">🏷️ Genre</a>
    </nav>
  </div>
</div>

<div class="content">
  @yield('content')
</div>

<footer>© 2025 BookSales — Laravel MVC</footer>
</body>
</html>
