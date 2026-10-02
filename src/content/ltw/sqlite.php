<?php
$db = new PDO('sqlite::memory:');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
$db->exec('CREATE TABLE livro (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, preco INTEGER NOT NULL)');
$inserir = $db->prepare('INSERT INTO livro (titulo, preco) VALUES (?, ?)');
foreach ([['Redes', 18], ['Algoritmos', 25], ['SQL', 12]] as $livro) {
    $inserir->execute($livro);
}
$consulta = $db->prepare('SELECT titulo, preco FROM livro WHERE preco < :limite ORDER BY preco');
$consulta->execute(['limite' => 20]);
foreach ($consulta->fetchAll() as $livro) {
    echo $livro['titulo'], ': ', $livro['preco'], "
";
}
