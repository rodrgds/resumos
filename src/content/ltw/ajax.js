let pedido = 0;
const estado = document.querySelector('#estado');
const lista = document.querySelector('#resultados');
document
  .querySelector('#pesquisa')
  .addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const atual = ++pedido;
    estado.textContent = 'A pesquisar…';
    const parametros = new URLSearchParams({
      q: document.querySelector('#q').value,
    });
    try {
      const resposta = await fetch('api-livros.php?' + parametros);
      if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
      const livros = await resposta.json();
      if (atual !== pedido) return;
      lista.replaceChildren();
      for (const livro of livros) {
        const item = document.createElement('li');
        item.textContent = livro.titulo;
        lista.append(item);
      }
      estado.textContent = `Resultados: ${livros.length}`;
    } catch (erro) {
      if (atual !== pedido) return;
      lista.replaceChildren();
      estado.textContent = 'Pesquisa indisponível.';
    }
  });
