import { useState } from 'react';

export default function Login() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  function sendLoginForm(username, password) {
    return fetch(`http://localhost:3000/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
       })
    }).then(data => {
      console.log(data);

      if(data.ok) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("user_connect", true); 
        window.location.href = "http://localhost:3001/admin";       
      }
    })
  }

  const handleChangeMail = (e) => {
    setMail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      sendLoginForm(mail, password);

      setMail("");
      setPassword("");
    } catch (error) {
      alert("problème durant l'envoi du formulaire");
    }

  }

  return (
  <section className="bg-gray-50">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Connectez-vous
                </h1>
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Votre identifiant</label>
                        <input type="text" name="email" id="email" onChange={handleChangeMail} value={mail} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Votre mot de passe</label>
                        <input type="password" name="password" id="password" onChange={handleChangePassword} value={password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                    </div>
                  <button
                    type="submit"
                    className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Envoyer
                  </button>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}