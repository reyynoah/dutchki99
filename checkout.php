<?php
// Konfigurasi koneksi ke database
$host = "localhost";
$user = "root";
$pass = "";
$db = "dutchki";

$conn = new mysqli($host, $user, $pass, $db);

// Periksa koneksi
if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil data JSON dari frontend
$data = json_decode(file_get_contents("php://input"), true);

// Ambil data dari JSON
$name = $conn->real_escape_string($data['name'] ?? '');
$phone = $conn->real_escape_string($data['phone'] ?? '');
$address = $conn->real_escape_string($data['address'] ?? '');
$payment_method = $conn->real_escape_string($data['payment_method'] ?? '');
$cart = $data['cart'] ?? [];

// Validasi data minimal
if (!$name || !$phone || !$address || !$payment_method || empty($cart)) {
  http_response_code(400);
  echo "Data tidak lengkap.";
  exit;
}

// Simpan order utama
$cart_json = $conn->real_escape_string(json_encode($cart));
$sql_order = "INSERT INTO orders (name, phone, address, payment_method, cart_data) 
              VALUES ('$name', '$phone', '$address', '$payment_method', '$cart_json')";

if ($conn->query($sql_order) === TRUE) {
  echo "Pesanan berhasil disimpan.";
} else {
  http_response_code(500);
  echo "Gagal menyimpan pesanan: " . $conn->error;
}

$conn->close();
?>
