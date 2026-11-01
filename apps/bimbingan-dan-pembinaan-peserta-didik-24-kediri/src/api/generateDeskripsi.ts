import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';

const RHK_KEYWORDS: Record<string, { rhk: string; templates: string[] }> = {
  'belajar': { rhk: 'RHK 1', templates: [
    'Melaksanakan pendampingan kegiatan belajar bersama peserta didik dengan menekankan penguasaan materi pelajaran serta teknik belajar yang efektif dan efisien di lingkungan asrama SRMA 24 Kediri.',
    'Memberikan bimbingan belajar secara intensif kepada siswa-siswi, meliputi penjelasan ulang materi yang belum dipahami, latihan soal, serta diskusi kelompok guna meningkatkan capaian akademik peserta didik.',
    'Mendampingi proses pembelajaran mandiri peserta didik di ruang belajar asrama, memberikan motivasi agar siswa tekun dan fokus serta memfasilitasi tanya jawab seputar materi pelajaran yang dirasa sulit.',
    'Menyelenggarakan sesi bimbingan belajar tambahan bagi peserta didik yang memerlukan penguatan akademik, dengan pendekatan individual maupun kelompok kecil agar setiap siswa memperoleh pemahaman yang optimal.',
    'Melakukan pendampingan kegiatan belajar malam dengan memastikan seluruh peserta didik hadir tepat waktu, suasana kondusif terjaga, serta memberikan arahan metodologi belajar yang sistematis dan terarah.',
    'Mengondisikan suasana belajar malam agar tetap tenang dan kondusif, berkeliling memantau setiap kamar belajar, serta memberikan bantuan langsung kepada peserta didik yang mengalami kebuntuan dalam memahami materi.',
    'Memfasilitasi kegiatan belajar kelompok antar-peserta didik dengan membagi kelompok sesuai tingkat kemampuan, mendorong tutor sebaya, dan memastikan setiap anggota kelompok aktif berkontribusi dalam diskusi.',
    'Melaksanakan pendampingan belajar sore hari di ruang baca asrama, mengarahkan peserta didik agar memanfaatkan waktu secara produktif untuk mengulang pelajaran dan mempersiapkan materi esok hari.',
    'Memotivasi peserta didik yang tampak kurang bersemangat dalam belajar melalui pendekatan personal, menggali akar permasalahan, dan memberikan strategi belajar alternatif yang lebih menyenangkan dan mudah dipahami.',
    'Menyediakan ruang diskusi terbuka bagi peserta didik yang ingin memperdalam pemahaman materi tertentu, menjawab pertanyaan dengan sabar, serta membantu menyusun rangkuman belajar yang terstruktur.',
  ]},
  'tugas': { rhk: 'RHK 1', templates: [
    'Membimbing peserta didik dalam mengerjakan tugas sekolah secara terstruktur, memastikan setiap siswa memahami instruksi tugas, menyelesaikan dengan rapi, dan mengumpulkan tepat waktu.',
    'Melaksanakan pendampingan penyelesaian tugas harian peserta didik, memberikan penjelasan tambahan terhadap materi yang berkaitan, serta memastikan kualitas pengerjaan memenuhi standar akademik.',
    'Mendampingi siswa-siswi dalam proses pengerjaan pekerjaan rumah dan tugas proyek, memberikan panduan serta koreksi agar hasil pekerjaan sesuai dengan kriteria yang ditetapkan oleh guru pengajar.',
    'Membantu peserta didik mengorganisasi waktu pengerjaan tugas agar tidak menumpuk, mengajarkan teknik prioritas dan manajemen deadline sehingga seluruh tugas dapat diselesaikan secara terencana dan berkualitas.',
    'Melakukan pengecekan kelengkapan tugas harian seluruh peserta didik sebelum waktu pengumpulan, memberikan arahan perbaikan bagi pekerjaan yang belum memenuhi standar, serta mendorong kebiasaan kerja yang teliti.',
    'Mendampingi peserta didik dalam menyusun tugas presentasi dan laporan kelompok, memfasilitasi pembagian peran, serta memastikan setiap anggota kelompok memahami kontribusinya masing-masing.',
  ]},
  'koordinasi': { rhk: 'RHK 1', templates: [
    'Melaksanakan koordinasi internal bersama Kepala SRMA 24 Kediri beserta jajaran pengasuh terkait evaluasi perkembangan peserta didik, penyusunan jadwal kegiatan, dan strategi peningkatan kualitas pembinaan.',
    'Menghadiri rapat koordinasi dengan pimpinan dan sesama wali asuh untuk membahas catatan perkembangan peserta didik, kendala yang dihadapi, serta rencana tindak lanjut pembinaan di lingkungan asrama.',
    'Berkoordinasi dengan tim pengasuh mengenai dinamika terkini di asrama, mencakup evaluasi kehadiran siswa, perkembangan perilaku, serta penyesuaian program kegiatan mingguan.',
    'Melakukan koordinasi lintas unit dengan guru pamong dan wali kelas terkait perkembangan akademik peserta didik, menyamakan persepsi mengenai strategi pendampingan yang paling tepat untuk setiap siswa.',
    'Mengikuti rapat evaluasi mingguan bersama seluruh pengasuh asrama untuk membahas progres program pembinaan, kendala operasional, serta inovasi kegiatan yang perlu diterapkan di periode berikutnya.',
    'Berkoordinasi dengan bagian logistik asrama terkait kebutuhan harian peserta didik, memastikan ketersediaan sarana dan prasarana yang memadai untuk mendukung kelancaran seluruh kegiatan pembinaan.',
  ]},
  'jurnal': { rhk: 'RHK 1', templates: [
    'Menyusun jurnal pengasuhan harian yang mencakup catatan kegiatan, perkembangan peserta didik, serta evaluasi pelaksanaan program sebagai bahan dokumentasi dan tindak lanjut pembinaan di asrama.',
    'Mendokumentasikan seluruh rangkaian aktivitas harian dalam jurnal pengasuhan secara sistematis, meliputi kehadiran peserta didik, catatan perilaku, serta rekomendasi untuk perbaikan berkelanjutan.',
    'Melengkapi catatan harian pengasuhan dengan deskripsi kegiatan, temuan di lapangan, serta refleksi proses pendampingan sebagai laporan pertanggungjawaban kepada pimpinan SRMA 24 Kediri.',
    'Menyusun laporan jurnal harian secara detail dan kronologis, mencantumkan nama peserta didik yang memerlukan perhatian khusus, tindakan yang telah diambil, serta rekomendasi tindak lanjut kepada pengasuh selanjutnya.',
    'Melakukan pencatatan jurnal kegiatan asrama sebagai bentuk akuntabilitas kinerja, memastikan setiap aktivitas terdokumentasi dengan baik termasuk foto pendukung dan catatan khusus yang relevan.',
  ]},
  'laptop': { rhk: 'RHK 1', templates: [
    'Melaksanakan pendampingan pemanfaatan laptop untuk menunjang kegiatan belajar peserta didik, termasuk penggunaan aplikasi pembelajaran daring dan pengetikan tugas secara digital.',
    'Membimbing peserta didik dalam mengoperasikan perangkat laptop untuk keperluan akademik, memastikan penggunaan yang bertanggung jawab dan sesuai kebutuhan pembelajaran.',
    'Mendampingi peserta didik memanfaatkan laptop untuk mengakses sumber belajar daring, mengunduh materi pelajaran, dan mengerjakan tugas digital dengan tetap menjaga etika penggunaan teknologi.',
    'Mengawasi penggunaan laptop oleh peserta didik selama jam belajar, memastikan perangkat digunakan untuk kegiatan edukatif dan tidak disalahgunakan untuk hiburan di luar jam istirahat.',
  ]},
  'cuci': { rhk: 'RHK 2', templates: [
    'Melaksanakan pendampingan kegiatan kemandirian peserta didik dalam mencuci dan merapikan pakaian secara mandiri, memastikan prosedur kebersihan, ketertiban, serta pengelolaan waktu dilakukan dengan baik.',
    'Membimbing siswa-siswi melakukan kegiatan laundry mandiri sebagai bagian dari program kemandirian, mencakup teknik pencucian yang benar, penjemuran, serta pelipatan dan penyimpanan pakaian yang rapi.',
    'Mendampingi peserta didik dalam kegiatan mencuci pakaian pribadi, menanamkan kebiasaan hidup bersih dan mandiri agar siswa terbiasa mengelola kebutuhan sehari-hari tanpa bergantung pada orang lain.',
    'Melatih peserta didik melakukan pencucian pakaian secara mandiri di area laundry asrama, memberikan contoh langsung cara mencuci yang efektif, membilas hingga bersih, dan menjemur dengan rapi di tempat yang telah disediakan.',
    'Mengawasi kegiatan cuci pakaian mandiri peserta didik sambil mengajarkan pengelolaan waktu agar kegiatan ini tidak mengganggu jadwal belajar dan kegiatan asrama lainnya.',
  ]},
  'bersih': { rhk: 'RHK 2', templates: [
    'Melaksanakan pendampingan kegiatan kerja bakti kebersihan lingkungan asrama, mengarahkan peserta didik untuk menyapu, mengepel, serta menata area bersama agar tetap bersih, nyaman, dan sehat.',
    'Membimbing peserta didik melakukan piket kebersihan harian secara bergantian, menanamkan rasa tanggung jawab terhadap lingkungan tempat tinggal serta kebiasaan menjaga kebersihan secara kolektif.',
    'Mendampingi kegiatan bersih-bersih lingkungan asrama meliputi kamar tidur, kamar mandi, dapur, dan halaman, memastikan standar kebersihan terjaga demi kenyamanan seluruh penghuni asrama.',
    'Mengoordinasikan kegiatan pembersihan area umum asrama bersama peserta didik, memberikan contoh langsung dan mengevaluasi hasil kerja untuk membangun kesadaran akan pentingnya lingkungan yang bersih dan tertata.',
    'Mengajak peserta didik membersihkan halaman asrama dan taman sekitar, memangkas rumput yang mulai tinggi, merapikan pot tanaman, serta membuang sampah organik dan anorganik pada tempatnya masing-masing.',
    'Melaksanakan inspeksi kebersihan kamar asrama bersama peserta didik, memberikan penilaian terhadap kerapian tempat tidur, lemari, serta lantai kamar, kemudian menyampaikan umpan balik untuk perbaikan.',
    'Mengoordinasikan kegiatan gotong royong mingguan membersihkan saluran air, selokan, dan area belakang asrama agar lingkungan tetap sehat dan bebas dari genangan air yang berpotensi menjadi sarang nyamuk.',
  ]},
  'rapikan': { rhk: 'RHK 2', templates: [
    'Melatih peserta didik merapikan tempat tidur dan area pribadi secara mandiri setiap pagi sebagai bentuk penanaman disiplin dan kemandirian dalam mengelola ruang hidup di lingkungan asrama.',
    'Mendampingi siswa-siswi dalam kegiatan merapikan kamar dan lemari pribadi, memastikan standar kerapian terpenuhi serta menanamkan kebiasaan hidup teratur dan terorganisir.',
    'Melakukan pengecekan kerapian kamar peserta didik secara rutin, memberikan panduan tata letak barang yang efisien dan rapi, serta mengapresiasi siswa yang konsisten menjaga keteraturan ruang pribadinya.',
    'Mendampingi peserta didik dalam kegiatan merapikan ruang belajar dan rak buku bersama setelah sesi belajar malam, membiasakan budaya kembalikan ke tempat semula setiap selesai menggunakan fasilitas.',
  ]},
  'mandiri': { rhk: 'RHK 2', templates: [
    'Melaksanakan pendampingan program kemandirian peserta didik yang mencakup pengelolaan waktu, kebersihan diri, hingga pemenuhan kebutuhan sehari-hari secara mandiri tanpa bergantung kepada pihak lain.',
    'Membimbing peserta didik menjalani rutinitas harian secara mandiri sebagai bagian dari pembentukan karakter, termasuk menyiapkan keperluan sekolah, merapikan pakaian, dan mengatur jadwal belajar sendiri.',
    'Melatih kemandirian peserta didik melalui kegiatan praktik langsung seperti menyetrika pakaian seragam, menata keperluan sekolah di malam hari, serta mengelola uang saku dengan bijak dan bertanggung jawab.',
    'Mendampingi peserta didik baru dalam masa adaptasi kemandirian di asrama, membimbing langkah demi langkah agar siswa terbiasa mengurus kebutuhan pribadi mulai dari kebersihan diri hingga pengelolaan waktu.',
  ]},
  'sambut': { rhk: 'RHK 3', templates: [
    'Melaksanakan penyambutan siswa-siswi yang kembali ke lingkungan asrama setelah kegiatan sekolah, memastikan proses kedatangan berlangsung tertib serta mengarahkan peserta didik pada penyesuaian jadwal sore hari.',
    'Menyambut kedatangan peserta didik di gerbang asrama dengan penuh hangat, melakukan pengecekan kehadiran, serta mengarahkan siswa untuk segera berganti pakaian dan mempersiapkan kegiatan selanjutnya.',
    'Melakukan kegiatan penyambutan dan pendataan kedatangan peserta didik, memastikan seluruh siswa hadir dengan kondisi baik dan siap mengikuti rangkaian kegiatan asrama yang telah dijadwalkan.',
    'Menyambut peserta didik yang pulang dari sekolah di area penerimaan asrama, menanyakan kondisi dan kegiatan di sekolah hari ini, serta memastikan tidak ada siswa yang tertinggal atau mengalami kendala di perjalanan.',
    'Melakukan penyambutan sore hari dengan suasana kekeluargaan, mendata kehadiran peserta didik satu per satu, dan mengingatkan jadwal kegiatan sore seperti sholat berjamaah dan waktu makan.',
  ]},
  'makan': { rhk: 'RHK 3', templates: [
    'Mendampingi peserta didik selama kegiatan makan bersama di ruang makan asrama, memastikan ketertiban antrian, penerapan adab dan tata krama makan, serta kebersihan lingkungan makan setelah selesai.',
    'Melaksanakan pendampingan makan bersama peserta didik dengan menerapkan kebiasaan berdoa sebelum dan sesudah makan, makan dengan tertib, serta tidak menyisakan makanan sebagai bentuk rasa syukur.',
    'Membimbing siswa-siswi dalam kegiatan makan siang/malam secara teratur, mengingatkan pentingnya asupan gizi seimbang, mengawasi porsi makan, serta menanamkan kebiasaan membersihkan peralatan makan sendiri.',
    'Melakukan pendampingan pada waktu makan dengan memastikan semua peserta didik hadir, antrian berlangsung tertib, dan lingkungan makan tetap bersih serta nyaman setelah kegiatan berakhir.',
    'Mengawasi kegiatan makan pagi peserta didik sebelum berangkat sekolah, memastikan seluruh siswa sarapan dengan cukup agar memiliki energi untuk mengikuti kegiatan pembelajaran sepanjang hari.',
    'Mendampingi kegiatan makan malam bersama di ruang makan asrama, menciptakan suasana kekeluargaan, serta mengingatkan peserta didik untuk menghabiskan lauk dan nasi yang sudah diambil sebagai bentuk menghargai rezeki.',
    'Mengecek menu makan harian dan berkoordinasi dengan petugas dapur untuk memastikan ketersediaan makanan yang cukup dan bergizi bagi seluruh peserta didik asrama SRMA 24 Kediri.',
  ]},
  'sholat': { rhk: 'RHK 3', templates: [
    'Melaksanakan pendampingan ibadah sholat berjamaah bersama peserta didik di mushola asrama, memastikan ketertiban shaf, kekhusyukan pelaksanaan, serta ketepatan waktu dimulainya sholat.',
    'Mendampingi dan mengawasi pelaksanaan sholat wajib berjamaah peserta didik, memberikan teguran lembut kepada siswa yang terlambat, serta memastikan wudhu dilakukan dengan benar sesuai tata cara yang diajarkan.',
    'Membimbing peserta didik menjalankan ibadah sholat berjamaah secara rutin dan tertib, mencakup pengawasan kehadiran, pengecekan kerapian pakaian sholat, serta pemberian nasihat singkat setelah sholat.',
    'Melaksanakan kegiatan pendampingan sholat berjamaah yang diikuti seluruh peserta didik, memastikan pelaksanaan ibadah berlangsung khusyuk dan membina kesadaran spiritual siswa SRMA 24 Kediri.',
    'Membangunkan peserta didik untuk melaksanakan sholat Subuh berjamaah, memastikan seluruh siswa telah berwudhu dan bersiap di mushola tepat waktu, serta memberikan tausiyah singkat setelah sholat berjamaah.',
    'Mendampingi pelaksanaan sholat Dzuhur berjamaah di mushola asrama setelah peserta didik kembali dari sekolah, mengecek kehadiran satu per satu, dan mengingatkan keutamaan sholat tepat waktu.',
    'Mengawasi pelaksanaan sholat Ashar dan Maghrib berjamaah, menegur dengan bijak peserta didik yang terlambat, serta mengisi waktu antara Maghrib dan Isya dengan kegiatan mengaji bersama.',
  ]},
  'mengaji': { rhk: 'RHK 4', templates: [
    'Melaksanakan pendampingan kegiatan mengaji Al-Quran kepada peserta didik dengan metode talaqqi, mencakup perbaikan bacaan tajwid, makhraj huruf, serta kelancaran hafalan surat-surat pendek.',
    'Membimbing siswa-siswi dalam kegiatan tilawah Al-Quran harian, memberikan koreksi bacaan secara individual, serta memotivasi peserta didik untuk konsisten meningkatkan kualitas bacaan dan hafalan.',
    'Mendampingi kegiatan mengaji bersama setelah sholat, memberikan arahan mengenai adab membaca Al-Quran, memantau perkembangan bacaan setiap siswa, serta memberikan apresiasi terhadap kemajuan yang dicapai.',
    'Melaksanakan kegiatan tadarus Al-Quran bersama peserta didik secara bergantian, menyimak bacaan dengan seksama, membenarkan pelafalan huruf hijaiyah, dan mencatat progres bacaan di buku monitoring harian.',
    'Mendampingi peserta didik dalam kegiatan muraja\'ah hafalan Al-Quran, menguji kelancaran dan ketepatan bacaan, serta memberikan tips menghafal yang efektif agar target hafalan dapat tercapai tepat waktu.',
    'Memfasilitasi kegiatan mengaji ba\'da Maghrib di mushola asrama dengan suasana yang tenang dan khidmat, mendorong peserta didik untuk saling menyimak bacaan satu sama lain sebagai bentuk ukhuwah.',
  ]},
  'kajian': { rhk: 'RHK 4', templates: [
    'Melaksanakan pendampingan kegiatan kajian keagamaan sore bersama peserta didik yang mengangkat tema akhlak dan adab kehidupan sehari-hari, memastikan semua siswa menyimak dengan baik dan terlibat aktif.',
    'Mendampingi pelaksanaan kajian rutin dengan materi pembentukan karakter islami, meliputi diskusi interaktif, tanya jawab, serta refleksi bersama mengenai penerapan nilai-nilai kebaikan dalam kehidupan di asrama.',
    'Mengikuti dan mendampingi kegiatan kajian sore yang disampaikan oleh ustadz/ustadzah, memastikan peserta didik hadir tepat waktu, duduk dengan tertib, dan aktif berpartisipasi dalam sesi tanya jawab.',
    'Mendampingi kajian kitab bersama peserta didik yang membahas adab bergaul dan tata krama dalam Islam, memfasilitasi diskusi kelompok kecil, dan membantu siswa menghubungkan materi dengan kehidupan nyata di asrama.',
    'Mengoordinasikan kegiatan kajian keagamaan mingguan dengan mengundang pemateri dari luar, menyiapkan tempat dan perlengkapan, serta memastikan peserta didik hadir lengkap dan antusias mengikuti sesi.',
  ]},
  'sakit': { rhk: 'RHK 4', templates: [
    'Melaksanakan monitoring kondisi kesehatan peserta didik yang mengalami keluhan sakit, memberikan pertolongan pertama, memastikan siswa memperoleh istirahat yang cukup, serta berkoordinasi dengan petugas kesehatan.',
    'Mendampingi peserta didik yang sedang tidak sehat dengan memantau suhu tubuh, memberikan obat sesuai kebutuhan, serta memastikan makanan dan minuman bergizi tersedia untuk mempercepat proses pemulihan.',
    'Melakukan pengecekan dan pendampingan kesehatan terhadap siswa yang mengeluhkan gejala sakit, mencatat perkembangan kondisi, serta melaporkan kepada pimpinan apabila diperlukan penanganan medis lebih lanjut.',
    'Merawat peserta didik yang sedang demam di kamar istirahat asrama, secara berkala mengecek suhu tubuh, mengganti kompres, memastikan obat diminum tepat waktu, dan mengantarkan makanan langsung ke tempat tidur.',
    'Berkoordinasi dengan puskesmas terdekat untuk penanganan peserta didik yang memerlukan pemeriksaan lebih lanjut, mendampingi selama proses pemeriksaan, dan menyampaikan hasilnya kepada orang tua/wali siswa.',
  ]},
  'olahraga': { rhk: 'RHK 4', templates: [
    'Melaksanakan pendampingan kegiatan olahraga pagi bersama peserta didik yang meliputi senam, jogging, maupun permainan tim guna menjaga kebugaran jasmani dan semangat positif di awal hari.',
    'Mendampingi peserta didik dalam kegiatan olahraga dan aktivitas fisik di lapangan, memastikan pemanasan dilakukan dengan benar, kegiatan berjalan aman, serta siswa tetap terhidrasi dengan baik.',
    'Membimbing kegiatan rekreasi dan olahraga ringan di sore hari sebagai sarana penyegaran setelah kegiatan belajar, menciptakan suasana gembira sekaligus menjaga kesehatan fisik dan mental peserta didik.',
    'Mendampingi peserta didik bermain futsal di lapangan asrama pada sore hari, memastikan permainan berlangsung sportif dan aman, serta memberikan waktu istirahat yang cukup sebelum melanjutkan kegiatan sholat berjamaah.',
    'Mengoordinasikan kegiatan senam pagi bersama seluruh penghuni asrama di halaman depan, memimpin gerakan pemanasan, dan memastikan semua peserta didik ikut serta dengan penuh semangat untuk menjaga kebugaran tubuh.',
    'Mengajak peserta didik berolahraga jalan santai mengelilingi lingkungan sekitar asrama pada pagi hari, memanfaatkan momen untuk mempererat kebersamaan sambil menghirup udara segar pedesaan Kediri.',
  ]},
  'disiplin': { rhk: 'RHK 4', templates: [
    'Melaksanakan pembinaan kedisiplinan waktu dan kepatuhan terhadap tata tertib asrama kepada peserta didik, menekankan pentingnya tanggung jawab pribadi, komitmen, serta konsistensi dalam menjalankan aturan.',
    'Memberikan arahan dan teguran edukatif kepada peserta didik yang melanggar peraturan asrama, disertai penjelasan mengenai konsekuensi serta pentingnya sikap disiplin bagi masa depan mereka.',
    'Melakukan pemantauan dan evaluasi tingkat kedisiplinan peserta didik secara berkala, mencakup ketepatan waktu bangun, kehadiran di kegiatan, serta ketertiban dalam menjalankan piket harian.',
    'Melaksanakan sidak kerapian dan kedisiplinan peserta didik secara mendadak, mengecek kelengkapan seragam, kerapian tempat tidur, dan kebersihan kamar sebagai upaya internalisasi budaya tertib di asrama.',
    'Memberikan pembinaan khusus kepada peserta didik yang berulang kali melanggar tata tertib, menggunakan pendekatan dialog persuasif untuk menggali alasan dan bersama-sama mencari solusi perbaikan perilaku.',
  ]},
  'refleksi': { rhk: 'RHK 1', templates: [
    'Melaksanakan kegiatan refleksi malam bersama peserta didik untuk mengevaluasi seluruh rangkaian kegiatan yang telah dilalui sepanjang hari, menyampaikan pesan motivasi, serta menarik hikmah dan pembelajaran.',
    'Memfasilitasi sesi refleksi dan evaluasi harian dengan memberikan ruang bagi peserta didik untuk menyampaikan pengalaman, kendala, serta harapan, guna meningkatkan kualitas kehidupan di asrama.',
    'Menyelenggarakan kegiatan muhasabah dan refleksi malam yang bertujuan menumbuhkan kesadaran diri peserta didik akan pentingnya introspeksi, perbaikan berkelanjutan, serta rasa syukur atas nikmat yang diterima.',
    'Mengajak peserta didik duduk melingkar untuk kegiatan refleksi malam, saling berbagi cerita tentang hal positif yang dialami hari ini, serta menyampaikan satu resolusi kecil yang ingin dicapai esok hari.',
    'Memfasilitasi kegiatan evaluasi diri menjelang tidur, mengajak peserta didik menuliskan tiga hal yang disyukuri hari ini di buku refleksi masing-masing sebagai upaya pembinaan mental positif.',
  ]},
  'apel': { rhk: 'RHK 4', templates: [
    'Melaksanakan kegiatan apel malam dengan seluruh peserta didik, melakukan pengecekan kehadiran, menyampaikan evaluasi singkat kegiatan harian, serta memberikan pengumuman dan arahan untuk esok hari.',
    'Memimpin apel malam di halaman asrama sebagai sarana pembinaan kedisiplinan, pengecekan kondisi fisik dan psikis peserta didik, serta penyampaian informasi penting terkait kegiatan mendatang.',
    'Mendampingi pelaksanaan apel malam yang diikuti seluruh siswa, memastikan barisan tertib dan rapi, menyampaikan catatan evaluasi, serta memberikan motivasi sebelum peserta didik beristirahat.',
    'Melaksanakan apel pagi sebelum peserta didik berangkat ke sekolah, mengecek kesiapan seragam dan perlengkapan belajar, memberikan semangat, dan menyampaikan pesan-pesan penting untuk diperhatikan selama di sekolah.',
    'Memimpin apel sore dengan seluruh penghuni asrama, menyampaikan jadwal kegiatan malam hari, mengevaluasi kedisiplinan selama hari berjalan, serta memberikan penghargaan verbal kepada siswa yang berprestasi.',
  ]},
  'konseling': { rhk: 'RHK 4', templates: [
    'Melaksanakan sesi konseling individual kepada peserta didik yang membutuhkan pendampingan emosional, mendengarkan keluhan dengan empati, dan memberikan solusi serta dorongan semangat yang konstruktif.',
    'Memberikan layanan konseling dan pendampingan psikososial kepada siswa yang mengalami kesulitan adaptasi, kerinduan terhadap keluarga, maupun permasalahan pergaulan di lingkungan asrama.',
    'Melakukan pendekatan personal kepada peserta didik yang menunjukkan perubahan perilaku, memberikan ruang untuk bercerita, serta menyusun langkah pendampingan bersama agar siswa kembali termotivasi.',
    'Mendampingi peserta didik yang merasa rindu rumah melalui sesi ngobrol santai di teras asrama, mendengarkan curahan hati dengan sabar, dan membantu siswa menemukan kenyamanan di lingkungan asrama.',
    'Melaksanakan konseling kelompok kecil bagi peserta didik yang mengalami konflik pertemanan, memfasilitasi dialog terbuka, mediasi, dan mendorong penyelesaian masalah secara damai dan saling menghormati.',
    'Memberikan pendampingan psikologis kepada peserta didik yang menghadapi tekanan akademik, membantu menyusun strategi coping yang sehat dan realistis agar siswa dapat kembali bersemangat dalam belajar.',
  ]},
  'persiapan sekolah': { rhk: 'RHK 3', templates: [
    'Melaksanakan pendampingan persiapan peserta didik sebelum berangkat sekolah, mencakup pengecekan kelengkapan seragam, perlengkapan belajar, serta memastikan siswa sudah sarapan dan siap secara fisik maupun mental.',
    'Mendampingi siswa-siswi mempersiapkan diri untuk berangkat ke sekolah, memastikan penampilan rapi sesuai ketentuan, tas dan buku lengkap, serta motivasi pagi diberikan agar semangat belajar terjaga.',
    'Mengawasi proses persiapan pagi peserta didik mulai dari mandi, berpakaian, hingga sarapan pagi, memastikan seluruh rangkaian dilakukan tepat waktu sehingga siswa tiba di sekolah tanpa keterlambatan.',
    'Melakukan pengecekan akhir sebelum peserta didik berangkat ke sekolah, memastikan ikat pinggang terpasang, sepatu bersih, rambut rapi, dan seluruh buku pelajaran sesuai jadwal hari ini sudah masuk ke dalam tas.',
    'Mengondisikan peserta didik berbaris rapi di halaman asrama sebelum berangkat sekolah, melakukan doa bersama, dan melepas keberangkatan dengan kata-kata motivasi agar semangat belajar menyala sepanjang hari.',
  ]},
  'antar makanan': { rhk: 'RHK 3', templates: [
    'Mendampingi peserta didik mengantarkan makanan kepada teman yang sedang sakit sebagai wujud pembinaan karakter kepedulian sosial, empati, dan solidaritas sesama penghuni asrama SRMA 24 Kediri.',
    'Membimbing siswa dalam kegiatan mengantarkan makanan bagi rekan yang tidak dapat hadir di ruang makan karena kondisi kesehatan, menanamkan nilai gotong royong dan kepedulian terhadap sesama.',
    'Menugaskan peserta didik secara bergiliran untuk mengantarkan makanan ke kamar teman yang sedang istirahat karena sakit, sekaligus memberikan dukungan moral agar rekan mereka segera pulih dan kembali beraktivitas.',
  ]},
  'tidur': { rhk: 'RHK 3', templates: [
    'Melaksanakan pendampingan menjelang waktu istirahat malam, memastikan seluruh peserta didik sudah berada di kamar masing-masing, perangkat elektronik dimatikan, dan suasana kondusif untuk beristirahat.',
    'Mengawasi kegiatan persiapan tidur peserta didik, meliputi pengecekan kamar, pengarahan untuk berdoa sebelum tidur, serta memastikan lampu dipadamkan sesuai jadwal yang telah ditetapkan.',
    'Melakukan patrol malam mengelilingi kamar-kamar asrama untuk memastikan seluruh peserta didik sudah tertidur dengan tenang, mematikan lampu yang masih menyala, dan mengecek keamanan pintu serta jendela.',
    'Mendampingi peserta didik menjelang waktu tidur dengan mengajak berdoa bersama, mengingatkan posisi tidur yang baik menurut sunnah, serta memastikan suhu ruangan nyaman untuk beristirahat.',
  ]},
  'upacara': { rhk: 'RHK 3', templates: [
    'Mendampingi peserta didik dalam pelaksanaan upacara bendera dengan memastikan kesiapan barisan, kelengkapan seragam, serta sikap disiplin dan penghormatan yang baik selama upacara berlangsung.',
    'Melaksanakan pendampingan upacara rutin di halaman sekolah, mengawasi ketertiban peserta didik, dan memastikan seluruh siswa mengikuti rangkaian upacara dengan sikap yang tertib dan khidmat.',
    'Menyiapkan peserta didik untuk mengikuti upacara bendera hari Senin, mengecek kelengkapan atribut seragam, melatih sikap sempurna, dan mengarahkan posisi barisan agar tampak rapi dan terorganisir.',
  ]},
  'piket': { rhk: 'RHK 2', templates: [
    'Mengawasi dan mendampingi pelaksanaan piket harian peserta didik sesuai jadwal yang telah disusun, memastikan setiap siswa menjalankan tanggung jawab piketnya dengan penuh kesadaran dan hasil yang memuaskan.',
    'Melakukan pengecekan hasil piket kebersihan yang dilakukan peserta didik, memberikan umpan balik positif atas hasil kerja yang baik, serta arahan perbaikan bagi yang masih perlu ditingkatkan.',
    'Memantau pelaksanaan piket pagi dan sore secara bergantian, memberikan penilaian terhadap kualitas kebersihan yang dihasilkan, dan menyusun laporan piket untuk evaluasi mingguan bersama tim pengasuh.',
    'Mengoordinasikan rotasi jadwal piket agar pembagian tugas merata, memperkenalkan sistem checklist piket agar peserta didik lebih terarah dalam menjalankan tanggung jawab kebersihan area yang diamanahkan.',
  ]},
  'sharing': { rhk: 'RHK 1', templates: [
    'Memfasilitasi sesi sharing dan diskusi bersama peserta didik yang membahas pengalaman belajar, problematika kehidupan di asrama, serta berbagi solusi dan pandangan secara terbuka dan penuh rasa saling menghargai.',
    'Menyelenggarakan kegiatan sharing circle dengan peserta didik untuk membangun keterbukaan komunikasi, melatih kemampuan menyampaikan pendapat, dan memperkuat ikatan kekeluargaan antar penghuni asrama.',
    'Mengadakan sesi sharing santai di teras asrama sore hari, memberikan kesempatan peserta didik menceritakan pengalaman menarik selama di sekolah, dan berdiskusi ringan tentang cita-cita dan harapan masa depan.',
    'Memfasilitasi forum sharing antar-angkatan agar peserta didik senior dapat berbagi pengalaman dan tips bertahan hidup di asrama kepada adik-adik kelas, mempererat solidaritas dan semangat kebersamaan.',
  ]},
  'setor': { rhk: 'RHK 4', templates: [
    'Mendampingi kegiatan setoran hafalan Al-Quran peserta didik, menyimak bacaan dengan seksama, memberikan koreksi terhadap kesalahan tajwid dan makhraj, serta mencatat progress hafalan masing-masing siswa.',
    'Melaksanakan pendampingan setoran hafalan surat-surat Al-Quran, memberikan semangat dan motivasi kepada peserta didik yang mengalami kesulitan, serta mengapresiasi pencapaian hafalan yang sudah diraih.',
    'Menyimak setoran hafalan peserta didik satu per satu secara bergantian, mencatat jumlah ayat yang berhasil dihafal dengan lancar, dan memberikan target realistis untuk setoran berikutnya berdasarkan kemampuan siswa.',
  ]},
  'kunjungan': { rhk: 'RHK 4', templates: [
    'Mendampingi dan mengawasi kegiatan kunjungan orang tua atau wali peserta didik ke asrama, memfasilitasi pertemuan dengan baik, serta menyampaikan informasi perkembangan siswa secara transparan.',
    'Melaksanakan pendampingan saat jam kunjungan orang tua, memastikan proses berlangsung tertib, penuh kehangatan, dan sesuai dengan prosedur kunjungan yang berlaku di SRMA 24 Kediri.',
    'Menyambut kedatangan orang tua wali peserta didik yang berkunjung ke asrama, memberikan laporan perkembangan akademik dan perilaku anak secara jujur, serta mendiskusikan hal-hal yang perlu ditindaklanjuti bersama.',
  ]},
  'istirahat': { rhk: 'RHK 3', templates: [
    'Mengawasi waktu istirahat siang peserta didik, memastikan seluruh siswa memanfaatkan waktu istirahat dengan baik untuk memulihkan tenaga sebelum melanjutkan aktivitas pembelajaran di sore hari.',
    'Mendampingi kegiatan istirahat peserta didik dengan memastikan suasana tenang dan kondusif, memberikan kesempatan siswa untuk beristirahat secara optimal demi menjaga kesehatan dan fokus belajar.',
    'Memantau kegiatan istirahat siang di kamar asrama, memastikan peserta didik benar-benar beristirahat dan tidak bermain gadget, sehingga kondisi fisik tetap prima untuk mengikuti kegiatan sore hari.',
  ]},
  'pembiasaan': { rhk: 'RHK 3', templates: [
    'Melaksanakan pendampingan kegiatan pembiasaan pagi yang meliputi serangkaian aktivitas rutin seperti merapikan tempat tidur, membersihkan kamar, dan mempersiapkan kebutuhan harian secara mandiri.',
    'Membimbing peserta didik dalam rutinitas pembiasaan pagi hari sebagai sarana pembentukan karakter disiplin, tanggung jawab, dan kemandirian yang terinternalisasi dalam kebiasaan sehari-hari.',
    'Mendampingi kegiatan pembiasaan pagi mulai pukul 04.30 WIB, membangunkan peserta didik dengan lembut, mengarahkan untuk segera sholat Subuh berjamaah, dan melanjutkan dengan kegiatan kebersihan diri.',
    'Melaksanakan program pembiasaan rutin yang mencakup kultum singkat setelah sholat Subuh, senam ringan, dan sarapan bersama, membentuk pola hidup sehat dan teratur bagi seluruh peserta didik asrama.',
  ]},
  'bangun': { rhk: 'RHK 3', templates: [
    'Membangunkan seluruh peserta didik asrama pada dini hari untuk persiapan sholat Subuh berjamaah, mengetuk pintu kamar satu per satu dengan lembut, dan memastikan semua siswa benar-benar sudah bangun.',
    'Melaksanakan kegiatan membangunkan peserta didik pada pukul 04.15 WIB, mengecek setiap kamar, dan memberikan motivasi pagi singkat agar siswa memulai hari dengan semangat dan keberkahan.',
    'Mendampingi proses bangun pagi peserta didik, memastikan tidak ada siswa yang kembali tertidur setelah dibangunkan, dan mengarahkan untuk segera berwudhu dan bersiap sholat Subuh berjamaah di mushola.',
  ]},
  'masak': { rhk: 'RHK 2', templates: [
    'Mendampingi peserta didik dalam kegiatan memasak bersama sebagai bagian dari program kemandirian, mengajarkan resep sederhana, teknik dasar memasak, dan pentingnya menjaga kebersihan dapur setelah digunakan.',
    'Membimbing siswa-siswi memasak makanan ringan untuk konsumsi bersama, menanamkan keterampilan hidup mandiri yang akan berguna di masa depan, serta memastikan keselamatan penggunaan peralatan dapur.',
    'Melaksanakan kegiatan memasak bersama peserta didik di dapur asrama, mengajarkan cara membuat hidangan sederhana dan bergizi, sambil menanamkan nilai kerja sama dan tanggung jawab dalam setiap tahapan.',
  ]},
  'jemput': { rhk: 'RHK 3', templates: [
    'Melaksanakan kegiatan penjemputan peserta didik dari sekolah, memastikan seluruh siswa naik kendaraan dengan tertib dan selamat, serta melakukan pendataan kehadiran saat tiba di asrama.',
    'Mendampingi proses penjemputan peserta didik sepulang sekolah, mengecek kelengkapan barang bawaan, dan menanyakan kondisi siswa selama kegiatan pembelajaran di sekolah hari ini.',
  ]},
  'antar': { rhk: 'RHK 3', templates: [
    'Mengantar peserta didik berangkat ke sekolah dengan memastikan seluruh siswa sudah lengkap, seragam rapi, dan membawa perlengkapan belajar sesuai jadwal mata pelajaran hari ini.',
    'Melaksanakan kegiatan pengantaran peserta didik ke sekolah, mengecek kehadiran sebelum berangkat, dan memastikan perjalanan berlangsung aman dan tertib hingga tiba di gerbang sekolah.',
    'Mendampingi keberangkatan peserta didik menuju sekolah, memberikan pesan singkat agar belajar dengan sungguh-sungguh, serta berdoa bersama untuk kelancaran kegiatan belajar mengajar hari ini.',
  ]},
  'ekskul': { rhk: 'RHK 3', templates: [
    'Mendampingi peserta didik mengikuti kegiatan ekstrakurikuler di sekolah, memastikan siswa hadir tepat waktu, berpartisipasi aktif, dan kembali ke asrama sesuai jadwal yang telah ditentukan.',
    'Melaksanakan pendampingan kegiatan ekskul sore hari, mengawasi peserta didik selama latihan berlangsung, dan memastikan kegiatan berjalan sesuai arahan pembina ekskul dengan penuh semangat.',
    'Mengantarkan dan mendampingi peserta didik yang mengikuti kegiatan ekstrakurikuler pramuka/olahraga/seni, memantau perkembangan minat dan bakat siswa, serta berkoordinasi dengan pembina ekskul terkait.',
  ]},
  'monitoring': { rhk: 'RHK 3', templates: [
    'Melakukan monitoring dan pengawasan terhadap kondisi keseluruhan asrama, mencakup keamanan lingkungan, kelengkapan fasilitas, serta kesejahteraan seluruh peserta didik yang menjadi tanggung jawab pengasuh.',
    'Melaksanakan kegiatan monitoring rutin keliling asrama untuk mengecek kondisi bangunan, instalasi listrik, ketersediaan air bersih, serta memastikan seluruh fasilitas berfungsi dengan baik dan aman.',
    'Memantau kondisi terkini peserta didik melalui percakapan informal, mengidentifikasi siswa yang membutuhkan perhatian khusus, dan menyusun catatan monitoring untuk ditindaklanjuti dalam rapat evaluasi.',
  ]},
  'administrasi': { rhk: 'RHK 1', templates: [
    'Melaksanakan kegiatan administrasi pengasuhan, meliputi pengisian data kehadiran peserta didik, pemutakhiran buku catatan perkembangan siswa, dan penyusunan laporan bulanan kinerja pengasuh asrama.',
    'Menyelesaikan pekerjaan administrasi harian berupa rekapitulasi kehadiran, pencatatan kejadian penting, dan pengarsipan dokumen-dokumen terkait kegiatan pembinaan peserta didik di SRMA 24 Kediri.',
    'Menyusun dan melengkapi dokumen administrasi asrama yang mencakup data personal peserta didik, riwayat kesehatan, catatan perilaku, serta surat-surat korespondensi dengan orang tua atau wali siswa.',
  ]},
  'rapat': { rhk: 'RHK 1', templates: [
    'Menghadiri rapat internal pengasuh asrama yang membahas evaluasi program pembinaan, pembagian tugas piket pengasuh, serta rencana kegiatan khusus di akhir pekan untuk pengembangan peserta didik.',
    'Berpartisipasi aktif dalam rapat koordinasi bulanan seluruh staf SRMA 24 Kediri, menyampaikan laporan perkembangan peserta didik, dan mendiskusikan inovasi program yang perlu diterapkan ke depan.',
    'Mengikuti rapat evaluasi kinerja pengasuh bersama Kepala SRMA 24 Kediri, memaparkan capaian pembinaan, kendala yang dihadapi, serta mengusulkan solusi dan perbaikan program secara konstruktif.',
  ]},
};

