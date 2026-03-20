const express = require("express");
const axios = require("axios");

const router = express.Router();

const HF_TOKEN = process.env.HF_TOKEN;

router.post("/", async (req, res) => {

    const mensaje = req.body.texto;

    if (!mensaje.toLowerCase().includes("java")) {
        return res.json({ respuesta: "Solo puedo hablar sobre programación en Java." });
    }

    try {

        const response = await axios.post(
            "https://router.huggingface.co/v1/chat/completions",
            {
                model: "mistralai/Mistral-7B-Instruct-v0.2",
                messages: [
                    {
                        role: "system",
                        content: "Eres un experto en programación en Java."
                    },
                    {
                        role: "user",
                        content: mensaje
                    }
                ],
                max_tokens: 200,
                temperature: 0.3
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
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
