function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const done = document.querySelector(".done");

// form
const form = document.querySelector("form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.classList.toggle("hidden");
  checkFormBeforeSubmit();
}

// close modal form
function closeModal() {
  modalbg.classList.toggle("hidden");
  form.classList.remove("fadeout");
  done.classList.add("hidden");
}
const closeCross = document.querySelector(".close");
const closeBtn = document.querySelector(".close-btn");
[closeBtn, closeCross].forEach((elem) => {
  elem.addEventListener("click", () => {
    closeModal();
  });
});

// formData Elements
const first = document.querySelector("#first");
const last = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const locations = document.querySelectorAll("input[name='location']");
const conditions = document.querySelector("#checkbox1");
const mailing = document.querySelector("#checkbox2");

// store form data
const data = {
  first: null,
  last: null,
  email: null,
  birthdate: null,
  quantity: null,
  location: null,
  conditions: false,
  mailing: false,
};

// filter pressed keys on first and last names
const allowedKeysForNames = /[a-zA-Z- ]/;

/* Form data validation */

// First name validation
first.addEventListener("change", (e) => {
  if (!isValid("first", e.target.value)) {
    invalid(0, "2 lettres minimum.");
    data.first = null;
    checkFormBeforeSubmit();
    return;
  }
  valid(0);
  data.first = e.target.value.trim().replace(/ {2,}/g, " ");
  first.value = data.first;
  checkFormBeforeSubmit();
});

// Limiting input to letters, '-' and spaces
first.addEventListener("keypress", (e) => {
  if (!allowedKeysForNames.test(e.key)) {
    e.preventDefault();
  }
});

// Last name validation
last.addEventListener("change", (e) => {
  if (!isValid("last", e.target.value)) {
    invalid(1, "2 lettres minimum.");
    data.last = null;
    checkFormBeforeSubmit();
    return;
  }
  valid(1);
  data.last = e.target.value.trim().replace(/ {2,}/g, " ");
  last.value = data.last;
  checkFormBeforeSubmit();
});

// Limiting input to letters, '-' and spaces
last.addEventListener("keypress", (e) => {
  if (!allowedKeysForNames.test(e.key)) {
    e.preventDefault();
  }
});

// Email validation
email.addEventListener("change", (e) => {
  if (!isValid("email", e.target.value)) {
    invalid(2, "exemple: 'dupont.jean@mail.com'.");
    data.email = null;
    checkFormBeforeSubmit();
    return;
  }
  valid(2);
  data.email = e.target.value;
  checkFormBeforeSubmit();
});

// birthdate validation
birthdate.addEventListener("change", (e) => {
  if (!isValid("birthdate", e.target.value)) {
    invalid(3, "Entrez une date valide.");
    data.birthdate = null;
    checkFormBeforeSubmit();
    return;
  }
  valid(3);
  data.birthdate = e.target.value;
  checkFormBeforeSubmit();
});

// quantity validation
quantity.addEventListener("change", (e) => {
  if (!isValid("quantity", e.target.value)) {
    invalid(4, "0 si aucune participation précédente.");
    data.quantity = null;
    checkFormBeforeSubmit();
    return;
  }
  valid(4);
  data.quantity = e.target.value;
  checkFormBeforeSubmit();
});

const allowedLocations = [
  "new york",
  "san francisco",
  "seattle",
  "chicago",
  "boston",
  "portland",
];

locations.forEach((location) => {
  location.addEventListener("click", (e) => {
    if (!isValid("location", e.target.value)) {
      //TODO ?
      return;
    }
    data.location = e.target.value;
    checkFormBeforeSubmit();
  });
});

conditions.addEventListener("click", (e) => {
  data.conditions = e.target.checked;
  checkFormBeforeSubmit();
});

mailing.addEventListener("click", (e) => {
  data.mailing = e.target.checked;
});

// validation function
const isValid = (toValidate, value) => {
  switch (toValidate) {
    case "first":
      // at least 2 letters
      return value.replace(/[- ]/g, "").length >= 2;
    case "last":
      // at least 2 letters
      return value.replace(/[- ]/g, "").length >= 2;
    case "email":
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!regex.test(value)) return false;

      // avoiding nonsense ---@--.--
      let isEmail = true;
      const emailParts = [
        value.split("@")[0] ?? "",
        ...(value?.split("@")[1].split(".") ?? ""),
      ];
      emailParts.forEach((part) => {
        if (!/[a-z0-9]/i.test(part)) isEmail = false;
      });
      return isEmail;
    case "birthdate":
      // selected date should not be in the future
      // since there is no minimal age
      const today = Date.now();
      const bday = new Date(value);
      return today > bday;

    case "quantity":
      // cannot be negative
      return value >= 0;

    case "location":
      // Choosed location shoul exist
      // Prevent from user changing the HTML
      return allowedLocations.includes(value?.toLowerCase() ?? "");
    default:
      break;
  }
};

// Display message if invalid
const invalid = (i, msg) => {
  formData[i].setAttribute("data-error", msg);
  formData[i].setAttribute("data-error-visible", "true");
};

// Remove error message if valid
const valid = (i) => {
  formData[i].removeAttribute("data-error");
  formData[i].removeAttribute("data-error-visible");
};

// Check `data` to see if every inputs are valid
// if NOK, submit button is disabled
// if OK, submit button is not disabled
const checkFormBeforeSubmit = () => {
  let formIsValid = true;
  for (const [key, value] of Object.entries(data)) {
    if (value === null) {
      formIsValid = false;
      break;
    }
    if (key === "conditions" && !value) {
      formIsValid = false;
    }
  }

  const btnSubmit = document.querySelector(".btn-submit");

  if (!formIsValid) {
    btnSubmit.disabled = true;
    return;
  }

  btnSubmit.disabled = false;
};

// Reset data to default value
const resetData = (d) => {
  d.first = null;
  d.last = null;
  d.email = null;
  d.birthdate = null;
  d.quantity = null;
  d.location = null;
  d.conditions = false;
  d.mailing = false;
};

// Prevent page reload
// Show data in console
// Reset form and data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = new Date(Date.now());
  console.info(
    `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]: data send sucessfully !`
  );
  console.table(data);
  form.reset();
  resetData(data);
  form.classList.add("fadeout");
  done.classList.remove("hidden");
});
