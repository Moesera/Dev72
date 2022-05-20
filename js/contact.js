// HTML form Element
const form = document.querySelector("#contact-form");

// input validations
const formName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");

const formEmail = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const formSubject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const formMessage = document.querySelector("#message");
const messageError = document.querySelector("textarea");

function formValidation(event) {
  event.preventDefault();

  const targetId = event.target.id;
  const targetValue = event.target.value;

  switch (targetId) {
    case "name": {
      nameError.style.background = checkInputLength(targetValue, 5) ? "darkgreen" : "darkred";
      break;
    }
    case "email": {
      emailError.style.background = checkEmailValidation(targetValue) ? "darkgreen" : "darkred";
      break;
    }
    case "subject": {
      subjectError.style.background = checkInputLength(targetValue, 15) ? "darkgreen" : "darkred";
      break;
    }
    case "message": {
      messageError.style.background = checkInputLength(targetValue, 25) ? "darkgreen" : "darkred";
      break;
    }
  }
}

//Event listeners
form.addEventListener("input", formValidation);
form.addEventListener("submit", isFormValid);

function checkInputLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function checkEmailValidation(email) {
  const pattern = /\S+@\S+\.\S+/;
  const patternMatches = pattern.test(email);
  return patternMatches;
}

function isFormValid() {
  if (checkInputLength(formName.value, 6) && checkEmailValidation(email.value) && checkInputLength(subject.value, 16) && checkInputLength(message.value, 26)) {
    form.innerHTML = `<div class="successMessage"><span>Form successfully sent!</span></div>`;
    form.reset();
  }
}
