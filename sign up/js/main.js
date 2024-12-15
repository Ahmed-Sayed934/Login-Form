// !--------------Global------------->//

let nameInput = document.querySelector("#nameInput");
let emailInput = document.querySelector("#emailInput");
let passwordInput = document.querySelector("#passwordInput");
let singUpBtn = document.querySelector("#singUpBtn");
let contactsArray = [];
let regex = {
  nameInput: {
    value: /^[A-Z][a-z\sA-Z]{3,}$/,
    isValid: false,
  },
  emailInput: {
    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    isValid: false,
  },
  passwordInput: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    isValid: false,
  },
};
let invalidAlert = document.getElementById("invalidAlert");

// !--------------end Global------------->//

//&==============EVENT LISTENERS==========>//
nameInput.addEventListener("input", function () {
  validateAllInputs(regex.nameInput.value, this);
});
emailInput.addEventListener("input", function () {
  validateAllInputs(regex.emailInput.value, this);
});
passwordInput.addEventListener("input", function () {
  validateAllInputs(regex.passwordInput.value, this);
});
singUpBtn.addEventListener("click", function () {
  if (checkAllValidations() == true) {
    addUser();
    resetInputs();
    invalidAlert.classList.add("d-none");
  } else {
    invalidAlert.classList.remove("d-none");
  }
});

//&==============END EVENT LISTENERS==========>//

//^lOCAL STORAGE SETUP
if (localStorage.getItem("users") !== null) {
  contactsArray = JSON.parse(localStorage.getItem("users"));
}
//^-----------------FUNCTIONS---------------^//

function addUser() {
  let user = {
    userName: nameInput.value,
    userEmail: emailInput.value,
    userPassword: passwordInput.value,
  };
  if (isExist(user) == true) {
  } else {
    contactsArray.push(user);
    localStorage.setItem("users", JSON.stringify(contactsArray));
    setTimeout(function () {
      window.location.href = "../index.html";
    }, 1500);
  }
}

function isExist(user) {
  for (let i = 0; i < contactsArray.length; i++) {
    if (
      contactsArray[i].userEmail.toLowerCase() === user.userEmail.toLowerCase()
    ) {
      existAlert.classList.remove("d-none");

      return true;
    } else {
      existAlert.classList.add("d-none");
    }
  }
}

function resetInputs() {
  emailInput.value = null;
  nameInput.value = null;
  passwordInput.value = null;
  emailInput.classList.remove("is-valid");
  nameInput.classList.remove("is-valid");
  passwordInput.classList.remove("is-valid");
}

function validateAllInputs(regex, element) {
  let pattern = regex;
  if (pattern.test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}

function checkAllValidations() {
  if (
    validateAllInputs(regex.nameInput.value, nameInput) &&
    validateAllInputs(regex.emailInput.value, emailInput) &&
    validateAllInputs(regex.passwordInput.value, passwordInput)
  ) {
    return true;
  } else {
    return false;
  }
}
