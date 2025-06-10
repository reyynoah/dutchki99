<?php
// Konfigurasi database
$host = "localhost";
$user = "root";
$pass = "";
$db = "dutchki 99";

// Membuat koneksi ke database
$conn = new mysqli($host, $user, $pass, $db);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}