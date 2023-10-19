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

const data = {
  first: null,
  last: null,
  email: null,
  birthdate: null,
  quantity: null,
};

first.addEventListener("change", (e) => {
  if (!isValid("first", "" + e.target.value)) {
    invalid(0, "2 characters minimum.");
    data.first = null;
    return;
  }
  valid(0);
  data.first = e.target.value;
  checkFormBeforeSubmit();
});

last.addEventListener("change", (e) => {
  if (!isValid("last", "" + e.target.value)) {
    invalid(1, "2 characters minimum.");
    data.last = null;
    return;
  }
  valid(1);
  data.last = e.target.value;
  checkFormBeforeSubmit();
});

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

const isValid = (toValidate, value) => {
  switch (toValidate) {
    case "first":
      return value.length > 2;
    case "last":
      return value.length > 2;
    case "email":
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return regex.test(value);
    case "birthdate":
      const today = Date.now();
      const bday = new Date(value);
      return today - bday > 0;
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
    console.log(value === null);
    if (value === null) {
      formIsValid = false;
    }
  }

  console.log(formIsValid);

  const btnSubmit = document.querySelector(".btn-submit");

  if (!formIsValid) {
    btnSubmit.disabled = true;
    return;
  }

  btnSubmit.disabled = false;
};
