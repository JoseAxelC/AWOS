const express = require("express");
const router = express.Router();

// tus rutas aquí

router.get("/", (req, res) => {
    res.send("2FA funcionando al 100");
});

module.exports = router;
