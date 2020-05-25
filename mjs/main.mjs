import { PageQuestion } from "./PageQuestion.mjs"
import { FenetreMessage } from "./FenetreMessage.mjs"
import { monQuizz } from "./monQuizz.mjs"

// élément de la page
const enTete = document.querySelector('header')
const main = document.querySelector('main')

// création des Objets
const PageQuizz = new PageQuestion(
                                main,
                                monQuizz)

const RegleJeu = new FenetreMessage("Regarde bien les images puis<br>trouve la MAUVAISE RÉPONSE !",
                                    enTete,
                                    'regle_jeu',
                                    '',
                                    'Go',
                                    PageQuizz.initialiserJeu)

const Introduction = new FenetreMessage('Le QUIZZ', 
                                        enTete,
                                        'intro',
                                        'anim_intro',
                                        'Jouer',
                                        RegleJeu.creerFenetre)

// afficher la page d'introduction
Introduction.creerFenetre()
Introduction.animFenetreIntro()

// 1 . affichage de la page d'introduction (qui fait appel à l'instance RegleJeu)
// 2 . affichage de la règle du jeu (qui fait appel à l'instance PageQuestion)
// 3 . affichage de la page Question (lancement du quizz (voir PageQuestion.mjs))



