<?php
$taxa = 2;
function precoLocal(int $base): int {
    $taxa = 1;
    return $base + $taxa;
}
function mudarTaxa(int $nova): void {
    global $taxa;
    $taxa = $nova;
}
$fixa = function (int $base) use ($taxa): int {
    return $base + $taxa;
};
$atual = function (int $base) use (&$taxa): int {
    return $base + $taxa;
};
mudarTaxa(5);
echo precoLocal(10), "\n";
echo $fixa(10), "\n";
echo $atual(10), "\n";
echo $taxa, "\n";
