const livros = [
  { titulo: 'Redes', preco: 18 },
  { titulo: 'Algoritmos', preco: 25 },
  { titulo: 'SQL', preco: 12 },
];
const baratos = livros.filter((livro) => livro.preco < 20);
console.log(baratos.map((livro) => livro.titulo).join(', '));
console.log(baratos.reduce((total, livro) => total + livro.preco, 0));
console.log(livros.length);
