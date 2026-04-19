// controller.mjs
import users from "./data.mjs";

// Tampilkan data dengan map()
const index = () => {
    users.map((u) => console.log(`${u.nama} | ${u.umur} | ${u.alamat}`));
};

// Tambah data (push)
const store = (user) => {
    users.push(user);
};

// Hapus data (pop)
const destroy = () => {
    users.pop();
};

// Eksekusi tugas
const main = () => {
    // Tambah minimal 2 data
    store({ nama: 'Data 11', umur: 30, alamat: 'Jl. 11', email: 'd11@mail.com' });
    store({ nama: 'Data 12', umur: 31, alamat: 'Jl. 12', email: 'd12@mail.com' });

    index();   // Lihat semua
    destroy(); // Hapus satu
    index();   // Lihat hasil akhir
};

main();

export { index, store, destroy };