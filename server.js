const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Importar rutas
app.use("/chat", require("./routes/chat"));
app.use("/tienda", require("./routes/tienda"));
app.use("/three", require("./routes/three"));
app.use("/auth", require("./routes/auth2fa"));

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
