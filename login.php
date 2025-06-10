<?php
require_once 'koneksi.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Ambil data berdasarkan email
$stmt = $conn->prepare("SELECT * FROM dbregis WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Verifikasi password
    if (password_verify($password, $user['password'])) {
        // Login berhasil
        header("Location: lanpag.html");
        exit();
    } else {
        echo "Password salah.";
    }
} else {
    echo "Akun tidak ditemukan. Silakan daftar terlebih dahulu.";
}

$stmt->close();
$conn->close();
?>
