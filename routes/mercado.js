const express = require("express");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const client = new MercadoPagoConfig({
  accessToken: "TEST-6731289479405613-021202-984992691a5d42b4c41f32a7c9e7c799-2283888736"
});

app.post("/crear-preferencia", async (req, res) => {
  try {

    const items = req.body.items;

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: items,
        back_urls: {
          success: "http://localhost:3000/success.html",
          failure: "http://localhost:3000/failure.html",
          pending: "http://localhost:3000/pending.html"
        }
      }
    });

    res.json({ id: response.id });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear preferencia" });
  }
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
