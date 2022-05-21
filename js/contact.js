// HTML form Element
const form = document.querySelector("#contact-form");

const formSuccess = document.querySelector(".form-success");

// input validations
const formName = document.querySelector("#your-name");
const nameError = document.querySelector("#nameError");

const formEmail = document.querySelector("#your-email");
const emailError = document.querySelector("#emailError");

const formSubject = document.querySelector("#your-subject");
const subjectError = document.querySelector("#subjectError");

const formMessage = document.querySelector("#your-message");
const messageError = document.querySelector("textarea");

function inputValidation(event) {
  const targetId = event.target.id;
  const targetValue = event.target.value;

  switch (targetId) {
    case "your-name": {
      nameError.style.background = checkInputLength(targetValue, 5) ? "darkgreen" : "darkred";
      break;
    }
    case "your-email": {
      emailError.style.background = checkEmailValidation(targetValue) ? "darkgreen" : "darkred";
      break;
    }
    case "your-subject": {
      subjectError.style.background = checkInputLength(targetValue, 15) ? "darkgreen" : "darkred";
      break;
    }
    case "your-message": {
      messageError.style.background = checkInputLength(targetValue, 25) ? "darkgreen" : "darkred";
      break;
    }
  }
}

//Event listeners
form.addEventListener("input", inputValidation);
form.addEventListener("submit", formValidation);

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

function formValidation(evnt) {
  evnt.preventDefault();

  const contactForm = evnt.target;
  const formContactUrl = "https://landson.site/thefunction/wp-json/contact-form-7/v1/contact-forms/232/feedback";

  if (checkInputLength(formName.value, 5) && checkEmailValidation(formEmail.value) && checkInputLength(formSubject.value, 15) && checkInputLength(formMessage.value, 25)) {
    formSuccess.innerHTML = `<p class="successMessage">The form was submitted successfully!</p>`;

    let objectData = new FormData(contactForm);

    fetch(formContactUrl, {
      method: "POST",
      body: objectData,
    })
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  }
}
