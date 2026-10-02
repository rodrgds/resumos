function criarContador(inicial) {
  let valor = inicial;
  return () => ++valor;
}
const a = criarContador(5);
const b = criarContador(0);
console.log(a(), a(), b(), a());
