<?php
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo json_encode(['erro' => 'Método não permitido']);
    exit;
}
$termo = $_GET['q'] ?? '';
if (!is_string($termo) || strlen($termo) > 100) {
    http_response_code(400);
    echo json_encode(['erro' => 'Pesquisa inválida']);
    exit;
}
$catalogo = [['titulo' => 'Redes'], ['titulo' => 'Algoritmos'], ['titulo' => 'SQL']];
$resultados = array_values(array_filter($catalogo, function ($livro) use ($termo) {
    return stripos($livro['titulo'], $termo) !== false;
}));
echo json_encode($resultados, JSON_UNESCAPED_UNICODE);
