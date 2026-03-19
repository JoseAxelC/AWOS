const express = require("express");
const router = express.Router();
const path = require("path");

// Servir archivos estáticos de tu proyecto Three.js
router.use("/", express.static(path.join(__dirname, "../public/three")));

// Servir librería three desde node_modules
router.use("/lib", express.static(path.join(__dirname, "../node_modules/three")));

module.exports = router;
