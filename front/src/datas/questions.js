import Profil_utilisateur from '../media/Profil_utilisateur.png';
import Ergonomie from '../media/Ergonomie.png';
import Graphiques_analyses_techniques from '../media/Graphiques_analyses_techniques.png';
import Accessibilité from '../media/Accessibilité.png';
import Actualités_financières from '../media/Actualités_financières.png';
import Communaute_Trading from '../media/Communaute_Trading.png';
import Navigation from '../media/Navigation.png';


export const questions = [
  {
    id:0, 
    image: Profil_utilisateur, 
    title: "Profil utilisateur", 
    questions: {
        q1: "Combien de temps seriez vous prêt à accorder par jour au trading ?",
        q2: "À quelle fréquence consultez-vous le tableau de bord de votre site de trading ? (tous les jours, parfois, jamais)"
    }
  },
  {
    id:1, 
    image: Ergonomie, 
    title: "Ergonomie", 
    questions: {
        q1: "référez-vous des représentations visuelles simples ou des analyses plus détaillées sur le tableau de bord ?",
        q2: "Avez-vous des préférences en termes de disposition des informations sur l'écran ?"
    }
  },
  {
    id:2, 
    image: Ergonomie, 
    title: "Ergonomie", 
    questions: {
        q1: "Dans quelle mesure la possibilité de consulter l'historique de vos transactions est-elle importante pour vous ?",
        q2: "Est il pertinent que les informations soient de tailles différentes plutôt qu’uniforme afin de s’implifier la lecture des informations ?"
    }
  },
  {
    id:3, 
    image: Graphiques_analyses_techniques, 
    title: "Graphiques et analyses techniques", 
    questions: {
        q1: "Quelles informations trouvez-vous les plus utiles sur le tableau de bord ?",
        q2: "Trouvez-vous utile la possibilité de comparer rapidement différents actifs financiers sur le tableau de bord ?"
    }
  },
  {
    id:4, 
    image: Actualités_financières, 
    title: "Graphiques et analyses techniques", 
    questions: {
        q1: "Préférez-vous des graphiques, des rapports textuels ou une combinaison des deux ?",
        q2: "Seriez-vous intéressé par des outils interactifs sur le tableau de bord permettant d'explorer et d'analyser des données historiques pour prendre des décisions plus éclairées ?"
    }
  },
  {
    id:5, 
    image: Accessibilité, 
    title: "Accessibilité", 
    questions: {
        q1: "Pouvez vous citez les couleurs qui s’affichent sur l’image ?",
        q2: "Y a-t-il des fonctionnalités spécifiques que vous aimeriez pouvoir ajuster selon vos préférences ? Notamment au niveau des couleurs utilisées pour la conception d’un tableau de bord ?"
    }
  },
  {
    id:6, 
    image: Actualités_financières, 
    title: "Actualités financières", 
    questions: {
        q1: "Trouveriez vous utile un bandeau d’informations lié à l’actualité financière ?",
        q2: "Préféreriez-vous recevoir des alertes interactives sur votre tableau de bord pour vous informer des opportunités de trading ou des changements importants sur le marché ?"
    }
  },
  {
    id:7, 
    image: Communaute_Trading, 
    title: "Communauté Trading", 
    questions: {
        q1: "Apprécieriez-vous un chat en direct directement intégré sur votre tableau de bord pour discuter avec d'autres traders ou obtenir une assistance instantanée?",
        q2: "Avez-vous l'habitude de suivre d'autres traders sur la plateforme?"
    }
  },
  {
    id:8, 
    image: Navigation, 
    title: "Navigation", 
    questions: {
        q1: "Seriez-vous intéressé par des guides visuels ou des tutoriels intégrés pour vous aider à comprendre les fonctionnalités du tableau de bord ?",
        q2: "Trouvez-vous utile la possibilité de comparer rapidement différents actifs financiers sur le tableau de bord?"
    }
  }
];