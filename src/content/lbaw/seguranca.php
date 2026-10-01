$texto = '<img src=x onerror="alert(1)">';
echo htmlspecialchars($texto, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . "\n";
$hash = password_hash('exemplo_que_nao_e_segredo', PASSWORD_DEFAULT);
echo password_verify('exemplo_que_nao_e_segredo', $hash) ? "certa\n" : "recusada\n";
echo password_verify('outra', $hash) ? "certa\n" : "recusada\n";
