const Validator = require("validator");
const isEmpty = require("is-empty");

function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.profession = !isEmpty(data.profession) ? data.profession : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  // name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.profession)) {
    errors.profession = "Profession field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  // if (Validator.isEmpty(data.address)) {
  //   errors.address = "Address field is required";
  // }
  if (Validator.isEmpty(data.dob)) {
    errors.dob = "Date of Birth field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

function validateLoginInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validateLoginInput,
  validateRegisterInput,
};
