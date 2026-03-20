const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/comprar", async (req, res) => {

    const { nombre, email, carrito } = req.body;

    if (!nombre || !email || !carrito) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.verify();
        console.log("✅ Conectado a Gmail");

        const total = carrito.reduce((acc, p) => acc + p.precio, 0);

        await transporter.sendMail({
            from: `"Mi Tienda" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Compra realizada",
            html: `
                <h2>🛒 Compra exitosa</h2>
                <p>Cliente: ${nombre}</p>
                <p>Total: $${total}</p>
            `
        });

        res.json({ mensaje: "✅ Compra realizada y correo enviado" });

    } catch (error) {
        console.error("🔥 ERROR CORREO:");
        console.error(error);

        res.status(500).json({
            mensaje: "❌ Error al procesar el pago"
        });
    }

});

module.exports = router;
