@extends('layouts.app')

@section('title', $genre['name'])

@section('content')

<a href="/genres" class="text-muted small d-inline-block mb-3">← Kembali ke Daftar Genre</a>

<div class="card p-4">
  <div class="d-flex align-items-center gap-3 mb-4">
    <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
      style="width:56px;height:56px;background:#0d6efd;font-size:1.4rem;">
      🏷️
    </div>
    <div>
      <h4 class="fw-bold mb-0">{{ $genre['name'] }}</h4>
      <small class="text-muted">ID: {{ $genre['id'] }}</small>
    </div>
  </div>

  <table class="table table-bordered">
    <tbody>
      <tr>
        <th style="width:140px" class="bg-light">ID</th>
        <td>{{ $genre['id'] }}</td>
      </tr>
      <tr>
        <th class="bg-light">Nama Genre</th>
        <td><span class="badge-genre">{{ $genre['name'] }}</span></td>
      </tr>
      <tr>
        <th class="bg-light">Deskripsi</th>
        <td>{{ $genre['description'] }}</td>
      </tr>
    </tbody>
  </table>
</div>

@endsection
