const express = require("express");
const axios = require("axios");

const router = express.Router();

// Ruta principal del chat
router.post("/", async (req, res) => {

    const mensaje = req.body.texto;

    // 🔒 Filtro: solo Java
    if (!mensaje.toLowerCase().includes("java")) {
        return res.json({
            respuesta: "Solo puedo hablar sobre programación en Java."
        });
    }

    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "meta-llama/llama-3-8b-instruct", // 👈 estable
                messages: [
                    {
                        role: "system",
                        content: "Eres un experto en programación en Java. Responde claro y sencillo."
                    },
                    {
                        role: "user",
                        content: mensaje
                    }
                ],
                max_tokens: 200,
                temperature: 0.5
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const respuestaIA = response.data.choices[0].message.content;

        res.json({ respuesta: respuestaIA });

    } catch (error) {
        console.error("🔥 ERROR IA COMPLETO:");
        console.error(error.response?.data || error.message);

        res.json({ respuesta: "Error IA" });
    }
});

module.exports = router;
