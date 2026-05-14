const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Static después
app.use(express.static(path.join(__dirname, "public")));

app.post("/delete-user", (req, res) => {
  const { userId } = req.body;
  console.log(`Usuario eliminado: ${userId}`);
  res.json({ status: "ok", userId });
});

// Página para solicitar eliminación (GET)
app.get("/eliminar-usuario", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "eliminar-usuario.html"));
});

// Recepción del formulario de solicitud de eliminación (POST)
app.post("/eliminar-usuario", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send(`
      <!doctype html>
      <html>
        <head><meta charset="utf-8"><title>Error</title></head>
        <body style="font-family:Arial,sans-serif;padding:20px;">
          <h1>Error: correo requerido</h1>
          <p>Debe proporcionar el correo registrado para solicitar la eliminación.</p>
          <p><a href="/eliminar-usuario">Volver al formulario</a></p>
        </body>
      </html>
    `);
  }
  const safeEmail = String(email).replace(/</g, '&lt;');
  console.log("Solicitud de eliminación de usuario. Email:", safeEmail);
  res.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Solicitud recibida</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
      </head>
      <body style="font-family:Arial,sans-serif;padding:20px;line-height:1.6">
        <h1>Solicitud recibida</h1>
        <p>Hemos registrado su solicitud de eliminación asociada al correo: <strong>${safeEmail}</strong></p>
        <p>Recibirá un correo de confirmación si el email coincide con una cuenta registrada.</p>
        <p><a href="/">Volver al inicio</a></p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log("Server running");
});