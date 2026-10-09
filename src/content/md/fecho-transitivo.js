const A = [1, 2, 3];
const R = [
  [1, 2],
  [2, 3],
];

// Começamos só com R, sem acrescentar a diagonal.
const M = A.map((a) => A.map((b) => R.some(([x, y]) => x === a && y === b)));
for (let k = 0; k < A.length; k++) {
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A.length; j++) {
      M[i][j] = M[i][j] || (M[i][k] && M[k][j]);
    }
  }
}

const pares = [];
let opostos = null;
for (let i = 0; i < A.length; i++) {
  for (let j = 0; j < A.length; j++) {
    if (M[i][j]) pares.push(`(${A[i]},${A[j]})`);
    if (i < j && M[i][j] && M[j][i] && opostos === null) {
      opostos = [A[i], A[j]];
    }
  }
}
console.log(`R+ = {${pares.join(', ')}}`);
if (opostos === null) {
  console.log('Fecho antissimétrico: sim.');
} else {
  const [a, b] = opostos;
  console.log(`Fecho antissimétrico: não; (${a},${b}) e (${b},${a}).`);
}
