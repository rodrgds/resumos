<?php
$documento = new DOMDocument();
$documento->loadXML('<catalogo><livro id="r1"><titulo>Redes</titulo><preco>18</preco></livro><livro id="a1"><titulo>Algoritmos</titulo><preco>25</preco></livro><livro id="s1"><titulo>SQL</titulo><preco>12</preco></livro></catalogo>', LIBXML_NONET);
$xpath = new DOMXPath($documento);
foreach ($xpath->query('/catalogo/livro[preco < 20]/titulo') as $titulo) {
    echo $titulo->textContent, "
";
}
echo 'Total: ', $xpath->evaluate('count(/catalogo/livro)'), "
";
