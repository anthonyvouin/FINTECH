// index.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Middleware body-parser pour traiter les données JSON
app.use(bodyParser.json());

// Middleware CORS pour autoriser toutes les origines, méthodes et en-têtes
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

// Connexion à la base de données MongoDB
mongoose
  .connect("mongodb://localhost:27017/account-projet4-express", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB database"))
  .catch((error) =>
    console.log("Error connecting to MongoDB database: ", error)
  );


app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});

// Route POST pour traiter les données JSON
app.post("/api/data", (req, res) => {
  const jsonData = req.body;
  console.log("Données reçues :", jsonData);
  res.json({ message: "Données reçues avec succès" });
});

