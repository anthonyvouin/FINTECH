import React, { useRef } from 'react';
import { Link } from "react-router-dom";

import Questions from '../component/questions';
import QuestionsGraphique from '../component/questionsGraphique';
import { questions } from '../datas/questions';

import hero_image from "../media/office-workers-using-finance-graphs_23-2150408681.jpg"

export default function Home() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>
      
    <section className="py-24 flex items-center min-h-screen justify-center bg-white  w-full bg-center bg-cover "
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero_image})`
    }}>
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-slate-50">Semaine FINTECH - Projet n°3</p>
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] text-white">Tableau de bord du trader</h1>
          <p className="mt-3 text-lg text-slate-200">Pour rendre le trading plus accessible à un large public, nous avons repensé l'interface visuelle d'un tableau de bord en nous appuyant sur les retours des utilisateurs recueillis via notre formulaire de contact. L'objectif est de simplifier l'accès aux marchés financiers pour le plus grand nombre.</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-50 transition-colors hover:bg-slate-900"
                  onClick={handleClick}>
            Repondre aux questions
          </button>
          <Link to="/contact" className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-50 transition-colors hover:bg-slate-900">
            Donner nous un feeadback
          </Link>
        </div>
      </div>
    </section>

    <section ref={ref} className="bg-white py-16">
      <h1 className="my-3 text-[2rem] font-bold text-black text-center">Tableau de bord du trader</h1>
      {
      questions.map((question, index) =>
        question.type && question.type === "graphiques_game" ? (
          <QuestionsGraphique key={index} question={question} />
        ) : (
          <Questions key={index} question={question} />
        )
      )
      }
    </section>
    </>
  )
}