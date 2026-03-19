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
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
            {
                inputs: mensaje
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`
                }
            }
        );

        const respuestaIA = response.data[0]?.generated_text || "No hubo respuesta";

        res.json({ respuesta: respuestaIA });

    } catch (error) {
        console.error("ERROR IA:", error.response?.data || error.message);
        res.json({ respuesta: "Error IA" });
    }
});

module.exports = router;
