@extends('layouts.app')

@section('title', 'Daftar Genre')

@section('content')

<div class="d-flex align-items-center justify-content-between mb-4">
  <div>
    <h4 class="fw-bold mb-0">🏷️ Daftar Genre</h4>
    <p class="text-muted small mb-0">{{ count($genres) }} genre tersedia</p>
  </div>
</div>

<div class="card">
  <div class="card-body p-0">
    <table class="table table-hover align-middle mb-0">
      <thead style="background: #1a1a2e; color: #fff;">
        <tr>
          <th class="ps-4" style="width:50px">#</th>
          <th style="width:160px">Nama Genre</th>
          <th>Deskripsi</th>
          <th style="width:100px" class="text-center">Detail</th>
        </tr>
      </thead>
      <tbody>
        @foreach($genres as $index => $genre)
        <tr>
          <td class="ps-4 text-muted small">{{ $index + 1 }}</td>
          <td>
            <span class="badge-genre">{{ $genre['name'] }}</span>
          </td>
          <td class="text-muted">{{ $genre['description'] }}</td>
          <td class="text-center">
            <a href="/genres/{{ $genre['id'] }}" class="btn btn-sm btn-outline-primary">
              Lihat
            </a>
          </td>
        </tr>
        @endforeach
      </tbody>
    </table>
  </div>
</div>

@endsection
