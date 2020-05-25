export class Compteur{

    /** 
     * class Compteur : creer et affiche un compteur en secondes
     * @param {Number} temps - temps en secondes a partir le décompte commence
     * @param {function} action - action associer à la fin du decompte
     * @param {class} classe - class du compteur         
     */

    constructor(temps,action,classe,parent){
        this.temps = temps
        this.action = action
        this.classe = classe
        this.parent = parent

        this.creerCompteur()
    }

    creerCompteur = () =>{
        this.afficherCompteur()
        this.compteur = setInterval(this.decompter,1000)
    }

    afficherCompteur = () =>{
        this.conteneurCompteur = document.createElement('div')
        this.conteneurCompteur.classList.add(this.classe)
        this.conteneurCompteur.innerHTML = this.temps
        this.parent.appendChild(this.conteneurCompteur)
    }

    decompter = () =>{
        if(this.temps > 0){
            this.temps--
            //suppression puis reaffichage du compteur pour appliquer l'animation css a chaque apparition du chiffre
            this.conteneurCompteur.remove()
            this.afficherCompteur()
        }
        else{
            clearInterval(this.compteur)
            this.conteneurCompteur.parentNode.removeChild(this.conteneurCompteur)
            this.action()
            // mesurer le temps de réponse
            this.debut = Date.now()
        }            
    }

    calculTempsReponse = () =>{
        this.fin = Date.now()
        this.tempsReponse = (this.fin - this.debut)/1000
        this.tempsReponse = this.tempsReponse.toFixed(2) // arrondissement a 2 chiffres aprè la virgule
        return parseFloat(this.tempsReponse)
    }


}