import { useReducer } from 'react';

const InputValidateReducer = (state, action) => {
  if (action.type === 'useInput') {
    return {
      value: action.value,
      isValid: state.isValid,
    };
  }
  if (action.type === 'Blur') {
    return {
      value: state.value,
      isValid: state.isValid,
    };
  }

  return { value: '', isValid: false };
};

const useForm = (validate) => {
  const [inputState, dispatchInput] = useReducer(InputValidateReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });

  const validateInput = validate(inputState.value);

  const valueChangehandler = (e) => {
    dispatchInput({ type: 'useInput', value: e.target.value });
  };

  const lostFocusHandler = () => {
    dispatchInput({ type: 'Blur' });
  };

  return {
    value: inputState.value,
    valueChangehandler,
    validateInput,
    lostFocusHandler,
  };
};

export default useForm;
