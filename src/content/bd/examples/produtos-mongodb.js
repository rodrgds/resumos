db.produtos
  .find({ preco: { $gt: 30 } }, { _id: 0, nome: 1, preco: 1 })
  .sort({ preco: -1, nome: 1 });
