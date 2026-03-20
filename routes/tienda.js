const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/comprar", async (req, res) => {

    console.log("📩 Datos recibidos:", req.body);

    const { nombre, email, carrito } = req.body;

    if (!nombre || !email || !carrito) {
        return res.status(400).json({
            mensaje: "Faltan datos"
        });
    }

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // 🔥 VERIFICAR CONEXIÓN
        await transporter.verify();
        console.log("✅ Conectado a Gmail");

        const total = carrito.reduce((acc, p) => acc + p.precio, 0);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Compra realizada",
            html: `<h2>Compra exitosa</h2><p>Total: $${total}</p>`
        });

        console.log("📨 Correo enviado");

        res.json({ mensaje: "Compra exitosa" });

    } catch (error) {

        console.error("🔥 ERROR REAL:");
        console.error(error);

        res.status(500).json({
            mensaje: "Error al procesar el pago"
        });
    }

});

module.exports = router;
