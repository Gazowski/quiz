export class Consigne{

    /** 
     * class Consigne : creer et affiche des informations
     * @param {Number} numeroQuestion - numéro de la question à afficher
     * @param {HTMLElement} conteneurParent - Parent de l'objet
     * @param {Text} question - question à afficher         
     * @param {Number} duree - duree d'affichage de la question         
     */

    constructor(numeroQuestion,conteneurParent,question,duree){
        this.numeroQuestion = numeroQuestion
        this.conteneurParent = conteneurParent
        this.question = question
        this.duree = duree
        
        this.conteneur = document.createElement('div')
        this.explication1 = document.createElement('p')
        this.explication2 = document.createElement('p')
        this.creerConsigne()
    }

    creerConsigne(){
        // création des éléments
        const titre = document.createElement('h3')

        // ajout des classes
        this.conteneur.classList.add('consigne')

        // ajout du contenu dans les éléments
        titre.innerHTML = 'Question ' + this.numeroQuestion + ':'
        this.explication1.innerHTML = 'Regarde bien la carte...'
        this.explication2.innerHTML = this.question
        console.log(this.question)
               
        // ajout des éléments enfants dans le conteneur
        this.conteneur.appendChild(titre)
        this.conteneur.appendChild(this.explication1)

        // ajout des éléments sur la page
        this.conteneurParent.appendChild(this.conteneur)
        this.tempo = setTimeout(this.afficheQuestion,this.duree*1000)
    }

    afficheQuestion = () =>{
        clearTimeout(this.tempo)
        this.conteneur.removeChild(this.explication1)
        this.conteneur.appendChild(this.explication2)      
    }

 }

