import React, { useState, useEffect } from "react";

export default function ContactInfo() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/contact");
        const data = await response.json();
        setContacts(data.contacts);
      } catch (error) {
        console.error("Erreur lors de la récupération des contacts :", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Contact Info</h1>

      {/* Afficher le contenu des contacts ici */}
      {contacts.map((contact, index) => (
        <div key={index} className="my-4 p-4 border border-gray-300 rounded">
          <p className="font-semibold">Nom: {contact.nom}</p>
          <p>Prénom: {contact.prenom}</p>
          <p>Email: {contact.email}</p>
          <p>Message: {contact.message}</p>
        </div>
      ))}
    </div>
  );
}
