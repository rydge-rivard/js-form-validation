const formValidation = (function () {
  const form = document.querySelector("form");
  const confirmBtn = form.querySelector("#confirmBtn");

  const email = form.querySelector("#email");
  const emailErr = document.querySelector("#email + span.error");

  email.addEventListener("input", (event) => {
    email.validity.valid ? (emailErr.textContent = "") : showEmailError();
  });

  function showEmailError() {
    if (email.validity.valueMissing) {
      emailErr.textContent = "Please enter an email address.";
    } else if (email.validity.typeMismatch) {
      emailErr.textContent =
        "Entered value needs to be an email address (ex. tony@starkindustries.com).";
    }
  }

  const country = form.querySelector("#country");
  const countryErr = form.querySelector("#country + span.error");

  country.addEventListener("input", (event) => {
    if (country.value !== "none") {
      countryErr.textContent = "";
      country.setCustomValidity("");
    } else {
      countryErr.textContent = "Please select a country from the list.";
      country.setCustomValidity("Please select a country from the list.");
    }
  });

  const zip = form.querySelector("#zip");
  const zipErr = form.querySelector("#zip + span.error");

  zip.addEventListener("input", (event) => {
    checkZip();
  });

  function checkZip() {
    if (country.value === "none") {
      zipErr.textContent = "Please select a country from the list above.";
      zip.setCustomValidity("Please select a country from the list above.");
    } else {
      showZipError();
    }
  }

  function showZipError() {
    const constraints = {
      ca: [
        "^(CA-)?\\w\\d\\w\\d\\w\\d$",
        "Canadian ZIPs must have 3 letters and 3 digits in an alternating order: ex. N3Y4K1",
      ],
      nl: [
        "^(NL-)?\\d{4}\\w{2}$",
        "Dutch ZIPs must have 4 digits, followed by 2 letters: ex. 3581MS",
      ],
    };
    const selectedCountry = country.value;
    const constraint = new RegExp(constraints[selectedCountry][0], "");

    if (constraint.test(zip.value)) {
      zipErr.textContent = "";
      zip.setCustomValidity("");
    } else {
      zipErr.textContent = constraints[selectedCountry][1];
      zip.setCustomValidity(`${constraints[selectedCountry][1]}`);
    }
  }

  const pwd = form.querySelector("#pwd");
  const pwdConfirm = form.querySelector("#pwd-conf");
  const confirmPwdErr = form.querySelector("#pwd-conf + span.error");
  const pwdErr = form.querySelector("#pwd + span.error");
  pwd.addEventListener("input", (event) => {
    checkPwdLen();
  });

  pwd.addEventListener("input", (event) => {
    checkPwdMatch();
  });

  pwdConfirm.addEventListener("input", (event) => {
    checkPwdMatch();
  });

  function checkPwdMatch() {
    if (pwd.value === pwdConfirm.value) {
      confirmPwdErr.textContent = "";
      pwdConfirm.setCustomValidity("");
    } else {
      confirmPwdErr.textContent = "Passwords do not match.";
      pwdConfirm.setCustomValidity("Passwords do not match.");
    }
  }

  function checkPwdLen() {
    if (pwd.value.length < 8) {
      pwdErr.textContent = "Passwords must be at least 8 characters.";
      pwd.setCustomValidity("Passwords must be at least 8 characters.");
    } else {
      pwdErr.textContent = "";
      pwd.setCustomValidity("");
    }
  }

  confirmBtn.addEventListener("click", (event) => checkSubmit(event));

  function checkSubmit(event) {
    checkPwdMatch();
    checkPwdLen();
    checkZip();
    showEmailError();
    if (form.checkValidity() === true) {
      alert("HIGHFIVE, you filled in the form correctly.");
    } else {
      event.preventDefault();
    }
  }
})();
