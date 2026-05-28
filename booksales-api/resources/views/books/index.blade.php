@extends('layouts.app')

@section('title', 'Daftar Buku')

@section('content')

<div class="d-flex align-items-center justify-content-between mb-4">
  <div>
    <h4 class="fw-bold mb-0">📖 Daftar Buku</h4>
    <p class="text-muted small mb-0">{{ $books->count() }} buku tersedia</p>
  </div>
</div>

<div class="card">
  <div class="card-body p-0">
    <table class="table table-hover align-middle mb-0">
      <thead style="background:#1a1a2e; color:#fff;">
        <tr>
          <th class="ps-4" style="width:44px">#</th>
          <th style="width:70px">Cover</th>
          <th>Judul</th>
          <th>Author</th>
          <th>Kategori</th>
          <th>Tahun</th>
          <th>Harga</th>
          <th class="text-center" style="width:90px">Detail</th>
        </tr>
      </thead>
      <tbody>
        @foreach($books as $index => $book)
        <tr>
          <td class="ps-4 text-muted small">{{ $index + 1 }}</td>
          <td>
            @if($book->image)
              <img src="{{ $book->image }}" alt="{{ $book->title }}" class="book-img">
            @else
              <div class="book-img bg-secondary d-flex align-items-center justify-content-center text-white rounded" style="font-size:.7rem">No img</div>
            @endif
          </td>
          <td class="fw-semibold">{{ $book->title }}</td>
          <td class="text-muted small">{{ $book->author->name }}</td>
          <td><span class="badge-cat">{{ $book->category }}</span></td>
          <td class="text-muted small">{{ $book->year }}</td>
          <td class="fw-semibold text-success">Rp {{ number_format($book->price, 0, ',', '.') }}</td>
          <td class="text-center">
            <a href="/books/{{ $book->id }}" class="btn btn-sm btn-outline-primary">Lihat</a>
          </td>
        </tr>
        @endforeach
      </tbody>
    </table>
  </div>
</div>

@endsection
