/* fichier JSON (objet literal) contenant les questions et les réponses pour chaque personnage */ 

export const monQuizz = {
    listeQuestions : [
    {
        personnage:"batman",
        question:"Quelle réponse est fausse ?",
        reponses:{
            reponseFausse:"les oreilles de Batman sont cachées",
            reponseVrai1:"il y a 3 chauve-souris sur l'image",
            reponseVrai2:"Batman porte une ceinture jaune",
            reponseVrai3:"la chauve souris de gauche est la plus grande"
        }
    },
    {
        personnage:"wonderwoman",
        question:"Quelle réponse est fausse ?",
        reponses:{
            reponseFausse:"Wonderwoman ne porte pas un chandail à manches longues",
            reponseVrai1:"Les gants sont de la même couleur que l'extérieur de la cape",
            reponseVrai2:"La robe a 3 teintes de bleus différentes",
            reponseVrai3:"La boucle de ceinture n'est pas de la même couleur que la cape"
        }
    },
    {
        personnage:"superman",
        question:"Quelle réponse est fausse ?",
        reponses:{
            reponseFausse:"Superman ne porte pas un A sur fond rouge sur son torse",
            reponseVrai1:"On voit 5 doigts sur la main droite de Superman",
            reponseVrai2:"Superman a des chaussettes jaunes dans des souliers rouges",
            reponseVrai3:"La cape de Superman n'a pas de col rouge"
        }
    },
    {
        personnage:"catwoman",
        question:"Quelle réponse est fausse ?",
        reponses:{
            reponseFausse:"La couleur du noeud dans les tresses est mauve",
            reponseVrai1:"Les gants de Catwoman sont de la même couleur que les gants de Wonderwoman",
            reponseVrai2:"Le bout de la queue de Catwoman n'est pas caché derrière la cape",
            reponseVrai3:"Le foulard de Catwoman est nouée sur la gauche"
        }
    },
    {
        personnage:"wolverine",
        question:"Quelle réponse est fausse ?",
        reponses:{
            reponseFausse:"Les 3 griffes de la main droite sont de la même taille que les griffes de la main gauche",
            reponseVrai1:"La ceinture rouge de Wolverine n'a pas de boucle bleue foncée",
            reponseVrai2:"Le col de la combinaison jaune de Wolverine est bleu",
            reponseVrai3:"On ne voit pas la cape de Wolverine"
        }
    },
    ],
    message : ['BRAVO !','OH NON...']
}
