import { useState } from 'react';

export default function Login() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  function sendLoginForm(username, password) {
    return fetch(`http://localhost:3000/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
       })
    }).then(data => {
      data.json();
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
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
      alert("bravo c'est envoyé");

      setMail("");
      setPassword("");
    } catch (error) {
      alert("problème durant l'envoi du formulaire");
    }

  }

  return (
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Connecter vous
                </h1>
                <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="text" name="email" id="email" onChange={handleChangeMail} value={mail} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" name="password" id="password" onChange={handleChangePassword} value={password} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
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