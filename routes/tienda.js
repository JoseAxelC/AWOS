const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const router = express.Router();

// Servir el HTML de la tienda
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/tienda/index.html"));
});

// Ruta de compra
router.post("/comprar", async (req, res) => {

    const { nombre, email, carrito } = req.body;

    // Validación básica
    if (!nombre || !email || !carrito || carrito.length === 0) {
        return res.status(400).json({
            mensaje: "Datos incompletos"
        });
    }

    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
    const numeroOrden = Math.floor(Math.random() * 1000000);
    const fecha = new Date().toLocaleString();

    // 🔐 Configuración segura (Render ENV)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {

        await transporter.sendMail({
            from: `"Mi Tienda Escolar" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Confirmación de compra #${numeroOrden}`,
            html: `
            <div style="font-family:Arial;padding:20px;background:#f4f6f9;">
                <div style="background:white;padding:20px;border-radius:10px;">
                    <h2 style="color:#2c3e50;">🛒 Confirmación de Compra</h2>
                    <p><strong>Orden:</strong> #${numeroOrden}</p>
                    <p><strong>Fecha:</strong> ${fecha}</p>
                    <p><strong>Cliente:</strong> ${nombre}</p>

                    <table style="width:100%;border-collapse:collapse;margin-top:15px;">
                        <thead>
                            <tr style="background:#2a5298;color:white;">
                                <th style="padding:10px;">Producto</th>
                                <th style="padding:10px;">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${carrito.map(p => `
                                <tr>
                                    <td style="padding:8px;border-bottom:1px solid #ddd;">${p.nombre}</td>
                                    <td style="padding:8px;border-bottom:1px solid #ddd;">$${p.precio}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>

                    <h3 style="margin-top:15px;">Total: $${total}</h3>
                    <p style="margin-top:20px;color:#555;">
                        Gracias por tu compra 😊
                    </p>
                </div>
            </div>
            `
        });

        res.json({
            mensaje: "✅ Compra realizada y correo enviado"
        });

    } catch (error) {

        console.error("🔥 ERROR CORREO:");
        console.error(error);

        res.status(500).json({
            mensaje: "❌ Error al procesar el pago"
        });
    }

});

module.exports = router;
