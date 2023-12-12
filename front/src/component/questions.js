import React, { useState } from 'react';

const Questions = (props) => {
    function sendQuestionForm(questions) {
        return fetch(`http://localhost:3000/api/reponse`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(questions)
        }).then(data => data.json())
    }

    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');

    const handleChangeQ1 = (e) => {
        setQ1(e.target.value);
    }
    const handleChangeQ2 = (e) => {
        setQ2(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            sendQuestionForm({
                "reponses": [
                  { question: props.question.questions.q1, reponse:q1 },
                  { question: props.question.questions.q2, reponse:q2 }
                ]}
            );

            document.querySelector("#question_"+props.question.id).innerHTML = returnResponse();
            localStorage.setItem("#question_"+props.question.id, true)
        } catch (error) {
            alert("petit problème durant l'envoie de vos réponses");
        }
    }

    function returnResponse() {
        return `
            <h1 class="max-w-2xl mb-4 text-xl font-extrabold leading-none ">${props.question.title}</h1>
            <div>
                <div>
                    Vos réponses sont bien été envoyé
                </div>
                <span>✔</span>
            </div>
        `;
    }

    return (
        <div className={`grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 gap-2 xl:gap-0 lg:py-16 lg:grid-cols-12 ${props.question.id % 2 !== 0 ? "lg:flex-row-reverse lg:flex-wrap" : ""}`}>
          <div className={`mr-auto w-full place-self-center lg:col-span-6 ${props.question.id % 2 !== 0 ? "lg:order-2" : ""}`}>
            <img src={props.question.image} alt="" className="portfolio__img" />
          </div>
          <div id={"question_" + props.question.id} className={`lg:px-4 mr-auto w-full place-self-center lg:col-span-6 ${props.question.id % 2 !== 0 ? "lg:order-1" : ""}`}>
            <h1 className="max-w-2xl mb-4 text-xl font-extrabold leading-none ">{props.question.title}</h1>
            {localStorage.getItem("#question_" + props.question.id) !== "true" ? (
              <form action="#" className="" onSubmit={handleSubmit}>
                <div className="">
                  <div className="mb-5">
                    <label htmlFor="q1" className="block mb-2 text-sm font-medium text-gray-900">{props.question.questions.q1}</label>
                    <input
                      type="text"
                      id="q1"
                      placeholder="Reponse"
                      onChange={handleChangeQ1}
                      required
                      value={q1}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="q2" className="block mb-2 text-sm font-medium text-gray-900">{props.question.questions.q2}</label>
                    <input
                      type="text"
                      id="q2"
                      placeholder="Reponse"
                      onChange={handleChangeQ2}
                      required
                      value={q2}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    />
                  </div>
                </div>
      
                <button
                  type="submit"
                  className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Envoyer
                </button>
              </form>
            ) : (
              <div>
                Vos réponses ont bien été envoyées <span>✔</span>
              </div>
            )}
          </div>
        </div>
      );      
}

export default Questions;