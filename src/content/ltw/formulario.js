const formulario = document.querySelector('#reserva');
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const parametros = new URLSearchParams(new FormData(formulario));
  document.querySelector('#dados').textContent = parametros.toString();
});
