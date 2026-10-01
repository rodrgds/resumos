'use strict';

function resumo() {
  if (true) {
    var total = 8;
    let parcial = 3;
    console.log(parcial);
  }
  console.log(total);
  console.log(typeof parcial);
}

console.log(typeof total);
resumo();
try {
  pendente = 7;
} catch (erro) {
  console.log(erro.name);
}
