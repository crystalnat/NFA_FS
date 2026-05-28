@extends('layouts.app')

@section('title', 'Daftar Author')

@section('content')

<div class="d-flex align-items-center justify-content-between mb-4">
  <div>
    <h4 class="fw-bold mb-0">✍️ Daftar Author</h4>
    <p class="text-muted small mb-0">{{ $authors->count() }} penulis terdaftar</p>
  </div>
</div>

@php $colors = ['#0d6efd','#198754','#dc3545','#f59e0b','#6f42c1']; @endphp

<div class="row g-3">
  @foreach($authors as $index => $author)
  <div class="col-md-6">
    <div class="card p-3 h-100">
      <div class="d-flex gap-3 align-items-start">

        <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
          style="width:48px;height:48px;background:{{ $colors[$index % count($colors)] }};font-size:1rem;">
          {{ strtoupper(substr($author->name, 0, 1)) }}
        </div>

        <div class="flex-grow-1 overflow-hidden">
          <h6 class="fw-bold mb-0">{{ $author->name }}</h6>
          <p class="text-muted small mb-1">📧 {{ $author->email }}</p>
          <p class="text-muted small mb-2" style="
            display:-webkit-box;-webkit-line-clamp:2;
            -webkit-box-orient:vertical;overflow:hidden;">
            {{ $author->bio }}
          </p>
          <div class="d-flex align-items-center justify-content-between">
            <span class="badge bg-primary-subtle text-primary">
              {{ $author->books_count }} buku
            </span>
            <a href="/authors/{{ $author->id }}" class="btn btn-sm btn-outline-success">
              Lihat Detail
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
  @endforeach
</div>

@endsection
