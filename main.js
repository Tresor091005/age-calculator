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

//  msg jour non valide
function warningDayNotValid() {
    const warning_1 = document.querySelector(".warning-1")
    warning_1.classList.remove("hidden")
    warning_1.textContent = "Must be a valid day"
}
 
// supprime msg jour non valide
function removeDayWarning() {
    const warning_1 = document.querySelector(".warning-1")
    warning_1.classList.add("hidden")
}

// msg mois non valide
function warningMonthNotValid() {
    const warning_2 = document.querySelector(".warning-2")
    warning_2.classList.remove("hidden")
    warning_2.textContent = "Must be a valid month"
}
 
// supprime msg mois non valide
function removeMonthWarning() {
    const warning_2 = document.querySelector(".warning-2")
    warning_2.classList.add("hidden")
}

// msg année non valide
function warningYearNotValid() {
    const warning_3 = document.querySelector(".warning-3")
    warning_3.classList.remove("hidden")
    warning_3.textContent = "Must be in the past"
}
 
// supprime msg année non valide
function removeYearWarning() {
    const warning_3 = document.querySelector(".warning-3")
    warning_3.classList.add("hidden")
}
  
// msg remplir les sections
function warningRequired() {
    warn.forEach(warning => {
      warning.classList.remove("hidden")
      warning.textContent = "This field is required"
    })
}
   
// supprimer tous les msg
function removeWarning() {
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
        removeDayWarning()
        dayValue = Number(inputDay.value)
    } else {
        warningDayNotValid()
    }
})

inputMonth.addEventListener('keyup', (event) => {
    if (isValid(Number(inputMonth.value), 1, 12)) {
        removeMonthWarning()
        monthValue = Number(inputMonth.value)
    } else {
        warningMonthNotValid()
    }
})

inputYear.addEventListener('keyup', (event) => {
    if (Number(inputYear.value) <= 2023) {
        removeYearWarning()
        yearValue = Number(inputYear.value);
    } else {
        warningYearNotValid()
    }
})

// afficher les résultats si entrées plausibe 
btnValidate.addEventListener("click", (event) => {
    if (dayValue === 0 && monthValue === 0 && yearValue === 0) {
        event.preventDefault();  // juger de la pertinence !
        warningRequired()
    } else if (!isInformationValid()) {
        event.preventDefault()  // juger de la pertinence !
        console.log("not Valid")
        // penser à une petite animation CSS
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