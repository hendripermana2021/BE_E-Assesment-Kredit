// Fungsi untuk menghitung ranking
export function assignRanking(data) {
  // Urutkan data berdasarkan psi_result dari yang tertinggi ke terendah
  const sortedData = data.sort((a, b) => b.cpi_result - a.cpi_result);

  // Assign ranking
  let rank = 1;
  for (let i = 0; i < sortedData.length; i++) {
    if (i > 0 && sortedData[i].cpi_result === sortedData[i - 1].cpi_result) {
      // Jika cpi_result sama dengan sebelumnya, assign rank yang sama
      sortedData[i].rank = sortedData[i - 1].rank;
    } else {
      // Jika berbeda, assign rank baru
      sortedData[i].rank = rank;
      rank++;
    }
  }

  return sortedData;
}
