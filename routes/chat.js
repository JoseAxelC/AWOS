const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {

    const mensaje = req.body.texto;

    try {
        const response = await axios.post(
            "https://router.huggingface.co/v1/chat/completions",
            {
                model: "google/gemma-2b-it", // 👈 ESTE SÍ FUNCIONA
                messages: [
                    { role: "user", content: mensaje }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const respuesta = response.data.choices[0].message.content;

        res.json({ respuesta });

    } catch (error) {
        console.error("ERROR IA:", error.response?.data || error.message);
        res.json({ respuesta: "Error IA" });
    }
});

module.exports = router;
