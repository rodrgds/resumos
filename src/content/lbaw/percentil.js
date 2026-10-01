const tempos = [...Array(10).fill(50), ...Array(9).fill(100), 500];
const ordenados = [...tempos].sort((a, b) => a - b);
const media = tempos.reduce((total, x) => total + x, 0) / tempos.length;
const p95 = ordenados[Math.ceil(0.95 * ordenados.length) - 1];
console.log(`media=${media}`);
console.log(`p95=${p95}`);
