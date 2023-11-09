const formValidation = (function () {
  const form = document.querySelector("form");

  const email = form.querySelector("#email");
  const emailError = document.querySelector("#email + span.error");

  email.addEventListener("input", (event) => {
    email.validity.valid ? (emailError.textContent = "") : showEmailError();
  });

  function showEmailError() {
    if (email.validity.valueMissing) {
      emailError.textContent = "Please enter an email address.";
    } else if (email.validity.typeMismatch) {
      emailError.textContent =
        "Entered value needs to be an email address (ex. tony@starkindustries.com).";
    }
  }

  const country = form.querySelector("#country");
  const countryErr = form.querySelector("#country + span.error");

  country.addEventListener("input", (event) => {
    country.value !== "none"
      ? (countryErr.textContent = "")
      : (countryErr.textContent = "Please select a country from the list.");
  });
})();