const GENERIC_STARTERS = [
  'Melaksanakan kegiatan',
  'Menyelenggarakan kegiatan',
  'Melakukan pendampingan kegiatan',
  'Menjalankan rangkaian kegiatan',
  'Memfasilitasi pelaksanaan kegiatan',
  'Mendampingi peserta didik dalam kegiatan',
  'Melaksanakan program kegiatan',
  'Mengondisikan dan mendampingi kegiatan',
  'Mengoordinasikan pelaksanaan kegiatan',
  'Melaksanakan tugas pendampingan pada kegiatan',
];

const GENERIC_ENDINGS = [
  'memastikan seluruh peserta didik mengikuti kegiatan dengan tertib, antusias, dan penuh semangat di lingkungan asrama SRMA 24 Kediri.',
  'dengan penuh tanggung jawab guna mendukung terciptanya lingkungan asrama yang kondusif, disiplin, dan penuh kekeluargaan.',
  'sebagai bagian dari program pembinaan karakter dan pengembangan potensi peserta didik SRMA 24 Kediri secara menyeluruh.',
  'serta memastikan pelaksanaan berjalan lancar sesuai jadwal yang telah ditetapkan dan memberikan manfaat optimal bagi peserta didik.',
  'dengan mengutamakan pendekatan persuasif dan keteladanan, sehingga peserta didik termotivasi untuk berpartisipasi secara aktif dan bertanggung jawab.',
  'sambil memantau kondisi fisik dan psikis peserta didik, memastikan seluruh siswa dalam keadaan sehat dan siap mengikuti kegiatan berikutnya.',
  'dengan penuh kehangatan dan profesionalisme, menciptakan suasana yang mendukung perkembangan holistik peserta didik baik dari aspek akademik, spiritual, maupun sosial.',
  'guna mewujudkan visi SRMA 24 Kediri dalam membentuk generasi muda yang berkarakter, mandiri, berprestasi, dan berakhlak mulia.',
  'serta mendokumentasikan pelaksanaan kegiatan sebagai bahan evaluasi dan laporan pertanggungjawaban kepada pimpinan SRMA 24 Kediri.',
  'dengan memperhatikan aspek keselamatan, kenyamanan, dan ketertiban seluruh peserta didik yang menjadi tanggung jawab pengasuh.',
];

