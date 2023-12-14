// index.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import csv from "csv-express";
import PDFDocument from "pdfkit";
import { Parser } from "json2csv";
import xmlbuilder from "xmlbuilder";




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
  .connect(
    "mongodb+srv://root:root@cluster0.whvvfkh.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connection is open to MongoDB Atlas");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose connection is disconnected");
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB Atlas: ", error);
  });



// Route pour se connecter
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Vérifier les identifiants (exemple: admin/admin)
  if (username === "admin" && password === "admin") {
    req.isAuthenticated = true; // Simuler l'authentification
    res.json({ message: "Connexion réussie coté back" });
  } else {
    res.status(401).json({ error: "Identifiants incorrects coté back" });
  }
});

// Api question et pdf

app.get("/api/questions-reponses", async (req, res) => {
  try {
    // Logique pour récupérer l'ensemble des questions et réponses depuis la base de données
    const questionsReponses = await Reponse.find();
    res.json({ questionsReponses });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des questions et réponses :",
      error
    );
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération des questions et réponses",
      });
  }
});

// Route pour obtenir toutes les questions et réponses au format CSV
app.get("/api/questions-reponses/csv", async (req, res) => {
  try {
    const questionsReponses = await Reponse.find();

    // Définissez les en-têtes pour le format CSV
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=questions-reponses.csv"
    );

    // Créez le contenu CSV avec toutes les réponses associées à chaque question
    const csvData = questionsReponses
      .map((question, index) => {
        return question.reponses
          .map((reponse) => `${reponse.question},${reponse.reponse}`)
          .join("\n");
      })
      .join("\n");

    // Utilisez csv-express pour envoyer les données au format CSV
    res.send(csvData);
  } catch (error) {
    console.error("Erreur lors de la récupération des questions et réponses :", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des questions et réponses",
    });
  }
});

// ...

// Route pour obtenir toutes les questions et réponses au format PDF
app.get("/api/questions-reponses/pdf", async (req, res) => {
  try {
    const questionsReponses = await Reponse.find();

    // Créez un nouveau document PDF
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(res);

    // Ajoutez le contenu du PDF à partir des questions et réponses
    questionsReponses.forEach((question, index) => {
      const sondageNumber = index + 1;
      pdfDoc.font("Helvetica-Bold").fontSize(12).text(`Enquete numéro ${sondageNumber}:`);

      // Affichez toutes les réponses associées à chaque question
      question.reponses.forEach((reponse, subIndex) => {
        pdfDoc.font("Helvetica").fontSize(10).text(`  - ${reponse.question}: ${reponse.reponse}`);
      });

      pdfDoc.moveDown();
    });

    // Finalisez le PDF et envoyez-le en réponse
    pdfDoc.end();

    // Définissez les en-têtes pour le format PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=questions-reponses.pdf"
    );
  } catch (error) {
    console.error("Erreur lors de la génération du PDF :", error);
    res.status(500).json({
      error: "Erreur lors de la génération du PDF",
    });
  }
});

app.get('/api/questions-reponses/json', async (req, res) => {
  try {
    const questionsReponses = await Reponse.find();

    // Définissez les en-têtes pour le format JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=questions-reponses.json'
    );

    // Envoyez les données au format JSON
    res.send(JSON.stringify(questionsReponses, null, 2));
  } catch (error) {
    console.error('Erreur lors de la récupération des questions et réponses :', error);
    res.status(500).json({
      error: 'Erreur lors de la récupération des questions et réponses',
    });
  }
});

// ...
app.get("/api/questions-reponses/xml", async (req, res) => {
  try {
    const questionsReponses = await Reponse.find();

    // Utilisez xmlbuilder pour générer le XML
    const xml = xmlbuilder.create("questionsReponses");

    questionsReponses.forEach((question, index) => {
      const sondageNumber = index + 1;
      const enquete = xml.ele("enquete", { numero: sondageNumber });

      question.reponses.forEach((reponse, subIndex) => {
        enquete.ele("reponse", { question: reponse.question }, reponse.reponse);
      });
    });

    // Envoyez le XML en réponse
    res.set("Content-Type", "application/xml");
    res.send(xml.end({ pretty: true }));
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des questions et réponses :",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des questions et réponses",
    });
  }
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

// get contact
app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({ contacts });
  } catch (error) {
    console.error("Erreur lors de la récupération des contacts :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des contacts" });
  }
});


// Modele big Form
const ReponseSchema = new mongoose.Schema({
  reponses: [{ question: String, reponse: String }],
});

const Reponse = mongoose.model("Reponse", ReponseSchema);

// Route POST pour les réponses aux questions
app.post("/api/reponse", async (req, res) => {
  try {
    const { reponses } = req.body;

    const newReponse = new Reponse({
      reponses,
    });

    // Ajoutez la nouvelle réponse à la collection Reponse
    const savedReponse = await newReponse.save();

    res.json({
      message: "Réponses enregistrées avec succès",
      reponse: savedReponse,
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des réponses :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement des réponses" });
  }
});
