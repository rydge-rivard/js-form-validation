const formValidation = (function () {
  const form = document.querySelector("form");

  const email = form.querySelector("#email");
  const emailError = document.querySelector("#email + span.error");

  email.addEventListener("input", (event) => {
    email.validity.valid ? (emailError.textContent = "") : showError();
  });

  function showError() {
    if (email.validity.valueMissing) {
      emailError.textContent = "Please enter an email address.";
    } else if (email.validity.typeMismatch) {
      emailError.textContent =
        "Entered value needs to be an email address (ex. tony@starkindustries.com).";
    }
  }
})();
