const inputDay = document.getElementById("day")
const inputMonth = document.getElementById("month")
const inputYear = document.getElementById("year")
const btnValidate = document.querySelector(".btn")
const resultDay = document.querySelector(".resultDay")
const resultMonth = document.querySelector(".resultMonth")
const resultYear = document.querySelector(".resultYear")



/* Tâche à accomplir 

d'abord récuprer les éléments tapés dans un objet 

récuperer la date local en jour / mois et année dans un objet

vérifizer l'exactitude des données (sinon console.log("warn") 

afficher le résultat

*/

const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];

function restrictInputLength(inputElement, maxLength) {
  inputElement.addEventListener('keydown', (event) => {
    // Empêcher les caractères non autorisés
    if (!allowedChars.includes(event.key)) {
      event.preventDefault();
    }
    
    // Limiter la longueur à maxLength caractères
    if (inputElement.value.length >= maxLength && event.key !== 'Backspace') {
      event.preventDefault();
    }
  });
}

restrictInputLength(inputDay, 2);
restrictInputLength(inputMonth, 2);
restrictInputLength(inputYear, 4);

let billValue
// Ajouter un écouteur d'événement keyup à l'élément inputDay qui recupère la valeur inscrit en temps réel
inputDay.addEventListener('keyup', (event) => {
    billValue = Number(inputDay.value);
    console.log(billValue)
});



// Créez une instance de l'objet Date qui représente la date actuelle
const date = new Date();

// Obtenez le jour, le mois et l'année de la date actuelle
const jour = date.getDate();
const mois = date.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1 pour obtenir le mois réel
const annee = date.getFullYear();

// Créez un objet JavaScript contenant ces valeurs
const dateObj = {
  jour: jour,
  mois: mois,
  annee: annee
};

console.log(dateObj);
