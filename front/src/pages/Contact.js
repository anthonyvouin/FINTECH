import { useState } from 'react';

export default function Contact() {

  function sendContactForm(nom, prenom, email, message) {
    return fetch(`http://localhost:3000/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: nom,
          prenom: prenom,
          email: email,
          message: message,
       })
    }).then(data => data.json())
  }
  
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');

  
  const handleChangeNom = (e) => {
    setNom(e.target.value);
  }
  const handleChangePrenom = (e) => {
    setPrenom(e.target.value);
  }
  const handleChangeMail = (e) => {
    setMail(e.target.value);
  }
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      sendContactForm(nom, prenom, mail, message);
      alert("bravo c'est envoyé");

      setNom("");
      setPrenom("");
      setMail("");
      setMessage("");
    } catch (error) {
      alert("problème durant l'envoi du formulaire");
    }

  }

  return (
    <section class="bg-white">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          Contacter Nous
        </h2>
        <form action="#" class="space-y-8" onSubmit={handleSubmit}>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="nom"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Nom
              </label>
              <input
                type="text"
                id="nom"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Nom"
                required
                onChange={handleChangeNom}
                value={nom}
              />
            </div>
            <div>
              <label
                for="prenom"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Prenom
              </label>
              <input
                type="text"
                id="prenom"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Prenom"
                required
                onChange={handleChangePrenom}
                value={prenom}
              />
            </div>
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="name@flowbite.com"
              required
              onChange={handleChangeMail}
              value={mail}
            />
          </div>
          <div class="sm:col-span-2">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="6"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Laisser nous un commentaire..."
              onChange={handleChangeMessage}
              value={message}
            ></textarea>
          </div>
          <button
            type="submit"
            class="py-3 px-5 text-sm font-medium text-center text-gray-900 rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}