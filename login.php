<?php
session_start();

$error = "";

// Cek apakah tombol submit sudah diklik
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Username dan Password default (Bisa disesuaikan)
    if ($username === "karbit" && $password === "12345") {
        $_SESSION['user'] = $username;
        header("Location: index.html"); // Pindah ke halaman utama jika berhasil
        exit();
    } else {
        $error = "Username atau password salah!";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Portfolio Zayyanah</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .login-box {
            max-width: 400px;
            margin: 80px auto;
            padding: 30px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            text-align: center;
        }
        .form-group {
            margin-bottom: 15px;
            text-align: left;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
        }
        .form-group input {
            width: 100%;
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }
        .submit-btn {
            width: 100%;
            padding: 10px;
            background: #ff4757;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 10px;
        }
        .error-msg {
            color: #ff6b6b;
            margin-bottom: 15px;
        }
        .back-link {
            display: block;
            margin-top: 15px;
            color: #ddd;
            text-decoration: none;
            font-size: 13px;
        }
    </style>
</head>
<body class="theme-galaxy">
    <div class="login-box">
        <h2>Form Login</h2>
        <p>Masuk ke Akun Anda</p>

        <?php if (!empty($error)): ?>
            <div class="error-msg"><?php echo $error; ?></div>
        <?php endif; ?>

        <form action="login.php" method="POST">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required placeholder="Masukkan username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Masukkan password">
            </div>
            <button type="submit" class="submit-btn">LOGIN</button>
        </form>
        
        <a href="index.html" class="back-link">← Kembali ke Portofolio</a>
    </div>
</body>
</html>
