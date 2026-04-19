// Data produk awal (minimal 5)
let produkList = [
    { id: 1, nama: "Laptop", harga: 12000000 },
    { id: 2, nama: "Smartphone", harga: 5000000 },
    { id: 3, nama: "Mouse", harga: 300000 },
    { id: 4, nama: "Keyboard", harga: 700000 },
    { id: 5, nama: "Monitor", harga: 2000000 }
];

const eventHandler = {
    log: (pesan) => console.log(`[Sistem]: ${pesan}`)
};

// Menambah data menggunakan Spread Operator
function tambahProduk(id, nama, harga) {
    const produkBaru = { id, nama, harga };
    produkList = [...produkList, produkBaru];
    eventHandler.log("Produk berhasil ditambahkan.");
}

// Menghapus data menggunakan Rest Parameter & Filter
function hapusProduk(...ids) {
    produkList = produkList.filter(p => !ids.includes(p.id));
    eventHandler.log(`Produk ID ${ids} telah dihapus.`);
}

// Menampilkan data menggunakan Destructuring
function tampilkanProduk() {
    console.log("\n=== DAFTAR PRODUK ===");
    produkList.forEach(({ id, nama, harga }) => {
        console.log(`ID: ${id} | ${nama} - Rp${harga}`);
    });
}

// Eksekusi
tampilkanProduk();
tambahProduk(6, "Tablet", 7000000);
tampilkanProduk();
hapusProduk(2);
tampilkanProduk();