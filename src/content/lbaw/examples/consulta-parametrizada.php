$stmt = $pdo->prepare('SELECT id FROM utilizadores WHERE email = :email');
$stmt->execute(['email' => $email]);
