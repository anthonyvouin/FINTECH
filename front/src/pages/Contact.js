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
    <section className="bg-white">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          Contactez-nous
        </h2>
        <form action="#" className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="nom"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nom
              </label>
              <input
                type="text"
                id="nom"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Nom"
                required
                onChange={handleChangeNom}
                value={nom}
              />
            </div>
            <div>
              <label
                htmlFor="prenom"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Prenom
              </label>
              <input
                type="text"
                id="prenom"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Prenom"
                required
                onChange={handleChangePrenom}
                value={prenom}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="name@flowbite.com"
              required
              onChange={handleChangeMail}
              value={mail}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Laisser nous un commentaire..."
              onChange={handleChangeMessage}
              value={message}
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}