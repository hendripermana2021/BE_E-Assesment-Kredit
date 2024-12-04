"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_subkriteria",
      [
        {
          name_sub: "Kurang layak",
          description: "Pendapatan sangat rendah atau tidak tetap",
          id_kriteria: 1,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Cukup layak",
          description: "Pendapatan rendah dengan beberapa fluktuasi",
          id_kriteria: 1,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Layak",
          description: "Pendapatan cukup stabil dan memenuhi kebutuhan dasar",
          id_kriteria: 1,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Sangat layak",
          description:
            "Pendapatan tinggi, stabil, dan lebih dari cukup untuk memenuhi kewajiban kredit",
          id_kriteria: 1,
          value: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Sangat layak",
          description: "Lebih dari 5 tahun bekerja atau berbisnis",
          id_kriteria: 2,
          value: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Layak",
          description: "3-5 Tahun bekerja atau berbisnis",
          id_kriteria: 2,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Cukup layak",
          description: "1-3 Tahun bekerja atau berbisnis",
          id_kriteria: 2,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Kurang layak",
          description: "Kurang dari 1 tahun bekerja atau berbisnis",
          id_kriteria: 2,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Memiliki aset",
          description:
            "Memiliki barang-barang berwujud yang bernilai dan digunakan dalam jangka panjang, seperti rumah, tanah, mobil, atau peralatan kerja (misalnya, komputer untuk seorang freelancer). Aset ini biasanya tidak dijual dengan cepat dan dapat dianggap sebagai investasi jangka panjang. Contohnya, seorang individu yang memiliki rumah dan mobil akan dianggap memiliki aset tetap.",
          id_kriteria: 3,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Tidak memiliki aset",
          description:
            "Tidak memiliki properti fisik yang signifikan dan mungkin lebih mengandalkan sumber daya sewa atau aset tidak berwujud. Misalnya, seseorang yang menyewa rumah dan menggunakan transportasi umum tidak memiliki aset tetap dalam bentuk properti atau kendaraan. Orang ini mungkin mengandalkan pendapatan atau tabungan daripada aset fisik untuk kebutuhan jangka panjangnya.",
          id_kriteria: 3,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name_sub: "Kurang layak",
          description:
            "Rasio pengeluaran terhadap pendapatan sangat tinggi (> 50%)",
          id_kriteria: 4,
          value: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Cukup layak",
          description:
            "Rasio pengeluaran terhadap pendapatan tinggi (30%-50%).",
          id_kriteria: 4,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Layak",
          description:
            "Rasio pengeluaran terhadap pendapatan moderat (20%-30%).",
          id_kriteria: 4,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Sangat layak",
          description: "Rasio pengeluaran terhadap pendapatan rendah (< 20%).",
          id_kriteria: 4,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name_sub: "Cukup layak",
          description:
            "Tidak ada sumber pendapatan lain selain dari pekerjaan utama.",
          id_kriteria: 5,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Layak",
          description: "Memiliki sumber pendapatan tambahan yang cukup stabil.",
          id_kriteria: 5,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Sangat layak",
          description:
            "Memiliki beberapa sumber pendapatan yang sangat stabil dan menguntungkan.",
          id_kriteria: 5,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Proses pendanaan produksi",
          description:
            "Kredit ini digunakan untuk mendukung biaya operasional dalam proses produksi barang atau jasa. Biasanya diberikan kepada pelaku usaha atau perusahaan yang memerlukan modal kerja untuk membeli bahan baku, membayar tenaga kerja, atau kebutuhan produksi lainnya. Kredit jenis ini membantu memastikan kelancaran proses produksi hingga barang atau jasa siap dijual.",
          id_kriteria: 6,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Proses investasi jangka panjang",
          description:
            "Kredit yang diajukan untuk investasi jangka panjang biasanya digunakan untuk pembelian aset tetap atau pengembangan bisnis yang menghasilkan keuntungan dalam jangka waktu lama, seperti pembelian properti, mesin, atau pembangunan fasilitas baru. Tujuannya adalah meningkatkan kapasitas dan efisiensi bisnis secara berkelanjutan.",
          id_kriteria: 6,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Kebutuhan konsumtif",
          description:
            "Kredit ini diajukan untuk keperluan pribadi yang sifatnya konsumtif, seperti pembelian kendaraan, renovasi rumah, atau biaya pendidikan. Berbeda dengan investasi, kredit konsumtif digunakan untuk memenuhi kebutuhan sehari-hari atau meningkatkan kualitas hidup individu tanpa harapan untuk menghasilkan pendapatan langsung dari penggunaan kredit tersebut.",
          id_kriteria: 6,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Tinggi",
          description:
            "kemungkinan besar bahwa peminjam akan mengalami kesulitan dalam memenuhi kewajiban pembayaran kredit. Faktor-faktor yang berkontribusi pada risiko tinggi meliputi riwayat kredit buruk, pendapatan yang tidak stabil, dan aset yang tidak memadai sebagai jaminan. Peminjam dengan risiko kredit tinggi sering kali memiliki peluang gagal bayar yang besar, sehingga lembaga keuangan biasanya menetapkan suku bunga lebih tinggi atau meminta jaminan tambahan.",
          id_kriteria: 7,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Menengah",
          description:
            "peminjam memiliki potensi risiko yang moderat dalam memenuhi kewajiban pembayaran. Meskipun ada beberapa faktor yang bisa meningkatkan risiko (seperti pendapatan yang cukup tetapi tidak stabil atau riwayat kredit yang baik dengan beberapa catatan masalah), secara keseluruhan, peminjam masih dianggap cukup mampu untuk memenuhi kewajiban kreditnya. Kredit dengan risiko menengah biasanya disertai dengan syarat yang wajar dan suku bunga menengah.",
          id_kriteria: 7,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Rendah",
          description:
            "peminjam sangat mungkin dapat memenuhi kewajiban kredit tanpa masalah. Peminjam dengan risiko rendah biasanya memiliki riwayat kredit yang sangat baik, pendapatan stabil, dan aset yang memadai untuk dijadikan jaminan. Lembaga keuangan cenderung lebih nyaman memberikan kredit dengan syarat yang lebih mudah, bunga yang rendah, dan persyaratan jaminan yang minimal karena risiko gagal bayar sangat kecil.",
          id_kriteria: 7,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Sangat baik",
          description:
            "tindakan pencegahan dan pengelolaan risiko kredit sudah dilakukan secara komprehensif dan efektif. Lembaga keuangan telah menerapkan kebijakan penilaian risiko yang ketat, termasuk pengecekan mendalam terhadap riwayat kredit, kemampuan pembayaran, serta ketersediaan jaminan yang memadai. Peminjam yang masuk kategori ini dianggap sangat terlindungi dari potensi gagal bayar, dan segala kemungkinan risiko sudah dianalisis serta diantisipasi dengan baik.",
          id_kriteria: 8,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Baik",
          description:
            "Mitigasi risiko di tingkat ini masih tergolong cukup efektif, namun mungkin ada beberapa aspek yang masih dapat ditingkatkan. Lembaga keuangan melakukan penilaian risiko dengan cukup baik, termasuk pengecekan data kredit dan jaminan, namun tidak seketat mitigasi sangat baik. Secara keseluruhan, potensi gagal bayar masih dalam batas aman, dan strategi pengelolaan risiko sudah cukup memadai untuk menjaga stabilitas kredit.",
          id_kriteria: 8,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Kurang baik",
          description:
            "Mitigasi risiko pada level ini dinilai kurang optimal. Lembaga keuangan mungkin tidak sepenuhnya menerapkan kebijakan yang ketat dalam pengecekan riwayat kredit, analisis kemampuan bayar, atau ketersediaan jaminan. Hal ini meningkatkan risiko gagal bayar karena tindakan mitigasi tidak cukup untuk menutupi semua potensi masalah yang mungkin timbul. Dalam kategori ini, perlu perbaikan signifikan dalam strategi pengelolaan risiko untuk memastikan keberlanjutan kredit yang lebih aman.",
          id_kriteria: 8,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Sangat baik",
          description:
            "Peminjam memiliki rekam jejak yang sempurna dengan lembaga keuangan, selalu membayar cicilan tepat waktu tanpa penundaan, dan tidak pernah mengalami masalah kredit. Selain itu, peminjam juga mungkin telah membangun hubungan yang baik dengan bank atau lembaga keuangan, sehingga mereka sering mendapatkan penawaran kredit dengan syarat yang lebih baik dan bunga yang kompetitif. Lembaga keuangan memiliki kepercayaan penuh terhadap peminjam ini.",
          id_kriteria: 9,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Baik",
          description:
            "Peminjam memiliki pengalaman yang cukup positif dengan lembaga keuangan, meskipun mungkin ada beberapa penundaan kecil dalam pembayaran di masa lalu, namun tidak signifikan dan diselesaikan dengan baik. Peminjam ini umumnya patuh terhadap kewajiban keuangan mereka, meskipun tidak selalu sempurna, dan masih dapat dipercaya oleh lembaga keuangan.",
          id_kriteria: 9,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Kurang baik",
          description:
            "Peminjam memiliki riwayat yang kurang baik dengan lembaga keuangan, seperti pembayaran kredit yang sering terlambat atau gagal bayar. Mungkin ada masalah komunikasi, kredit macet, atau perselisihan terkait penyelesaian utang. Lembaga keuangan lebih berhati-hati dalam memberikan kredit baru kepada peminjam ini dan mungkin memberlakukan syarat yang lebih ketat atau bunga yang lebih tinggi.",
          id_kriteria: 9,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "60 Bulan",
          description: "",
          id_kriteria: 10,
          value: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "48 Bulan",
          description: "",
          id_kriteria: 10,
          value: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "36 Bulan",
          description: "",
          id_kriteria: 10,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "24 Bulan",
          description: "",
          id_kriteria: 10,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "12 Bulan",
          description: "",
          id_kriteria: 10,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Rp. 500.000.000 - Rp. 1.000.000.000",
          description: "",
          id_kriteria: 11,
          value: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "RP. 200.000.000 - RP. 499.999.999",
          description: "",
          id_kriteria: 11,
          value: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: "Rp. 50.000.000 - Rp. 199.999.999",
          description: "",
          id_kriteria: 11,
          value: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_sub: " Rp. 1.000.000 - Rp. 49.999.999",
          description: "",
          id_kriteria: 11,
          value: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_subkriteria", null, {});
  },
};
