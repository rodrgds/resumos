const formulario = document.querySelector('#formulario');
const texto = document.querySelector('#texto');
const lista = document.querySelector('#tarefas');
const estado = document.querySelector('#estado');
function atualizar() {
  estado.textContent = `Tarefas: ${lista.children.length}`;
}
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valor = texto.value.trim();
  if (valor === '') return;
  const item = document.createElement('li');
  const nome = document.createElement('span');
  nome.textContent = valor + ' ';
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.dataset.acao = 'remover';
  botao.textContent = 'Remover';
  item.append(nome, botao);
  lista.append(item);
  texto.value = '';
  atualizar();
});
lista.addEventListener('click', (evento) => {
  const botao = evento.target.closest('button[data-acao="remover"]');
  if (!botao || !lista.contains(botao)) return;
  botao.closest('li').remove();
  atualizar();
});
