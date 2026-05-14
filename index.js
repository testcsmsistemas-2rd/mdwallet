const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send(`
    <h1>MD WALLET</h1>
  `);
});

// Static después
app.use(express.static(path.join(__dirname, "public")));

app.post("/delete-user", (req, res) => {
  const { userId } = req.body;

  console.log("Usuario eliminado:", userId);

  res.send("OK");
});

app.listen(PORT, () => {
  console.log("Server running");
});