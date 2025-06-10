<?php
require_once 'koneksi.php';
$con = new mysqli(hostname: "localhost", username: "root", password: "", database: "login");
$result = $con->query("SELECT * FROM dblogin");
?>

<!DOCTYPE html>
<html lang="id">
<head>
</head>
<body>
    <h1>Dashboard Login User</h1>
    <a href="export.php" class="btn-download">⬇️ Download Excel</a>
    <table border="1">
        <tr>
            <th>Email</th>
            <th>Password</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars((string) $row['email']) ?></td>
            <td><?= htmlspecialchars((string) $row['password']) ?></td>
            <td><?= $row['tanggal'] ?></td>
        </tr>
        <?php endwhile; ?>
    </table>
</body>
</html>
