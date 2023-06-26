import { useState } from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const enteredValueIsValid = validateValue(enteredValue);
    const hasError = !enteredValueIsValid && isTouched;

    const valueChangeHandler = (e) => {
        setEnteredValue(e.target.value);
    };

    const valueBlurHandler = () => {
        setIsTouched(true);
    };


    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    const touchedToTrue = () => {
        setIsTouched(true);
    };

    return {
        value: enteredValue,
        hasError,
        isTouched,
        enteredValueIsValid,
        valueChangeHandler,
        valueBlurHandler,
        reset,
        touchedToTrue,
    };
};

export default useInput;