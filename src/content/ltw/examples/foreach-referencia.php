<?php
$notas = [12, 15, 18];
foreach ($notas as &$nota) {
    ++$nota;
}
$nota = 0;
echo json_encode($notas), "\n";
unset($nota);

$notas = [12, 15, 18];
foreach ($notas as &$nota) {
    ++$nota;
}
unset($nota);
$nota = 0;
echo json_encode($notas), "\n";
