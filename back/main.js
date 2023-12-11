// index.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});

app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

mongoose
  .connect("mongodb://localhost:27017/fintech", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB database");

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connection is open to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose connection is disconnected");
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB database: ", error);
  });


// Création d'un modèle Mongoose pour le formulaire de contacts
const ContactSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model("Contact", ContactSchema);

// Route POST pour le formulaire de contact
app.post("/api/contact", async (req, res) => {
  try {
    const { nom, prenom, email, message } = req.body;

    const newContact = new Contact({
      nom,
      prenom,
      email,
      message,
    });

    const savedContact = await newContact.save();

    res.json({
      message: "Contact enregistré avec succès",
      contact: savedContact,
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du contact :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement du contact" });
  }
});


