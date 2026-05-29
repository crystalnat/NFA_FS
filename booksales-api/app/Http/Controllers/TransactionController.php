<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * GET /api/transactions  — Admin only
     */
    public function index(): JsonResponse
    {
        $transactions = Transaction::with(['user', 'book'])->get();

        return response()->json([
            'status'  => 'success',
            'message' => 'Data transaksi berhasil diambil.',
            'total'   => $transactions->count(),
            'data'    => $transactions,
        ]);
    }

    /**
     * POST /api/transactions  — Customer (auth)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'book_id'  => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $book = \App\Models\Book::findOrFail($validated['book_id']);

        $transaction = Transaction::create([
            'user_id'     => $request->user()->id,
            'book_id'     => $validated['book_id'],
            'quantity'    => $validated['quantity'],
            'total_price' => $book->price * $validated['quantity'],
            'status'      => 'pending',
        ]);

        $transaction->load(['user', 'book']);

        return response()->json([
            'status'  => 'success',
            'message' => 'Transaksi berhasil dibuat.',
            'data'    => $transaction,
        ], 201);
    }

    /**
     * GET /api/transactions/{transaction}  — Customer (auth, own) or Admin
     */
    public function show(Request $request, Transaction $transaction): JsonResponse
    {
        $transaction->load(['user', 'book']);

        return response()->json([
            'status'  => 'success',
            'message' => 'Detail transaksi berhasil diambil.',
            'data'    => $transaction,
        ]);
    }

    /**
     * PUT/PATCH /api/transactions/{transaction}  — Customer (auth)
     */
    public function update(Request $request, Transaction $transaction): JsonResponse
    {
        $validated = $request->validate([
            'quantity' => 'sometimes|required|integer|min:1',
            'status'   => 'sometimes|required|in:pending,paid,cancelled',
        ]);

        if (isset($validated['quantity'])) {
            $validated['total_price'] = $transaction->book->price * $validated['quantity'];
        }

        $transaction->update($validated);
        $transaction->load(['user', 'book']);

        return response()->json([
            'status'  => 'success',
            'message' => 'Transaksi berhasil diperbarui.',
            'data'    => $transaction,
        ]);
    }

    /**
     * DELETE /api/transactions/{transaction}  — Admin only
     */
    public function destroy(Transaction $transaction): JsonResponse
    {
        $transaction->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Transaksi berhasil dihapus.',
        ]);
    }
}
