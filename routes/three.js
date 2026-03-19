const express = require("express");
const router = express.Router();
const path = require("path");

// Proyecto Three
router.use("/", express.static(path.join(__dirname, "../public/three")));

// Librería Three
router.use("/build", express.static(path.join(__dirname, "../node_modules/three/build")));
router.use("/examples", express.static(path.join(__dirname, "../node_modules/three/examples")));

module.exports = router;
