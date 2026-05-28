@extends('layouts.app')

@section('title', $author->name)

@section('content')

<a href="/authors" class="text-muted small d-inline-block mb-3">← Kembali ke Daftar Author</a>

<div class="card p-4 mb-4">
  <div class="d-flex align-items-center gap-3 mb-4">
    <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
      style="width:56px;height:56px;background:#198754;font-size:1.4rem;">
      {{ strtoupper(substr($author->name, 0, 1)) }}
    </div>
    <div>
      <h4 class="fw-bold mb-0">{{ $author->name }}</h4>
      <small class="text-muted">{{ $author->email }}</small>
    </div>
  </div>

  <table class="table table-bordered mb-0">
    <tbody>
      <tr>
        <th class="bg-light" style="width:130px">ID</th>
        <td>{{ $author->id }}</td>
      </tr>
      <tr>
        <th class="bg-light">Nama</th>
        <td>{{ $author->name }}</td>
      </tr>
      <tr>
        <th class="bg-light">Email</th>
        <td>{{ $author->email }}</td>
      </tr>
      <tr>
        <th class="bg-light">Bio</th>
        <td>{{ $author->bio ?? '-' }}</td>
      </tr>
    </tbody>
  </table>
</div>

{{-- Buku dari author ini --}}
<h5 class="fw-bold mb-3">📖 Buku oleh {{ $author->name }}</h5>

@if($author->books->isEmpty())
  <p class="text-muted">Belum ada buku dari author ini.</p>
@else
  <div class="card">
    <div class="card-body p-0">
      <table class="table table-hover align-middle mb-0">
        <thead style="background:#1a1a2e;color:#fff;">
          <tr>
            <th class="ps-4" style="width:44px">#</th>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Tahun</th>
            <th>Harga</th>
            <th class="text-center">Detail</th>
          </tr>
        </thead>
        <tbody>
          @foreach($author->books as $i => $book)
          <tr>
            <td class="ps-4 text-muted small">{{ $i + 1 }}</td>
            <td class="fw-semibold">{{ $book->title }}</td>
            <td><span class="badge-cat">{{ $book->category }}</span></td>
            <td class="text-muted small">{{ $book->year }}</td>
            <td class="text-success fw-semibold">Rp {{ number_format($book->price, 0, ',', '.') }}</td>
            <td class="text-center">
              <a href="/books/{{ $book->id }}" class="btn btn-sm btn-outline-primary">Lihat</a>
            </td>
          </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
@endif

@endsection
