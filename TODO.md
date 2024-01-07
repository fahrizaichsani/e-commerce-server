# P2-Challenge-1 (Server Side)

- Tema Aplikasi: ...

Struktur Folder:

- server (PORT: 3000)

## **W1D1**

Target:

### **REST API**

- [V] Membuat entitas utama (Create / POST)
  - [V] Endpoint ini akan menerima request body berdasar field-field di entitas utama sesuai [tema aplikasi](https://docs.google.com/document/d/1GZwh8OJGZZQVUuWE0Cr13iMA2lLNE9mMoHfrbmETEBs/edit#heading=h.mcqrsbt2auhv).
  - [V] Jika request  berhasil, kembalikan response dengan 201 status code dan response body berupa object yang berisikan data baru yang berhasil di-input.
  - [V] Jika request gagal karena validasi tidak terpenuhi, kembalikan response dengan 400 status code dan response body berupa object yang berisikan validation errors.
  - [V] Jika request gagal karena kesalahan server, kembalikan response dengan 500 status code.

- [V] Mengambil semua data entitas utama (Read / GET)
  - [V] Jika request berhasil, kembalikan response dengan 200 status code dan response body berupa array of objects yang berisikan semua data entitas utama include User sebagai pemilik data (tanpa menampilkan passwordnya).
  - [V] Jika request gagal, kembalikan response dengan 500 status code.

- [V]  Mengambil detail entitas utama berdasar id (Read / GET)
  - [V] Id dikirimkan via request params
  - [V] Jika request berhasil, kembalikan response dengan 200 status code dan response body berupa object yang berisikan data todo.
  - [V] Jika request gagal karena todo tidak ditemukan, kembalikan response dengan 404 status code dan response body berupa object yang berisikan error not found.

- [V] Mengupdate entitas utama (Update/ PUT)
  - [V] Endpoint ini akan menerima request body berdasar field-field di entitas utama.
  - [V] Id dikirimkan via request params
  - [V] Jika request berhasil, kembalikan response dengan 200 status code dan response body berupa object yang berisikan data yang diupdate.
  - [V] Jika request gagal karena data tidak ditemukan, kembalikan response dengan 404 status code dan response body berupa object yang berisikan error not found.
  - [V] Jika request gagal karena validasi tidak terpenuhi, kembalikan response dengan 400 status code dan response body berupa object yang berisikan validation errors.
  - [V] Jika request gagal karena kesalahan server, kembalikan response dengan 500 status code.

- [V] Menghapus entitas utama (Delete / DELETE)
  - [V] Id dikirimkan via request params
  - [V] Jika request berhasil, kembalikan response dengan 200 status code dan response berupa object yang berisikan data yang berhasil di-delete atau bisa juga mengembalikan data message saja message: '[entity name] success to delete'
  - [V] Jika request gagal karena todo tidak ditemukan, kembalikan response dengan 404 status code dan response body berupa object yang berisikan error not found
  - [V] Jika request gagal karena kesalahan server, kembalikan response dengan 500 status code.

- [V] Membuat entitas kedua genres/categories/types (Create / POST)
  - [V] Endpoint ini akan menerima request body berdasar field-field di entitas kedua sesuai [tema aplikasi](https://docs.google.com/document/d/1GZwh8OJGZZQVUuWE0Cr13iMA2lLNE9mMoHfrbmETEBs/edit#heading=h.mcqrsbt2auhv).
  - [V] Jika request  berhasil, kembalikan response dengan 201 status code dan response body berupa object yang berisikan data baru yang berhasil di-input.
  - [V] Jika request gagal karena validasi tidak terpenuhi, kembalikan response dengan 400 status code dan response body berupa object yang berisikan validation errors.
  - [V] Jika request gagal karena kesalahan server, kembalikan response dengan 500 status code.

- [V] Mengambil semua data genres/categories/types (Read / GET)
  - [V] Jika request berhasil, kembalikan response dengan 200 status code dan response body berupa array of objects yang berisikan semua data genres/categories/types.
  - [V] Jika request gagal, kembalikan response dengan 500 status code.

- [V] Mengupdate kedua genres/categories/types (Update/ PUT)
  - [V] Endpoint ini akan menerima request body berdasar field-field di entitas kedua genres/categories/types.
  - [V] Id dikirimkan via request params
  - [V] Jika request berhasil, kembalikan response dengan 200 status code dan response body berupa object yang berisikan data yang diupdate.
  - [V] Jika request gagal karena data tidak ditemukan, kembalikan response dengan 404 status code dan response body berupa object yang berisikan error not found.
  - [V] Jika request gagal karena validasi tidak terpenuhi, kembalikan response dengan 400 status code dan response body berupa object yang berisikan validation errors.
  - [V] Jika request gagal karena kesalahan server, kembalikan response dengan 500 status code.

- [V] Menghapus entitas kedua genres/categories/types (Delete / DELETE)
  - [V] Id dikirimkan via request params
  - [V] Jika request berhasil, kembalikan response dengan 200 status code dan response berupa object yang berisikan data yang berhasil di-delete atau bisa juga mengembalikan data message saja message: '[entity name] success to delete'
  - [V] Jika request gagal karena todo tidak ditemukan, kembalikan response dengan 404 status code dan response body berupa object yang berisikan error not found
  - [V] Jika request gagal karena kesalahan server, kembalikan response dengan 500 status code.

- [V] Mengambil semua data entitas utama (Read / GET) untuk public site
  - [V] Tambahkan prefix /pub pada endpoint ini
  - [V] Jika request berhasil, kembalikan response dengan 200 status code dan response body berupa array of objects yang berisikan semua data entitas utama.
  - [V] Jika request gagal, kembalikan response dengan 500 status code.

- [V] Mengambil detail entitas utama berdasar id (Read / GET) untuk public site
  - [V] Tambahkan prefix /pub pada endpoint kalian
  - [V] Id dikirimkan via request params
  - [V] Jika request berhasil, kembalikan response dengan 200 status code dan response body berupa object yang berisikan data.
  - [V] Jika request gagal karena data tidak ditemukan, kembalikan response dengan 404 status code dan response body berupa object yang berisikan error not found.

### **API Documentation**

- [V] Route /path yang digunakan di aplikasi yang kamu buat
- [V] Informasi yang diperlukan oleh user saat ingin menggunakan route/path API (seperti body, header, parameter, dll)
- [V] Response serta status code yang akan didapatkan oleh pengguna (info, error, warning, dsb)

Lebih lanjut untuk contoh, bisa dilihat di:

- [Example API Documentation](https://gist.github.com/ziterz/56d2cd8b2d5f5d52101265c0182c2aff)

## **W1D2**

Target:

### **Authentication + Authorization**

- [V] POST /add-user (khusus untuk staff, dilakukan oleh admin)
  - [V] Request Headers: { Authorization: "Bearer [your access token]" }
  - [V] Request body: { email, password }
  - [V] Response:
    - [V] 201: { id, email }
    - [V] 400: { errors }

  Note: Pastikan password telah terhash sebelum data user masuk ke dalam database.

- [V] POST /login (semua role, baik admin atau staff)
  - [V] Request body: { email, password }
  - [V] Response:
    - [V] 200: { access_token, email/username, role }
    - [V] 401: { error invalid username or email or password }

- [V] Menambahkan Authentication dan Authorization

| Role  | Create | Read  | Update                             | Delete                             |
| ----- | ------ | ----- | ---------------------------------- | ---------------------------------- |
| Admin | [V] ✅  | [V] ✅ | [V] ✅                              | [V] ✅                              |
| Staff | [V]  ✅ | [V] ✅ | [V] Hanya bisa menghapus miliknya. | [V] Hanya bisa menghapus miliknya. |

- [V] Error status code 401, apabila user yang belum login, atau yang mempunyai token yang salah mencoba mengakses endpoint CRD.
- [V] Error status code 403, apabila staff mengakses delete pada entitas yang bukan miliknya.

  Note: Untuk mengirim access_token, gunakan request header (diterima sebagai req.headers di Express).

### **Error Handler**

- [V] 401 - Error login user not found atau password not matched
- [V] 401 - Error authentication
- [V] 403 - Forbidden error di authorization
- [V] 400 - Error validation saat create.
- [V] 404 - Data not found.
- [V] 500 - Internal error server, dsb

### **Upload File**

- [V] Meng-update data imgUrl entitas utama (Update / PATCH)
  - [V] Endpoint ini akan menerima request body berupa ("multipart/form-data") untuk meng-update data imgUrl.
  - [V] Id dikirimkan via request params.
  - [V] Membuat fitur upload menggunakan [multer](https://www.npmjs.com/package/multer) dan [imageKit](https://imagekit.io/)/[Cloudinary](https://cloudinary.com) untuk menyimpan file tersebut.
  - [V] Jika request berhasil, kembalikan response dengan 200 status code dan response body berupa object message: 'Image [entity name] success to update'
  - [V] Jika request gagal karena data tidak ditemukan, kembalikan response dengan status code 404 dan response body berupa object yang berisikan error not found.
  - [V] Jika request gagal karena validasi tidak terpenuhi, kembalikan response dengan status code 400 dan response body berupa object yang berisikan validation errors.
  - [V] Jika request gagal karena kesalahan server, kembalikan response dengan status code 500.

## **W1D3**

Target:

### **TDD**

Mengimplementasikan testing terhadap endpoint yang sudah dibuat

- [V] Login (Admin), perlu melakukan pengecekan pada status dan response ketika:
  - [V] Email tidak diberikan / tidak diinput
  - [V] Password tidak diberikan / tidak diinput
  - [V] Email diberikan invalid / tidak terdaftar
  - [V] Password diberikan salah / tidak match
  - Pastikan untuk testing ini sediakan dulu data Admin

- [V] Add Staff, perlu melakukan pengecekan pada status dan response ketika:
  - [V] Berhasil register
  - [V] Email tidak diberikan / tidak diinput
  - [V] Password tidak diberikan / tidak diinput
  - [V] Email diberikan string kosong
  - [V] Password diberikan string kosong
  - [V] Email sudah terdaftar
  - [V] Format Email salah / invalid
  - [V] Gagal register staff karena admin belum login
  - [V] Gagal register staff karena token yang diberikan tidak valid (random string)

- [V] Create, perlu melakukan pengecekan pada status dan response ketika:
  - [V] Berhasil membuat entitas utama
  - [V] Gagal menjalankan fitur karena belum login
  - [V] Gagal menjalankan fitur karena token yang diberikan tidak valid  
  - [V] Gagal ketika request body tidak sesuai (validation required)
  - Buatlah testing untuk masing-masing fitur

- [V] Read, perlu melakukan pengecekan pada status dan response ketika:
  - [V] Berhasil mendapatkan data Entitas Utama
  - [V] Gagal menjalankan fitur karena belum login
  - [V] Gagal menjalankan fitur karena token yang diberikan tidak valid

- [V] Read Detail, perlu melakukan pengecekan pada status dan response ketika:
  - [V] Berhasil mendapatkan 1  Entitas Utama sesuai dengan params id yang diberikan
  - [V] Gagal menjalankan fitur karena belum login
  - [V] Gagal menjalankan fitur karena token yang diberikan tidak valid
  - [V] Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid

- [V] Update PUT, perlu melakukan pengecekan pada status dan response ketika:
  - [V] Berhasil mengupdate data Entitas Utama berdasarkan params id yang diberikan
  - [V] Gagal menjalankan fitur karena belum login
  - [V] Gagal menjalankan fitur karena token yang diberikan tidak valid
  - [V] Gagal karena id entity yang dikirim tidak terdapat di database
  - [V] Gagal menjalankan fitur ketika Staff mengolah data entity yang bukan miliknya
  - [V] Gagal ketika request body yang diberikan tidak sesuai

- [V] Delete, perlu melakukan pengecekan pada status dan response ketika:
  - [V] Berhasil menghapus data Entitas Utama berdasarkan params id yang diberikan
  - [V] Gagal menjalankan fitur karena belum login
  - [V] Gagal menjalankan fitur karena token yang diberikan tidak valid
  - [V] Gagal karena id entity yang dikirim tidak terdapat di database
  - [V] Gagal menjalankan fitur ketika Staff menghapus entity yang bukan miliknya

- [V] Update PATCH, perlu melakukan pengecekan pada status dan response ketika:
  - [V] Berhasil mengupdate imgUrl Entitas Utama berdasarkan params id yang diberikan
  - [V] Gagal menjalankan fitur karena belum login
  - [V] Gagal menjalankan fitur karena token yang diberikan tidak valid
  - [V] Gaga menjalankan fiturl karena id entity yang dikirim tidak terdapat di database
  - [V] Gagal menjalankan fitur ketika Staff mengolah data entity yang bukan miliknya
  - [V] Gagal ketika request body yang diberikan tidak sesuai

- [V] Read  Entitas kedua data genres/categories/types  perlu melakukan pengecekan pada status dan response ketika:
  - [V] Berhasil mendapatkan data entitas kedua
  - [V] Gagal menjalankan fitur karena belum login
  - [V] Gagal menjalankan fitur karena token yang diberikan tidak valid

- [V] Endpoint  List pada public site,  perlu melakukan pengecekan pada status dan response ketika:
  - [V] Berhasil mendapatkan Entitas Utama tanpa menggunakan query filter parameter
  - [V] Berhasil mendapatkan Entitas Utama dengan 1 query filter parameter
  - [V] Berhasil mendapatkan  Entitas Utama serta panjang yang sesuai ketika memberikan page tertentu (cek pagination-nya)
  - Pastikan untuk testing ini sediakan dulu sekitar 20 data untuk diinput di beforeAll, sehingga kita bisa melakukan ekspektasi pada data dan jumlahnya yang kita dapat ketika filter dan pagination

- [V] Endpoint  Detail pada public site,  perlu melakukan pengecekan pada status dan response ketika:
  - [V] Berhasil mendapatkan 1  Entitas Utama sesuai dengan params id yang diberikan
  - [V] Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid

### **Sorting and Pagination, Filter**

Mengimplementasikan sorting, pagination dan filter pada aplikasi server yang sudah dibuat

- [V] Get list entitas utama pada Public Site
  - [V] Search menggunakan title/name Entitas Utama
  - [V] Sorting berdasarkan data terbaru/terlama (ASC/DESC)
  - [V] Filter Entitas Utama berdasarkan Entitas Kedua (genres/categories/types)
  - [V] Pagination dengan limit data per page berjumlah 10

## **W1D4 & W1D6**

Target: Melakukan deployment menggunakan AWS EC2/GCP/Cloud Deployment lainnya untuk server yang telah dibuat
