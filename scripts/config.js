const inputDay = document.getElementById("day")
const inputMonth = document.getElementById("month")
const inputYear = document.getElementById("year")
const btnValidate = document.querySelector(".btn")
const resultDay = document.querySelector(".resultDay")
const resultMonth = document.querySelector(".resultMonth")
const resultYear = document.querySelector(".resultYear")


inputDay.value = ""
inputMonth.value = ""
inputYear.value = ""
/* Tâche à accomplir 

d'abord récuprer les éléments tapés dans un objet FAITFAITFAITFAITFAIT

récuperer la date local en jour / mois et année dans un objet  FAITFAITFAITFAITFAIT

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

function isValid(value, startValue, endValue) {
  if ((startValue <= value) && (value <= endValue)) {
    return true
  } else {
    return false
  }
}

restrictInputLength(inputDay, 2);
restrictInputLength(inputMonth, 2);
restrictInputLength(inputYear, 4);

/* MAINMAINMAINMAIN */ 


// Créez une instance de l'objet Date qui représente la date actuelle
const date = new Date();

// Obtenez le jour, le mois et l'année de la date actuelle dans un objet
const dateObj = {
  jour: date.getDate(),
  mois: date.getMonth() + 1,
  annee: date.getFullYear()
};

//Récupérer les informations de l'utilisateur
let dayValue = 0
let monthValue = 0
let yearValue = 0

inputDay.addEventListener('keyup', (event) => {
  if (!isValid(Number(inputDay.value), 1, 31)) {
    console.log(inputDay.value)
    warningDayNotValid()
  } else {
    removeDayWarning()
    dayValue = Number(inputDay.value);
  }
});

function warningDayNotValid() {
  const warning_1 = document.querySelector(".warning-1")
  warning_1.classList.remove("hidden")
  warning_1.textContent = "Must be a valid day"
}

function removeDayWarning() {
  const warning_1 = document.querySelector(".warning-1")
  warning_1.classList.add("hidden")
}


inputMonth.addEventListener('keyup', (event) => {
  if (!isValid(Number(inputMonth.value), 1, 12)) {
    warningMonthNotValid()
  } else {
    removeMonthWarning()
    monthValue = Number(inputMonth.value);
  }
});

function warningMonthNotValid() {
  const warning_2 = document.querySelector(".warning-2")
  warning_2.classList.remove("hidden")
  warning_2.textContent = "Must be a valid month"
}

function removeMonthWarning() {
  const warning_2 = document.querySelector(".warning-2")
  warning_2.classList.add("hidden")
}


inputYear.addEventListener('keyup', (event) => {
  if (Number(inputYear.value) > 2023) {
    console.log(inputYear.value)
    warningYearNotValid()
  } else {
    removeYearWarning()
    yearValue = Number(inputYear.value);
  }
});

function warningYearNotValid() {
  const warning_3 = document.querySelector(".warning-3")
  warning_3.classList.remove("hidden")
  warning_3.textContent = "Must be a valid year"
}

function removeYearWarning() {
  const warning_3 = document.querySelector(".warning-3")
  warning_3.classList.add("hidden")
}

const warn = document.querySelectorAll("div[class^='warning'")
function warningRequired() {
  warn.forEach(warning => {
    warning.classList.remove("hidden")
    warning.textContent = "This field is required"
  })
}


function removeWarning() {
  warn.forEach( warning => {
    warning.classList.add("hidden")
  })
}
//Traiter les informations laissés par l'utilisateur


function isInformationValid() {
  const warning_1 = document.querySelector(".warning-1")
  const warning_2 = document.querySelector(".warning-2")
  const warning_3 = document.querySelector(".warning-3")

  if((!warning_1.classList.contains("hidden")) || (!warning_2.classList.contains("hidden")) || (!warning_3.classList.contains("hidden"))) {
    return false
  } else {
    return true
  }
}

btnValidate.addEventListener("click", (event) => {
  if (dayValue === 0 && monthValue === 0 && yearValue === 0) {
    event.preventDefault();
    warningRequired()
  } else if (isInformationValid()) {
    console.log("notValid")
    event.preventDefault()
    // penser à une petite animation CSS
  } else {
    let Age = {
      day : dateObj.jour - dayValue,
      month : dateObj.mois - monthValue,
      year : dateObj.annee - yearValue
    }

    resultDay.textContent = Age.day
    resultMonth.textContent = Age.month
    resultYear.textContent = Age.year
  }
  

})
