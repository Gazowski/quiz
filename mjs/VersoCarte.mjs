import { shuffleObjet } from "./melangerTableau.mjs"

export class VersoCarte{

    /** 
     * class FaceMessage : creer et affiche une fenetre de message
     * @param {Array} questionReponses - tableau contenant les reponses (et la question (non utilisé))
     * @param {HTMLElement} conteneurParent - Parent de l'objet    
     * @param {function} fonction - fonction associé à l'objet    
     * @param {integer} compteur - durée avant retournement de la carte    
     */

    constructor(questionReponses,conteneurParent,fonction,compteur){
        this.questionReponses = questionReponses
        this.conteneurParent = conteneurParent
        this.fonction = fonction
        this.compteur = compteur
        
        this.creerVersoCarte()
    }

    creerVersoCarte(){
        // creation des éléments
        this.faceReponses = document.createElement('div')
        this.formulaireReponses = document.createElement('div')
        
        // creation des reponses qui seront afficher dans un ordre aléatoire
        this.tableauReponses = this.questionReponses.reponses
        this.tableauReponses = shuffleObjet(this.tableauReponses) // mélange de l'ordre des réponses
        let index = 0
        for(const reponse in this.tableauReponses){
            this.caseReponse = document.createElement('div')
            this.caseReponse.classList.add("bouton_reponse")
            // ajout d'une animation sur les réponses avec un délai
            let delai = index + this.compteur + 1 // on attend le retournement de la carte (compteur) pour appliquer l'animation
            index++
            this.caseReponse.style.animation = `animCaseReponse 5s linear ${delai}s both`
            const texteChoix = document.createTextNode(this.tableauReponses[reponse])
            // ajout d'un dataset qui prend la valeur 'reponseFausse' ou 'reponseVrai'
            this.caseReponse.dataset.reponse = reponse
            this.caseReponse.appendChild(texteChoix)
            this.formulaireReponses.appendChild(this.caseReponse)
            // ajout d'écouteur d'événement sur les réponses
            this.caseReponse.addEventListener('mousedown',this.fonction)
                  
        }

        //ajout des classes et des attributs
        this.faceReponses.classList.add('face_reponses')

        //ajout des éléments enfants dans leur conteneur
        this.faceReponses.appendChild(this.formulaireReponses)
        this.conteneurParent.appendChild(this.faceReponses)

    }

    evaluerReponse = (question) =>{
        
        if(question.dataset.reponse == "reponseFausse"){
            return true
        }
        else{
            return false
        }
    }
}