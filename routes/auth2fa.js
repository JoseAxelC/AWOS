const express = require("express");
const router = express.Router();

// tus rutas aquí

router.get("/", (req, res) => {
    res.send("2FA funcionando");
});

module.exports = router;
