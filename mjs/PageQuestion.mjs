import { FaceCarte } from "./FaceCarte.mjs"
import { VersoCarte } from "./VersoCarte.mjs"
import { Consigne } from "./Consigne.mjs"
import { FenetreMessage } from "./FenetreMessage.mjs"
import { Compteur } from "./Compteur.mjs"
import { monQuizz } from "./monQuizz.mjs"
import { AnimBouton } from "./AnimBouton.mjs"

export class PageQuestion{

    /**
	 * Classe permettant de créer les questions et afficher les réponses
	 * @param {HTMLelement} parent - élément qui contient l'objet
	 * @param {Array} listeQuestions  - liste des questions 
	 */

    constructor(parent,listeQuestions){
        this.parent = parent
        this.monQuiz = listeQuestions

        localStorage.meilleurScore = 0
        localStorage.meilleurTemps = 100000 //initialiser a grand nombre (le meilleur temps est proche de zéro)
    }

    initialiserJeu = () =>{
        this.index = 0
        this.point = 0
        this.tempsReponse = 0
        this.numeroQuestion = 1
        this.dureeCompteur = 5

        this.creerPageQuestion()
    }

    creerPageQuestion = () => {
        this.pageQuestion = document.querySelector('.page_question')
        // la largeur de pageQuestion doit être doublé après la 1e question (pour l'effet de slide)
        if(this.numeroQuestion > 1)
           this.pageQuestion.style.width = `${100*this.numeroQuestion}vw`
        // ajout d'un conteneur pour le quizz
        this.conteneurQuestion = document.createElement('div')
        this.conteneurQuestion.classList.add('conteneur_question')
        this.pageQuestion.appendChild(this.conteneurQuestion)


        /*  CRÉATION DE LA CARTE QUIZZ   */
        
        // conteneur de la carte
        this.conteneurCarte = document.createElement('section')
        this.carteFlip = document.createElement('div')
        // ajout des classes
        this.conteneurCarte.classList.add('carte_superheros')
        this.carteFlip.classList.add('carte_flip')

        // création des éléments de la carte Quizz
        this.FaceCarteQuizz = new FaceCarte(
                                        this.monQuiz.listeQuestions[this.index].personnage,
                                        this.carteFlip)
        this.VersoCarteQuizz = new VersoCarte(
                                        this.monQuiz.listeQuestions[this.index],
                                        this.carteFlip,
                                        this.verifierReponseQuestion,
                                        this.dureeCompteur)

        // affichage en-tête page question

        this.ConsigneQuestion = new Consigne(   
                                        this.numeroQuestion, 
                                        this.conteneurQuestion,
                                        this.monQuiz.listeQuestions[this.index].question,
                                        this.dureeCompteur+1)

        this.CompteurQuestion = new Compteur(
                                        this.dureeCompteur,
                                        this.FaceCarteQuizz.retourneCarte.bind(this.FaceCarteQuizz.faceImage),
                                        'compteur_question',
                                        this.ConsigneQuestion.conteneur)

        // ajout des éléments dans la page
        this.conteneurCarte.appendChild(this.carteFlip)
        this.conteneurQuestion.appendChild(this.conteneurCarte)      
       
    }

    verifierReponseQuestion = (evt) =>{
        //suppression des écouteurs d'événements
        for(let bouton of this.VersoCarteQuizz.formulaireReponses.childNodes){
            bouton.removeEventListener('mousedown',this.verifierReponseQuestion)
        }

        // incrément des index
        this.index++
        this.numeroQuestion++

        // évaluation de la réponse et incrémentation des points si réussite
        this.succes = this.VersoCarteQuizz.evaluerReponse(evt.target)
        if(this.succes){
            this.texteMessage = monQuizz.message[0]
            this.point += 1
        }
        else{
            this.texteMessage = monQuizz.message[1]
        }
        // affichage message de réussite
        this.leMessage = new AnimBouton(
                                evt.target,
                                this.texteMessage,
                                this.afficherProchaineQuestion)
        this.tempsReponse += this.CompteurQuestion.calculTempsReponse();
    }

    afficherProchaineQuestion = (evt) =>{
        // on verifie qu'il ne reste plus de questions
        if(this.index < this.monQuiz.listeQuestions.length){
            this.creerPageQuestion()
            this.pageQuestion.style.transform = `translateX(-${this.conteneurQuestion.offsetWidth*(this.numeroQuestion-1)}px)`
        }
        else{
            // suppression des éléments de la page question
            while(this.pageQuestion.hasChildNodes())
                this.pageQuestion.removeChild(this.pageQuestion.lastChild)
            // redimensionnement de la page question
            this.pageQuestion.style.width = "100vw"
            this.pageQuestion.style.transform = `translateX(+${this.conteneurQuestion.offsetWidth}px)`
            this.afficherFenetreScore()  
        }          
    }

    afficherFenetreScore = () =>{
        // création du texte de la fenetre score
        this.conteneurScore = document.createElement('div')
        this.score = document.createElement('div')
        this.conteneurMeilleurScore = document.createElement('div')
        this.temps = document.createElement('div')
        this.score.innerHTML = `Score : <span>${this.point}/${this.monQuiz.listeQuestions.length}</span>`
        this.temps.innerHTML = `Temps de Réponse: <span>${this.tempsReponse.toFixed(2)} s.</span>` // this.tempsReponse.toFixed(2) => arrondis le résultat à 2 chiffres après la virgule
        // enregistrement du meilleur résultat avec le meilleur temps
        if(this.point >= localStorage.meilleurScore){
            localStorage.meilleurScore = this.point
            if(this.tempsReponse < localStorage.meilleurTemps)
                localStorage.meilleurTemps = this.tempsReponse.toFixed(2)
        }
        this.conteneurMeilleurScore.innerHTML = `Meilleur Score: <span>${localStorage.meilleurScore}/${this.monQuiz.listeQuestions.length} en ${localStorage.meilleurTemps} s.</span> `

        this.conteneurScore.appendChild(this.score)
        this.conteneurScore.appendChild(this.temps)
        this.conteneurScore.appendChild(this.conteneurMeilleurScore)

        // conversion de conteneurScore en string pour être lu par la classe FenetreMessage
        this.conteneurScore = this.conteneurScore.outerHTML
        
        // affichage de la fenetre score
        this.FenetreScore = new FenetreMessage(
                                            this.conteneurScore,
                                            this.pageQuestion,
                                            'fenetre_score',
                                            'anim_score',
                                            'Rejouer',
                                            this.initialiserJeu)
        
        this.FenetreScore.creerFenetre()
    }

}