import { Fragment, useContext, useReducer, useState } from 'react';
import SelectingContext from '../../store/select-context';
import cssStyles from '../formUI/Form.module.css';
import InputGroup from '../input/InputGroup';
import { makeReservation } from '../../functions/makeReservation';

const FRSTNAME = 'FIRST_NAME';
const LSTNAME = 'LAST_NAME';
const MAIL = 'EMAIL';

const defaultState = { 
    firstname: true, 
    firstnameValue:'',
    lastname: true,
    lastnameValue:'',
    email: true,
    emailValue:''
};

const validateInput = (state, action) => {
    let isValid = true;
    if (action.type === FRSTNAME || action.type === LSTNAME) {
        isValid = /^[A-Z](('[A-Z]?[a-z]+)|([a-z]+'[a-z])|([a-z]+-[A-Z]?[a-z]+)|('[A-Z]?[a-z]+-[A-Z]?[a-z]+)|([a-z]*-[A-Z]?[a-z]+'[a-z])|([a-z]+))$/.test(action.input);

        if (action.type === FRSTNAME) {
            return {
                ...state,
                firstname: isValid,
                firstnameValue:action.input
            };
        }

        return {
            ...state,
            lastname: isValid,
            lastnameValue:action.input
        };
    }

    if (action.type === MAIL) {
        isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(action.input);

        return {
            ...state,
            email: isValid,
            emailValue:action.input
        }
    }

    return defaultState;
}

const ReservationForm = () => {
    const selectingCntxt = useContext(SelectingContext);
    const [validatedInputs, dispatchInput] = useReducer(validateInput, defaultState);
    const [response,setResponse]=useState({isError:false,message:''});

    const validateFirstNameHandler = value => {
        dispatchInput({
            type: FRSTNAME,
            input: value
        });
    }

    const validateLastNameHandler = value => {
        dispatchInput({
            type: LSTNAME,
            input: value
        });
    }

    const validateEmailHandler = value => {
        dispatchInput({
            type: MAIL,
            input: value
        });
    }

    const submitHandler = event => {
        event.preventDefault();

        let responseObject;

        if (validatedInputs.firstname&&validatedInputs.lastname&&validatedInputs.email) {
           responseObject= makeReservation(selectingCntxt.dateFrom, selectingCntxt.dateTo, selectingCntxt.typeId, validatedInputs.firstnameValue, validatedInputs.lastnameValue, validatedInputs.emailValue);
        }
        
    }

    return (
        <Fragment>
        <form className={cssStyles.formMain} onSubmit={submitHandler}>
            <div className={cssStyles.formGroup}>
                <InputGroup type="text" name="Firstname" text="Jméno" change={validateFirstNameHandler} />
                <InputGroup type="text" name="Lastname" text="Příjmení" change={validateLastNameHandler} />
            </div>
            <div className={cssStyles.formGroup}>
                <InputGroup type="email" name="mail" text="E-mail" change={validateEmailHandler} />
            </div>
            {!validatedInputs.firstname && <p>First is not in valid form.</p>}
            {!validatedInputs.lastname && <p>Lastname is not in valid form.</p>}
            {!validatedInputs.email && <p>E-mail is not in valid form.</p>}
            <div className={cssStyles.formSection}>
                <p>Váš pokoj:</p>
                <h3>{selectingCntxt.roomHeader}</h3>
            </div>
            <div className={cssStyles.formSection}>
                <input type="submit" className={cssStyles.inputButton} name="submit" value="Vytvořit rezervaci" />
            </div>
        </form>
        </Fragment>
    );
}

export default ReservationForm;