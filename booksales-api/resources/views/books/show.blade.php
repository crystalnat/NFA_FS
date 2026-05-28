@extends('layouts.app')

@section('title', $book->title)

@section('content')

<a href="/books" class="text-muted small d-inline-block mb-3">← Kembali ke Daftar Buku</a>

<div class="card p-4">
  <div class="row g-4">

    {{-- Cover --}}
    <div class="col-md-3 text-center">
      @if($book->image)
        <img src="{{ $book->image }}" alt="{{ $book->title }}"
          class="rounded shadow" style="width:100%;max-width:160px;">
      @else
        <div class="bg-secondary text-white rounded d-flex align-items-center justify-content-center"
          style="height:200px;font-size:.85rem">No Cover</div>
      @endif
    </div>

    {{-- Detail --}}
    <div class="col-md-9">
      <span class="badge-cat mb-2 d-inline-block">{{ $book->category }}</span>
      <h4 class="fw-bold mb-1">{{ $book->title }}</h4>
      <p class="text-muted mb-3">
        ✍️ <a href="/authors/{{ $book->author->id }}" class="text-decoration-none">{{ $book->author->name }}</a>
        &nbsp;·&nbsp; 📅 {{ $book->year }}
      </p>

      <table class="table table-bordered">
        <tbody>
          <tr>
            <th class="bg-light" style="width:130px">Judul</th>
            <td>{{ $book->title }}</td>
          </tr>
          <tr>
            <th class="bg-light">Author</th>
            <td>
              <a href="/authors/{{ $book->author->id }}" class="text-decoration-none fw-semibold">
                {{ $book->author->name }}
              </a>
            </td>
          </tr>
          <tr>
            <th class="bg-light">Kategori</th>
            <td><span class="badge-cat">{{ $book->category }}</span></td>
          </tr>
          <tr>
            <th class="bg-light">Tahun Terbit</th>
            <td>{{ $book->year }}</td>
          </tr>
          <tr>
            <th class="bg-light">Harga</th>
            <td class="fw-bold text-success fs-5">Rp {{ number_format($book->price, 0, ',', '.') }}</td>
          </tr>
          <tr>
            <th class="bg-light">Deskripsi</th>
            <td>{{ $book->description ?? '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</div>

@endsection