export default createEndpoint({
  inputSchema: z.object({ kataKunci: z.string() }),
  outputSchema: z.object({
    deskripsi: z.string(),
    rhk: z.string(),
  }),
  async execute({ input }) {
    const keyword = input.kataKunci.toLowerCase().trim();
    
    // Try exact multi-word matches first
    for (const [key, value] of Object.entries(RHK_KEYWORDS)) {
      if (key.includes(' ') && keyword.includes(key)) {
        const template = value.templates[Math.floor(Math.random() * value.templates.length)];
        return { deskripsi: template, rhk: value.rhk };
      }
    }

    // Then single-word matches
    for (const [key, value] of Object.entries(RHK_KEYWORDS)) {
      if (!key.includes(' ') && keyword.includes(key)) {
        const template = value.templates[Math.floor(Math.random() * value.templates.length)];
        return { deskripsi: template, rhk: value.rhk };
      }
    }
    
    // Generic fallback with varied vocabulary
    const starter = GENERIC_STARTERS[Math.floor(Math.random() * GENERIC_STARTERS.length)];
    const ending = GENERIC_ENDINGS[Math.floor(Math.random() * GENERIC_ENDINGS.length)];
    const capitalizedKeyword = input.kataKunci.charAt(0).toUpperCase() + input.kataKunci.slice(1).toLowerCase();
    
    return {
      deskripsi: `${starter} ${capitalizedKeyword} di lingkungan SRMA 24 Kediri, ${ending}`,
      rhk: 'RHK 3',
    };
  },
});
