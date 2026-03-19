const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {

    const mensaje = req.body.texto;

    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/google/flan-t5-base",
            {
                inputs: mensaje
            }
        );

        const respuesta = response.data[0]?.generated_text || "Sin respuesta";

        res.json({ respuesta });

   catch (error) {
    console.error("🔥 ERROR IA COMPLETO:");
    console.error(error.response?.data || error.message);

    res.json({ respuesta: "Error IA" });
}
});

module.exports = router;
