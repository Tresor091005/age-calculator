const inputDay = document.getElementById("day")
const inputMonth = document.getElementById("month")
const inputYear = document.getElementById("year")
const btnValidate = document.querySelector(".btn")
const resultDay = document.querySelector(".resultDay")
const resultMonth = document.querySelector(".resultMonth")
const resultYear = document.querySelector(".resultYear")

const date = new Date();

const dateObj = {
    jour: date.getDate(),
    mois: date.getMonth() + 1,
    annee: date.getFullYear()
};
  
let dayValue = 0
let monthValue = 0
let yearValue = 0

const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];

const warn = document.querySelectorAll("div[class^='warning'")

function reset() {
    inputDay.value = ""
    inputMonth.value = ""
    inputYear.value = ""
    dayValue = 0
    monthValue = 0
    yearValue = 0
}

// permet de contrôler les caractères acceptées
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

// permet de vérifier l'appartenance à un intervalle
function isValid(value, startValue, endValue) {
    if ((startValue <= value) && (value <= endValue)) {
        return true
    } else {
        return false
    }
}


//  msg non valide
function warningNotValid(selector, message) {
    const warning = document.querySelector(selector)
    warning.classList.remove("hidden")
    warning.textContent = message
}
 
// supprime msg jour non valide
function removeWarning(selector) {
    const warning = document.querySelector(selector)
    warning.classList.add("hidden")
}
 
// msg remplir les sections
function warningRequired() {
    warn.forEach(warning => {
      warning.classList.remove("hidden")
      warning.textContent = "This field is required"
    })
}
   
// supprimer tous les msg
function removeWarnings() {
    warn.forEach( warning => {
      warning.classList.add("hidden")
    })
}

// vérifier qu'il n'y a pas de msg
function isInformationValid() {
    let one = warn[0].classList.contains("hidden")
    let two = warn[1].classList.contains("hidden")
    let three = warn[2].classList.contains("hidden")

    return (one && two && three)
}

function shake(element) {
    element.classList.add("shake-horizontal")

    setTimeout(() => {
        element.classList.remove("shake-horizontal");
    }, 700); 
}
/* Main */

// initialiser les données de la page
reset()

// restreindre les entrées
restrictInputLength(inputDay, 2)
restrictInputLength(inputMonth, 2)
restrictInputLength(inputYear, 4)

// s'assurer de la plausibilité des entrées
inputDay.addEventListener('keyup', (event) => {
    if (isValid(Number(inputDay.value), 1, 31)) {
        removeWarning(".warning-1")
        dayValue = Number(inputDay.value)
    } else {
        warningNotValid(".warning-1", "Must be a valid day")
    }
})

inputMonth.addEventListener('keyup', (event) => {
    if (isValid(Number(inputMonth.value), 1, 12)) {
        removeWarning(".warning-2")
        monthValue = Number(inputMonth.value)    
    } else {
        warningNotValid(".warning-2", "Must be a valid month")
    }
})

inputYear.addEventListener('keyup', (event) => {
    if (Number(inputYear.value) <= 2024) {
        removeWarning(".warning-3")
        yearValue = Number(inputYear.value)
    } else {
        warningNotValid(".warning-3", "Must be in the past")
    }
})

// afficher les résultats si entrées plausibe 
btnValidate.addEventListener("click", (event) => {
    if (dayValue === 0 && monthValue === 0 && yearValue === 0) {
        shake(btnValidate)
        warningRequired()
    } else if (!isInformationValid()) {
        shake(btnValidate)
    } else {
        let age = {
            day : dateObj.jour - dayValue,
            month : dateObj.mois - monthValue,
            year : dateObj.annee - yearValue
        }

        if (age.day < 0) {
            age.day += 31
            age.month -= 1 
        } 
        if (age.month < 0 ) {
            age.month += 12
            age.year -= 1    
        }
        if (age.year < 0) {
            const warning_1 = document.querySelector(".warning-1")
            warning_1.classList.remove("hidden")
            warning_1.textContent = "Must be in the past" 
        } else {
            resultDay.textContent = age.day
            resultMonth.textContent = age.month
            resultYear.textContent = age.year
        }    
    }
})