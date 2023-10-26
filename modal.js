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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// formData Elements
const first = document.querySelector("#first");
const last = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const inputlocation = document.querySelector("input[name='location']");

// store form data
const data = {
  first: null,
  last: null,
  email: null,
  birthdate: null,
  quantity: null,
};

// filter pressed keys on first and last names
const allowedKeysForNames = /[a-zA-Z- ]/;

/* Form data validation */

// First name validation
first.addEventListener("change", (e) => {
  if (!isValid("first", e.target.value)) {
    invalid(0, "2 lettres minimum.");
    data.first = null;
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
    return;
  }
  valid(2);
  data.email = e.target.value;
  checkFormBeforeSubmit();
});

// birthdate validation
birthdate.addEventListener("change", (e) => {
  if (!isValid("birthdate", e.target.value)) {
    invalid(3, "Should be before today.");
    data.birthdate = null;
    return;
  }
  valid(3);
  data.birthdate = e.target.value;
  checkFormBeforeSubmit();
});

// quantity validation
quantity.addEventListener("change", (e) => {
  if (!isValid("quantity", e.target.value)) {
    invalid(4, "Can't be negative.");
    data.quantity = null;
    return;
  }
  valid(4);
  data.quantity = e.target.value;
  checkFormBeforeSubmit();
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
      const today = Date.now();
      const bday = new Date(value);
      return today > bday;

    case "quantity":
      return value >= 0;
    default:
      break;
  }
};

const invalid = (i, msg) => {
  formData[i].setAttribute("data-error", msg);
  formData[i].setAttribute("data-error-visible", "true");
};

const valid = (i) => {
  formData[i].removeAttribute("data-error");
  formData[i].removeAttribute("data-error-visible");
};

const checkFormBeforeSubmit = () => {
  let formIsValid = true;
  for (const [_, value] of Object.entries(data)) {
    if (value === null) {
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
