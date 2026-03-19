const express = require("express");
const router = express.Router();
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

let userSecret = null;

// Generar QR
router.get("/generar", async (req, res) => {

  const secret = speakeasy.generateSecret({
    length: 20,
    name: "Proyecto2FA(Axel)"
  });

  userSecret = secret.base32;

  const qr = await QRCode.toDataURL(secret.otpauth_url);

  res.json({ qr });
});

// Verificar código
router.post("/verificar", (req, res) => {

  const { token } = req.body;

  const verified = speakeasy.totp.verify({
    secret: userSecret,
    encoding: "base32",
    token: token,
    window: 1
  });

  res.json({ success: verified });
});

module.exports = router; // 👈 ESTO ES LO MÁS IMPORTANTE
