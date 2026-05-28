<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = ['title', 'author_id', 'year', 'price', 'category', 'description', 'image'];

    /**
     * Relasi: satu buku dimiliki oleh satu author.
     */
    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}
