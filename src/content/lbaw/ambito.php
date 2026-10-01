$taxa = 4;

function calcular($base) {
    $taxa = 1;
    return $base + $taxa;
}

function aumentarTaxa() {
    global $taxa;
    $taxa++;
}

echo calcular(10) . PHP_EOL;
echo $taxa . PHP_EOL;
aumentarTaxa();
echo $taxa . PHP_EOL;

$ajustar = fn($n) => $n + $taxa;
$taxa = 9;
echo $ajustar(10) . PHP_EOL;
