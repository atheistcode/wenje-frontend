const INPUT_CHANGE = "INPUT_CHANGE";
const VALIDATE_FORM = "VALIDATE_FORM";
const CLEAR_INPUTS = "CLEAR_INPUTS";

export const initialState = {
  name: { value: "", validationError: "" },
  email: { value: "", validationError: "" },
  password: { value: "", validationError: "" },
  passwordConfirm: { value: "", validationError: "" },
  bio: { value: "", validationError: "" },
  country: { value: "", validationError: "" },
};

export const reducer = function (state, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          value: action.value,
        },
      };

    case VALIDATE_FORM:
      const updatedState = JSON.parse(JSON.stringify(state));

      Object.keys(updatedState).forEach((inputName) => {
        updatedState[inputName].validationError = action.validationErrors[inputName] || "";
      });

      return {
        ...updatedState,
      };

    case CLEAR_INPUTS:
      return { ...initialState };

    default:
      break;
  }
};
