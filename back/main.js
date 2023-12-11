// index.js
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware body-parser pour traiter les données JSON
app.use(bodyParser.json());

// Route POST pour traiter les données JSON
app.post("/api/data", (req, res) => {
  const jsonData = req.body;
  console.log("Données reçues :", jsonData);
  res.json({ message: "Données reçues avec succès" });
});

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
