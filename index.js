// server.js

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>MD WALLET</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          width: 350px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        h1 {
          font-size: 24px;
          color: #d32f2f;
          margin-bottom: 20px;
          text-align: center;
        }

        input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-sizing: border-box;
        }

        button {
          width: 100%;
          padding: 12px;
          background: #d32f2f;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background: #b71c1c;
        }
      </style>
    </head>

    <body>

      <div class="card">
        <h1>🗑️ Borrar Usuario</h1>

        <form action="/delete-user" method="POST">
          <input
            type="text"
            name="userId"
            placeholder="Ingrese ID del usuario"
            required
          />

          <button type="submit">
            Eliminar Usuario
          </button>
        </form>
      </div>

    </body>
    </html>
  `);
});

app.post("/delete-user", (req, res) => {
  const { userId } = req.body;

  console.log("🗑️ Usuario eliminado:", userId);

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Usuario Eliminado</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .success {
          background: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        h1 {
          color: green;
        }

        a {
          display: inline-block;
          margin-top: 20px;
          text-decoration: none;
          background: #1976d2;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
        }
      </style>
    </head>

    <body>

      <div class="success">
        <h1>✅ Usuario eliminado</h1>
        <p>ID eliminado: <strong>${userId}</strong></p>

        <a href="/">
          Volver
        </a>
      </div>

    </body>
    </html>
  `);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ MD WALLET server running on http://localhost:${PORT}`);
});