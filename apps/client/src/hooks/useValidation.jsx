import { useEffect, useState } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;

        case 'maxLength':
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;

        case 'email':
          const emailRegex =
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
          emailRegex.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;

        case 'password':
          const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,50}$/;
          passwordRegex.test(String(value))
            ? setPasswordError(false)
            : setPasswordError(true);
          break;

        case 'username':
          const usernameRegex =
            /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
          usernameRegex.test(String(value))
            ? setUsernameError(false)
            : setUsernameError(true);
          break;

        case 'login':
          const loginRegex = new RegExp(
            /(^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.])$)/,
          );
          loginRegex.test(String(value))
            ? setLoginError(false)
            : setLoginError(true);

        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (
      isEmpty ||
      minLengthError ||
      maxLengthError ||
      passwordError ||
      usernameError ||
      emailError ||
      loginError
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [
    isEmpty,
    minLengthError,
    maxLengthError,
    passwordError,
    usernameError,
    emailError,
    loginError,
  ]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    passwordError,
    usernameError,
    emailError,
    loginError,
    inputValid,
  };
};


export default useValidation;