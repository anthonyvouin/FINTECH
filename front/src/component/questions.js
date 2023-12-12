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
                  { questionId: props.question.questions.q1, reponse:q1 },
                  { questionId: props.question.questions.q2, reponse:q2 }
                ]}
            );
            alert("merci pour vos réponses");

            setQ1("");
            setQ2("");
        } catch (error) {
            alert("petit problème durant l'envoie de vos réponses");
        }
    }
    

    return (
    <div className={`grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 gap-2 xl:gap-0 lg:py-16 lg:grid-cols-12 ${
        props.question.id % 2 !== 0 ? " lg:flex-row-reverse lg:flex-wrap" : ""
        }`}>

        <div className={`mr-auto w-full place-self-center lg:col-span-6 ${
        props.question.id % 2 !== 0 ? " order-2" : ""
        }`}>
            <img src={ props.question.image } alt="" className="portfolio__img"/>
        </div>  

        <div className={`mr-auto w-full place-self-center lg:col-span-6 ${
        props.question.id % 2 !== 0 ? " order-1" : ""
        }`}>
            <h1 className="max-w-2xl mb-4 text-xl font-extrabold leading-none ">{ props.question.title }</h1>
            <form action="#" className="" onSubmit={handleSubmit}>
                <div class="">
                    <div className="mb-5">
                        <label for="q1" class="block mb-2 text-sm font-medium text-gray-900">{ props.question.questions.q1 }</label>
                        <input type="text" id="q1" placeholder="Reponse" onChange={handleChangeQ1} required value={q1}
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <label for="q2" class="block mb-2 text-sm font-medium text-gray-900">{ props.question.questions.q2 }</label>
                        <input type="text" id="q2" placeholder="Reponse" onChange={handleChangeQ2} required value={q2}
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        />
                    </div>
                </div>

                <button type="submit"
                        class="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Envoyer
                </button>
            </form>
        </div>              
    </div>
    )
}

export default Questions;