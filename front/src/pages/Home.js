import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";

import Questions from '../component/questions';
import { questions } from '../datas/questions';


export default function Home() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>
      
    <section className="py-24 flex items-center min-h-screen justify-center bg-white">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-indigo-600/95">Semaine FINTECH - Projet n°3</p>
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] text-black">Tableau de bord du trader</h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-400">Pour rendre le trading plus accessible à un large public, nous avons repensé l'interface visuelle d'un tableau de bord en nous appuyant sur les retours des utilisateurs recueillis via notre formulaire de contact. L'objectif est de simplifier l'accès aux marchés financiers pour le plus grand nombre.</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50"
                  onClick={handleClick}>
            Repondre aux questions
          </button>
          <Link to="/contact" className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50">
            Donner nous un feeadback
          </Link>
        </div>
      </div>
    </section>

    <section ref={ref} className="bg-white">
      <h1 className="my-3 text-[2rem] font-bold text-black text-center">Tableau de bord du trader</h1>
      {
        questions.map((question, index) => (
          <Questions key={index} question={question}></Questions>
        ))
      }
    </section>
    </>
  )
}