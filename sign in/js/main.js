let emailInput = document.querySelector("#emailInput");
let passwordInput = document.querySelector("#passwordInput");
let loginBtn = document.querySelector("#loginBtn");
let contactsArray = [];
let regex = {
  emailInput: {
    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    isValid: false,
  },
  passwordInput: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    isValid: false,
  },
};
let wrongAlert = document.querySelector("#wrongAlert");
//&==============EVENT LISTENERS==========>//

loginBtn.addEventListener("click", function () {
  //LOGIN LOGIC HERE
  login();
});

//&==============END EVENT LISTENERS==========>//

if (localStorage.getItem("users") !== null) {
  contactsArray = JSON.parse(localStorage.getItem("users"));
}
//!-----------------FUNCTIONS---------------^//
function login() {
  let contactData = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  if (isLoginValid(contactData) == true) {
    setTimeout(function () {
      window.location.href = "./welcome/welcome.html";
    }, 1500);
    resetInputs();
  } else {
    wrongAlert.classList.remove("d-none");
  }
}

function isLoginValid(contactData) {
  for (let i = 0; i < contactsArray.length; i++) {
    if (
      contactsArray[i].userEmail.toLowerCase() ==
        contactData.email.toLowerCase() &&
      contactsArray[i].userPassword == contactData.password
    ) {
      localStorage.setItem("contactName", contactsArray[i].userName);

      return true;
    }
  }
}
function resetInputs() {
  emailInput.value = null;
  passwordInput.value = null;

  wrongAlert.classList.add("d-none");
}
