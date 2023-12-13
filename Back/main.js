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



// Middleware pour vérifier les identifiants de l'administrateur
const checkAdminCredentials = (req, res, next) => {
  const { username, password } = req.body;

  // Vérifier les identifiants (admin/admin dans cet exemple)
  if (username === "admin" && password === "admin") {
    req.isAdmin = true; // Ajouter une propriété isAdmin à la requête
    next(); // Identifiants corrects, continuer le traitement
  } else {
    res.status(401).json({ error: "Identifiants incorrects" });
  }
};

// Middleware pour vérifier si l'utilisateur est connecté
const checkUserAuthentication = (req, res, next) => {
  // Ajoutez ici la logique pour vérifier l'authentification de l'utilisateur
  // Vous pouvez utiliser des tokens JWT, des sessions, etc.
  // Pour cet exemple, vérifions simplement si l'utilisateur est connecté
  if (req.isAuthenticated) {
    next(); // L'utilisateur est connecté, continuer le traitement
  } else {
    res.status(401).json({ error: "Utilisateur non authentifié" });
  }
};

// Route pour la page d'administration
app.post("/admin", checkAdminCredentials, (req, res) => {
  // Logique de la page d'administration ici
  res.json({ message: "Bienvenue dans le tableau de bord admin" });
});

// Route pour afficher l'ensemble des questions et réponses (accessible aux administrateurs connectés)
app.get("/admin/api/questions-reponses", checkAdminCredentials, checkUserAuthentication, async (req, res) => {
  try {
    // Ajoutez ici la logique pour récupérer l'ensemble des questions et réponses depuis la base de données
    // Utilisez le modèle Reponse défini précédemment
    const questionsReponses = await Reponse.find();

    res.json({ questionsReponses });
  } catch (error) {
    console.error("Erreur lors de la récupération des questions et réponses :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des questions et réponses" });
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
