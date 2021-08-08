import React, { useState, useEffect, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

import AuthContext from '../../store/auth-context';
import useForm from '../../hook/use-form';

import Input from './Input';

// React Component component

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  //custom hook
  //for email

  const {
    value: enterEmailState,
    validateInput: emailIsValid,
    valueChangehandler: emailChangeHandler,
    lostFocusHandler: emailLostFocus,
  } = useForm((value) => value.includes('@'));

  //for password

  const {
    value: enterPassState,
    validateInput: passIsValid,
    valueChangehandler: PassChangeHandler,
    lostFocusHandler: passLostFocus,
  } = useForm((value) => value.trim().length > 6);

  //tuse effect  hook to check user input is valid
  useEffect(() => {
    const identify = setTimeout(() => {
      setFormIsValid(emailIsValid && passIsValid);
    }, 400);

    return () => {
      clearTimeout(identify);
    };
  }, [emailIsValid, passIsValid]);

  //context api used here
  const CtxForm = useContext(AuthContext);

  // on submit for handler
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      CtxForm.onLogin(enterEmailState, enterPassState);
    }
  };

  // main JSX return code for login logic
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          label="E-Mail"
          id="email"
          type="email"
          Value={enterEmailState}
          onChange={emailChangeHandler}
          onBlur={emailLostFocus}
        />

        <Input
          label="PassWord"
          type="password"
          id="password"
          value={enterPassState}
          onChange={PassChangeHandler}
          onBlur={passLostFocus}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
