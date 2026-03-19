const express = require("express");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let userSecret = null;

// 🔐 Generar QR
app.get("/auth/generar", async (req, res) => {

  const secret = speakeasy.generateSecret({
    length: 20,
    name: "Proyecto2FA(Axel)"
  });

  userSecret = secret.base32;

  const qr = await QRCode.toDataURL(secret.otpauth_url);

  res.json({ qr }); // 👈 ahora responde JSON
});

// 🔐 Verificar código
app.post("/auth/verificar", (req, res) => {

  const { token } = req.body;

  const verified = speakeasy.totp.verify({
    secret: userSecret,
    encoding: "base32",
    token: token,
    window: 1
  });

  res.json({ success: verified });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo");
});
