const express = require("express");
const axios = require("axios");

const router = express.Router();

const API_KEY = process.env.OPENROUTER_KEY;

router.post("/", async (req, res) => {

    const mensaje = req.body.texto;

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openchat/openchat-3.5",
                messages: [
                    { role: "user", content: mensaje }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
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
