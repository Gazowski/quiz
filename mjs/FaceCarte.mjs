export class FaceCarte{

    /** 
     * class FaceCarte : creer et affiche le coté Face de la carte question
     * @param {Text} personnage - nom du personnage à afficher 
     * @param {HTMLElement} Parent - Parent de l'objet        
     */

     constructor(personnage,parent){
         this.personnage = personnage
         this.parent = parent

         this.lien = `img/${this.personnage}.svg`
         this.textAlt = `${this.personnage} enfant`
 
         this.faceImage = document.createElement('figure')
         this.image = document.createElement('img')
         this.legende = document.createElement('figcaption')
         this.creditImage = document.createElement('a')
 
         this.faceImage.classList.add('face_image')
         this.image.src = this.lien
         this.creditImage.href = "https://fr.freepik.com/photos-vecteurs-libre/enfants"
         this.creditImage.innerHTML = "SuperHeros créé par freepik - fr.freepik.com"

         this.creerFaceCarte();
     }

     creerFaceCarte(){

        this.legende.appendChild(this.creditImage)
        this.faceImage.appendChild(this.image)
        this.faceImage.appendChild(this.legende)
        this.parent.appendChild(this.faceImage)
     }

     retourneCarte(evt){
        this.classList.toggle('retourne_carte')
        this.nextElementSibling.classList.toggle('retourne_question')
    }
 }