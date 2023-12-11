// index.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // Vous pouvez utiliser n'importe quel port que vous préférez

// Middleware pour traiter le corps des requêtes au format JSON
app.use(bodyParser.json());

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur votre serveur Express !");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
