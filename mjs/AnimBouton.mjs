//----------On utilise un mode de programmation strict
export class AnimBouton {

	/**
	 * Classe permettant de créer et d'animer des éléments textuels
	 * @param {HTMLelement} bouton - élément à animer
	 * @param {String} mot  - texte a afficher
     * @param {fonction} fonction - fonction a exécuter
	 */

	constructor(bouton,mot,fonction) {
		//Récupérer les valeurs passées en paramètre			
        this.bouton = bouton
		this.mot = mot;
        this.fonction = fonction

		//Autres propriétés du mot animé
        this.taille = 1;
        this.opacite = 0

		//Créer le mot
		this.preparerBouton();
	}

	/**
	 * Méthode pour créer chaque instance de la classe Mot et pour débuter leur animation
	 */
	preparerBouton = () => {		
		this.bouton.innerHTML = '' // effacement du texte présent
        this.conteneurMot= document.createElement('div')
        //mise en forme du bouton et du mot
        this.bouton.style.backgroundColor = '#7028e4'
        this.conteneurMot.style.color = '#f1ffe7'
        this.conteneurMot.style.fontFamily = "'Titillium Web', sans-serif"
        this.conteneurMot.innerHTML= this.mot

        this.bouton.appendChild(this.conteneurMot)

		//Partir la première RequestAnimationFrame
		window.requestAnimationFrame(()=> {this.animerMot()});
	}


	/**
	 * Méthode pour animer le mot et le détruire à la fin de son animation
	 */
	animerMot (tempsActuel) {
		//Incrémenter le pourcentage d'animation pour l'échelle
        this.taille += 0.01
        this.opacite += 0.01

		if (this.taille < 2) {
			//Animer l'échelle et l'opacité du mot (i.e. de l'élément HTML)
			this.conteneurMot.style.opacity = this.opacite + "";
			this.conteneurMot.style.fontSize = `${this.taille}em`;

			//Prochaine requête d'animation
			this.requeteID = window.requestAnimationFrame(()=> {this.animerMot()});
			
		} else {
            //executer la fonction
            console.log(this.fonction)
            this.fonction()
			
			//Détruire les référencesl
            this.fonction = null

		}
	}
} //Fin animMot