console.log("Bismillah Kita Belajar Javascript DOM");

// Aktivitas 1 DOM SELECTION 
// Penjelasan kita harus menyeleksi atau "menangkap"
// Mengambil Elemen HTML berdasarkan ID/Class


// 1. Mengambil Elemen Judul 
// getElemenyByid -> seleksi berdasasarkan id
const judulUtama = document.getElementById("judul-utama");

// 1.1 Mengambil Elemen Sub Judul
// querySelector(#...)
const subJudul = document.querySelector("#sub-judul");

// 2. Mengambil elemen pada kartu 1 (Kartu Manipulasi Teks & Style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi")

// 3. Mengambil Elemen Tombol-Tombol Aksi pada Kartu 1
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. Mengambil Elemen pada kartu 2 (fitur catatan dinamis / todolist sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");



// Aktivitas 2 Manipulasi Teks & Style
// addEventListener("click", function(){...})
btnUbahTeks.addEventListener("click", function(){
    // .innerText = Mengganti atau Mengisi tulisan teks yang ada di HTML
    teksPreview.innerText = "Hebat! Teks ini berhasil diubah melalui DOM!";

    // .style.color = Mengubah warna teks secara langsung melalui Javascript
    teksPreview.style.color = "#1f1d97"; 

    // console.log mencetak pesan di console
    console.log("DOM Teks Preview telah diperbaharui");
});


// B -- Manipulasi Class Css Menggunakan ClassListToggle()
btnToggleWarna.addEventListener("click", function(){
    // .classList.toggle = Fitur unutk saklar otomatis
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Class Higlight berhasil di switch");
});


// Mengembalikan reset teks & style ke kondisi semula
btnReset.addEventListener("click", function(){
    // mengembalikan tulisan ke aslinya
    teksPreview.innerText =("Halo! Teks ini siap di ubah oleh Javascript.");

    // Kosongkan warna inline style (style.color = "") agar balik ke css bawaan
    teksPreview.style.color = "";

    // hapus class khusus menggunakan .classlist.remove("...")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilan direset");
})

// Aktivitas 3 dan 4 : elemen dinamis dan event handling (TO DO LIST)
// Bagian ini membuat elemen HTML LI secara otomatis
// mengisi teksnya,memberi tombol hapus,lalu menempelkan ke dalam layar <ul>

// Langkah 1 variabel penampung angka jumlah catatan
// let digunakan karena nilai variabel yang akan berubah ubah
let totalCatatan = 0;

// Langkah 2 membuat function supaya update angka counter dan pesan status
// fungsi ini kumpulan perintah yang di beri nama kita bisa panggil kapan saja
function perbaruiJumlah() {
    // masukan angka total catatan terbaru ke dalam tag 
    jumlahCatatan.innerText = totalCatatan;

    // periksa kondisi apakah catatan 0
    if (totalCatatan === 0){
        // jika 0 : hapus class "hidden" supaya teks "belum ada catatan"muncul le layar
        pesanKosong.classList.remove("hidden");
    } else {
        pesanKosong.classList.add("hidden");
    }

}

// langkah 3 function tambah catatan fungsi utama logika
function tambahCatatan(){
    // 3.1 input catatan value = mengambil teks yang diketik oleh user di kolom input
    // .trim() = untuk menghapus spasi di awal dan di akhir
    const isiTeks = inputCatatan.value.trim();

    // 3.2 Validasi input jika isi teks kosong tampilkan peringatan berupa alert
    if (isiTeks === "") {
        alert("Catatan tidak boleh kosong!");
        return;
    }

    // 3.3 document.create.element("li")= membuat tag html <li> baru secara dinamis pake javascript
    const liBaru = document.createElement("li");
    liBaru.className ="note-item";

    // 3.4 . innerhtml = mengisi stuktur didalam <li> dengan teks  catatan dan tombol hapus
    // tanda backtick(`)
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class = "btn-hapus">Hapus</button>`;

    // 3.5 Menambhkan event listener khusus tombol hapus pada tem <li>
    // liBaru.queryselector("btn-hapus") mengambl berdasarkan class 'btn-hapus'
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function(){
        liBaru.remove();
        totalCatatan--;
        perbaruiJumlah();
        console.log(`[DOM] Catatan "${isiTeks}" dihapus`);

    });

    // 3.6 .appenchild (libaru) = menempelkan element <li> dalam wadah <ul id="daftar-catatan>"
    daftarCatatan.appendChild(liBaru);

    // 3.7 mengosongkan kembali isi kolom input agar siap diketik lagi
    inputCatatan.value = "";

    // 3.8 Totalcatatan++ increament total catatan di tambah 1x
    totalCatatan++;
    perbaruiJumlah();

    console.log(`DOM Catatan baru di tambahkan : ${isiTeks}`);
}
    // LANGKAH 4
btnTambah.addEventListener("click", function(){
    tambahCatatan();

});

// langkah 5 eventlistener tombol enter(menggunakan keyboard)
// ketika user mengetik dikolom input dan melepas tombol -> event : keyup
inputCatatan.addEventListener("keyup", function(event){
    // periksa apakah tombol keyboard yang ditekan adalah tombol enter?
    if(event.key === "Enter"){
        tambahCatatan();
    }
});

