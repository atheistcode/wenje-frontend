const formValidation = (inputs) => {
  /* validationErrors: {inputName: errorMessage, ...} */
  const validationErrors = {};

  Object.keys(inputs).forEach((inputName) => {
    /* we have required attribute on required inputs, so no need to validate empty inputs */
    if (!inputs[inputName].value) return;

    switch (inputName) {
      case "name":
        if (inputs.name.value.length < 6) validationErrors.name = "Min length allowed for a name is 6 characters.";

        if (inputs.name.value.length > 40) validationErrors.name = "Max length allowed for a name is 40 characters.";

        if (!inputs.name.value.match(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/))
          validationErrors.name = "Name should start with a letter and only contain letters, numbers, and spaces.";

        break;

      case "email":
        if (inputs.email.value.length > 50)
          validationErrors.email = "Max length allowed for an email address is 50 characters.";

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!inputs.email.value.match(regexEmail)) validationErrors.email = "Please provide a valid email address.";

        break;

      case "password":
        if (inputs.password.value.length < 6)
          validationErrors.password = "Min length allowed for a password is 6 characters.";

        break;

      case "passwordConfirm":
        if (inputs.passwordConfirm.value !== inputs.password.value)
          validationErrors.passwordConfirm = "Passwords are not matching.";

        break;

      case "bio":
        if (inputs.bio.value.length > 60) validationErrors.bio = "Max length allowed for a bio is 60 characters.";

        break;

      case "country":
        if (inputs.country.value.length > 25)
          validationErrors.country = "Max length allowed for a country name is 25 characters.";

        break;

      default:
    }
  });

  return validationErrors;
};

export default formValidation;
