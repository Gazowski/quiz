export class FenetreMessage{

    /** 
     * class FenetreMessage : creer et affiche une fenetre de message
     * @param {Text} texte - texte du message
     * @param {HTMLElement} parent - Parent de l'objet    
     * @param {Text} classCSS - classe css a appliqué au message
     * @param {Text} classeAnimation - animation CSS a appliqué au message
     * @param {Text} texteBouton - texte du bouton
     * @param {function} fonction - fonction associé au bouton    
     */

    constructor(texte,parent,classeCSS,classeAnimation = '',texteBouton = '',fonction=''){
        this.texte = texte
        this.parent = parent
        this.classeCSS = classeCSS
        this.classeAnimation = classeAnimation
        this.texteBouton = texteBouton
        this.fonction = fonction

        this.requeteAjouterMotifId = 0
    }

    creerFenetre = () => {
        // création des éléments
        this.conteneurFenetre = document.createElement('div')
        this.fenetre = document.createElement('div')
        this.paragraphe = document.createElement('p')
        this.bouton = document.createElement('button')

        // ajout du texte
        this.paragraphe.innerHTML = this.texte
        if (this.texteBouton == '')
            this.bouton.innerHTML = 'ok'
        else
            this.bouton.innerHTML = `${this.texteBouton}`

        // ajout des classes
        this.conteneurFenetre.classList.add('conteneur_fenetre_message')
        this.fenetre.classList.add(this.classeCSS)
        if(this.classeAnimation != '')
        this.fenetre.classList.add(this.classeAnimation)
        this.bouton.classList.add('bouton')
    
        // ajout des éléments enfant dans leur conteneur
        this.fenetre.appendChild(this.paragraphe)
        this.fenetre.appendChild(this.bouton)
        this.conteneurFenetre.appendChild(this.fenetre)
        this.parent.appendChild(this.conteneurFenetre)

        // ajout des événements
        this.bouton.addEventListener('mousedown',(evt) => this.fermerFenetre(evt),false)

        // ajout d'un délai de l'animation
        //setTimeout(this.animFenetreIntro,200)
    }

    animFenetreIntro = () =>{

        this.requeteAjouterMotifId = window.requestAnimationFrame(this.ajouterMotif)
    }

    ajouterMotif = () =>{
        let iteration = Math.floor(Math.random()*10)+100;

        if(this.requeteAjouterMotifId < iteration){
            let nouveauMotif = document.createElement("div")
            let conteneurNouveauMotif = document.createElement('div')
            nouveauMotif.classList.add('motif_intro')
            conteneurNouveauMotif.classList.add('conteneur_motif_intro')
            conteneurNouveauMotif.appendChild(nouveauMotif)
            this.miseEnFormeMotif(conteneurNouveauMotif)
            this.paragraphe.appendChild(conteneurNouveauMotif)

            this.requeteAjouterMotifId = window.requestAnimationFrame(this.ajouterMotif)
        }
    } 
            
    miseEnFormeMotif = (elt) =>{
        const posX = Math.floor(Math.random()*120); 
        const posY = Math.floor(Math.random()*70);
        const taille = (Math.floor(Math.random()*45)+2)/10;
        const rotation = Math.floor(Math.random()*360);
        const opacite = (Math.random()*.5)+.2;
        elt.style.left = `${posX}%`
        elt.style.top = ` ${posY}%`
        elt.style.transform = `translate(-120%,-35%) rotate(${rotation}deg)`;
        elt.style.fontSize = `${taille}rem`;
        elt.style.opacity = opacite;
    }
  
	fermerFenetre = (evt) => {

        //Enlever l'écouteur sur l'élément HTML
        this.bouton.removeEventListener("mousedown", (evt) => this.fermerFenetre(evt), false);
        
        // on annule l'animation 'ajouterMotif'
        window.cancelAnimationFrame(this.requeteAjouterMotifId)

		//Enlever la fenetre
		this.parent.removeChild(this.conteneurFenetre)

		//Appeler la fonction passée en paramètre
		this.fonction();

        //Enlever les références
        this.conteneurFenetre = null
        this.fenetre = null
        this.paragraphe = null
        this.bouton = null
        this.parent = null
        this.fonction = null

		//Arrêter la propagation de l'événement???
		evt.stopPropagation();
	}
}