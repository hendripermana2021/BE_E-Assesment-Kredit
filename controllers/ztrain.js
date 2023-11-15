const dataROC = [];

for (let i = 1; i <= 6; i++) {
  const newObj = {
    id: i,
    scale_priority: i,
    name_kriteria: "Keterangan Perizinan",
    weight_score: null,
  };

  dataROC.push(newObj);
}

console.log(dataROC);
