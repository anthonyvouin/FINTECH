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
            <div class="grid gap-4 text-center">
              <svg width="50" height="50" viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-max grid gap-4 m-auto">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M57 113.25C64.3869 113.25 71.7014 111.795 78.5259 108.968C85.3505 106.141 91.5515 101.998 96.7748 96.7748C101.998 91.5515 106.141 85.3505 108.968 78.5259C111.795 71.7014 113.25 64.3869 113.25 57C113.25 49.6131 111.795 42.2986 108.968 35.4741C106.141 28.6495 101.998 22.4485 96.7748 17.2252C91.5515 12.0019 85.3505 7.8586 78.5259 5.03178C71.7014 2.20495 64.3869 0.75 57 0.75C42.0816 0.75 27.7742 6.67632 17.2252 17.2252C6.67632 27.7742 0.75 42.0816 0.75 57C0.75 71.9184 6.67632 86.2258 17.2252 96.7748C27.7742 107.324 42.0816 113.25 57 113.25ZM55.55 79.75L86.8 42.25L77.2 34.25L50.325 66.4938L36.4187 52.5813L27.5813 61.4187L46.3313 80.1687L51.1688 85.0063L55.55 79.75Z" fill="black"/>
              </svg>
              <p>Vos réponses ont bien été envoyées </p>
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
              <div className="grid gap-4 text-center">
                <svg width="50" height="50" viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-max grid gap-4 m-auto">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M57 113.25C64.3869 113.25 71.7014 111.795 78.5259 108.968C85.3505 106.141 91.5515 101.998 96.7748 96.7748C101.998 91.5515 106.141 85.3505 108.968 78.5259C111.795 71.7014 113.25 64.3869 113.25 57C113.25 49.6131 111.795 42.2986 108.968 35.4741C106.141 28.6495 101.998 22.4485 96.7748 17.2252C91.5515 12.0019 85.3505 7.8586 78.5259 5.03178C71.7014 2.20495 64.3869 0.75 57 0.75C42.0816 0.75 27.7742 6.67632 17.2252 17.2252C6.67632 27.7742 0.75 42.0816 0.75 57C0.75 71.9184 6.67632 86.2258 17.2252 96.7748C27.7742 107.324 42.0816 113.25 57 113.25ZM55.55 79.75L86.8 42.25L77.2 34.25L50.325 66.4938L36.4187 52.5813L27.5813 61.4187L46.3313 80.1687L51.1688 85.0063L55.55 79.75Z" fill="black"/>
                </svg>
                <p>Vos réponses ont bien été envoyées </p>
              </div>
            )}
          </div>
        </div>
      );      
}

export default Questions;