<?php

require_once 'koneksisi.php';

// Ambil data dari form
$username = $_POST['username'] ?? '';
$email    = $_POST['email'] ?? '';
$phone    = $_POST['phone'] ?? '';
$message  = $_POST['message'] ?? '';

// Siapkan statement SQL
$stmt = $conn->prepare("INSERT INTO contact (username, email, phone, message) VALUES (?, ?, ?, ?)");

// Bind parameter
$stmt->bind_param("ssss", $username, $email, $phone, $message);

// Eksekusi dan cek apakah berhasil
if ($stmt->execute()) {
    header("Location: contact.html");
    exit();
} else {
    echo "Terjadi kesalahan saat menyimpan data: " . $stmt->error;
}

// Tutup koneksi
$stmt->close();
$conn->close();
?>
