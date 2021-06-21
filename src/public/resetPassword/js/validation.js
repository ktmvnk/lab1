/* eslint-disable no-undef */
const createInputs = document.querySelectorAll(
  '#createForm .uk-margin .uk-inline input'
);
const addReqLabel = function (el) {
  if (el.classList.contains('required')) {
    el.classList.add('uk-form-danger');
  }
};

const addRequiredLabels = () => {
  createInputs.forEach((e) => {
    addReqLabel(e);
  });
};

// Validation functions
const validateNumbers = function (inputValue) {
  try {
    if (inputValue > 0 && validator.isDecimal(`${inputValue}`)) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

const validateText = function (inputValue) {
  try {
    if (validator.isByteLength(inputValue, { min: 3, max: 200 })) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

const validateDate = function (inputValue) {
  try {
    if (
      validator.isByteLength(inputValue, { min: 10, max: 10 }) &&
      // Date, month and year
      inputValue.split('.').length === 3
    ) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

addRequiredLabels();

const addInputValidation = function (element) {
  if (element.classList.contains('number')) {
    element.addEventListener('input', (val) => {
      if (!validateNumbers(element.value)) {
        element.classList.add('uk-form-danger');
      } else {
        element.classList.remove('uk-form-danger');
      }
    });
  }
  if (element.classList.contains('text')) {
    element.addEventListener('input', (val) => {
      if (!validateText(element.value)) {
        element.classList.add('uk-form-danger');
      } else {
        element.classList.remove('uk-form-danger');
      }
    });
  }

  if (element.classList.contains('date')) {
    element.addEventListener('input', (val) => {
      if (!validateDate(element.value)) {
        element.classList.add('uk-form-danger');
      } else {
        element.classList.remove('uk-form-danger');
      }
    });
  }
};

createInputs.forEach((e) => {
  addInputValidation(e);
});
