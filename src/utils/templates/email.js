export const htmlContent = (name, actionUrl, email) => `
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password Email</title>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #ffff;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #f0f2f5;
        border-radius: 12px;
        overflow: hidden;
      }

      .header {
        background: linear-gradient(to right, #2c3e50, #34495e);
        padding: 30px 20px;
        text-align: center;
        color: white;
      }

      .header h1 {
        margin: 0;
        font-size: 26px;
        letter-spacing: 1px;
      }

      .content {
        padding: 30px 25px;
        font-size: 15px;
        line-height: 1.7;
        color: #333;
      }

      .content p {
        margin-bottom: 20px;
      }

      .btn {
        display: inline-block;
        padding: 14px 24px;
        background-color: #e74c3c;
        color: white !important;
        border-radius: 6px;
        font-weight: 600;
        text-decoration: none;
        text-align: center;
        box-shadow: 0 4px 8px rgba(231, 76, 60, 0.2);
        transition: background 0.3s ease;
      }

      .btn:hover {
        background-color: #c0392b;
      }

      .btn-container {
        text-align: center;
        margin: 30px 0;
      }

      .footer {
        background: #2c3e50;
        color: #fff;
        text-align: center;
        padding: 25px 20px;
        font-size: 13px;
      }

      .social-icons {
        margin-bottom: 10px;
      }

      .social-icons a {
        margin: 0 8px;
        display: inline-block;
        opacity: 0.7;
      }

      .social-icons a:hover {
        opacity: 1;
      }

      .social-icons img {
        width: 24px;
        height: 24px;
      }

      hr {
        border: none;
        border-top: 1px solid rgba(51, 51, 51, 0.2);
        margin: 30px 0;
      }

      @media (max-width: 480px) {
       .content {
        text-align: justify;
      }
      .btn {
        width: 35%;
        font-size: 14px;
      }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Brothers MCS</h1>
      </div>
      <div class="content">
        <p>Hi <strong>${name}</strong>,</p>
        <p>
          Anda baru saja meminta untuk menyetel ulang kata sandi untuk akun ${email}
          Anda.
          <strong
            >Penyetelan ulang kata sandi ini hanya berlaku untuk 1 jam ke
            depan.</strong
          >
          Jika Anda tidak mengeklik tombol setel ulang dalam waktu 1 jam, Anda
          harus melakukan proses lupa kata sandi lagi.
        </p>
        <p>Gunakan tombol di bawah ini untuk menyetel ulang:</p>
        <div class="btn-container">
          <a href="${actionUrl}" class="btn">Reset password</a>
        </div>
        <p>
          Demi alasan keamanan, jika Anda tidak meminta pengaturan ulang kata
          sandi, abaikan email ini atau hubungi dukungan jika Anda memiliki
          pertanyaan.
        </p>
        <hr />
        <p>Terimakasih,<br />Brothers MCS</p>
      </div>
      <div class="footer">
        <div class="social-icons">
          <a href="https://www.facebook.com/share/1AVQ5jweQy/"
            ><img
              src="https://img.icons8.com/ios/50/ffffff/facebook-new.png"
              alt="Facebook"
          /></a>
          <a href="https://www.instagram.com/gkc_ekspedisi?igsh=MThvaGd1dWNlaG15aw=="
            ><img
              src="https://img.icons8.com/ios/50/ffffff/instagram-new.png"
              alt="Instagram"
          /></a>
          <a href="https://wa.me/6281361680786" target="_blank"
            ><img
              src="https://img.icons8.com/ios/50/ffffff/whatsapp--v1.png"
              alt="WhatsApp"
          /></a>
        </div>
        <p>&copy; 2025 Brothers MCS. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

`;
