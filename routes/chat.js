const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {

    const mensaje = req.body.texto;

    if (!mensaje.toLowerCase().includes("java")) {
        return res.json({
            respuesta: "Solo puedo hablar sobre programación en Java."
        });
    }

    try {

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama3-8b-8192", // 🔥 GRATIS Y RÁPIDO
                messages: [
                    {
                        role: "system",
                        content: "Eres un experto en programación en Java."
                    },
                    {
                        role: "user",
                        content: mensaje
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const respuestaIA = response.data.choices[0].message.content;

        res.json({ respuesta: respuestaIA });

    } catch (error) {
        console.error("🔥 ERROR IA:", error.response?.data || error.message);
        res.json({ respuesta: "Error IA" });
    }
});

module.exports = router;
