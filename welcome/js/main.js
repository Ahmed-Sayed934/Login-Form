let personName = document.querySelector("#welcomePerson");
window.addEventListener("load", function () {
  displayName();
});

function displayName() {
  personName.innerHTML = `Welcome ${localStorage.getItem("contactName")}`;
}
