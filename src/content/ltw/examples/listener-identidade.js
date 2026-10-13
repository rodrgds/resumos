const botao = document.querySelector('#contar');
const contagens = document.querySelector('#contagens');
const estado = document.querySelector('#estado');
const leitor = {
  total: 0,
  contar() {
    ++this.total;
    contagens.textContent = String(this.total);
  },
};
const callback = leitor.contar.bind(leitor);
botao.addEventListener('click', callback);
document.querySelector('#outro').addEventListener('click', () => {
  botao.removeEventListener('click', leitor.contar.bind(leitor));
  estado.textContent = 'Foi usada uma função nova. Experimenta contar de novo.';
});
document.querySelector('#mesmo').addEventListener('click', () => {
  botao.removeEventListener('click', callback);
  estado.textContent =
    'Foi removida a função registada. A contagem já não muda.';
});
