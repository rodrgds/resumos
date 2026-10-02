<?php
$entrada = file_get_contents('php://input');
parse_str($entrada, $dados);
$bruto = $dados['quantidade'] ?? null;
$quantidade = is_string($bruto)
    ? filter_var($bruto, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 3]])
    : false;
if ($quantidade === false) {
    echo "Quantidade inválida.
";
    exit;
}
$precoCentimos = 1250;
echo 'Total: ', $quantidade * $precoCentimos, " cêntimos
";
