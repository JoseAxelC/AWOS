const express = require("express");
const router = express.Router();
const axios = require("axios");

const HF_TOKEN = "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";

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
                    { role: "user", content: mensaje }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`
                }
            }
        );

        res.json({ respuesta: response.data.choices[0].message.content });

    } catch (error) {
        res.json({ respuesta: "Error IA" });
    }
});

module.exports = router;
