const implica = (a, b) => !a || b;
const premissas = (p, q) => implica(p, q) && q;
const conclusao = (p, q) => p && q;
const valor = (v) => (v ? 'T' : 'F');

let quantidade = 0;
for (const p of [false, true]) {
  for (const q of [false, true]) {
    if (premissas(p, q) && !conclusao(p, q)) {
      console.log(`Contraexemplo: p=${valor(p)}, q=${valor(q)}`);
      quantidade++;
    }
  }
}
console.log(`Atribuições verificadas: 4. Contraexemplos: ${quantidade}.`);
