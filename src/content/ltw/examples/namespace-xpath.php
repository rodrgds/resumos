$xpath->registerNamespace('b', 'urn:biblioteca');
$livros = $xpath->query('/b:catalogo/b:livro');
