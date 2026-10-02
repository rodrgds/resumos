const codigo = /^(?:LTW|BD)-([0-9]{3})$/;
for (const texto of ['LTW-042', 'BD-007', 'LTW-42', 'xLTW-042']) {
  const resultado = texto.match(codigo);
  console.log(texto + ': ' + (resultado ? resultado[1] : 'inválido'));
}
const frase = 'A <b>rede</b> e <i>web</i>.';
console.log(frase.match(/<.*>/)[0]);
console.log(frase.match(/<.*?>/)[0]);
console.log('livro livro novo'.match(/\b(\w+)\s+\1\b/)[0]);
