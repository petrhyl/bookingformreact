import { useContext, useEffect, useReducer, useState } from 'react';
import SelectingContext from '../../store/select-context';
import cssStyles from '../formUI/Form.module.css';
import InputGroup from '../input/InputGroup';
import ReservationContext from '../../store/reservation-context';
import { useNavigate } from 'react-router-dom';

const FRSTNAME = 'FIRST_NAME';
const LSTNAME = 'LAST_NAME';
const MAIL = 'EMAIL';

const defaultState = {
    firstname: true,
    firstnameValue: '',
    lastname: true,
    lastnameValue: '',
    email: true,
    emailValue: ''
};

const validateInput = (state, action) => {
    let isValid = true;
    if (action.type === FRSTNAME || action.type === LSTNAME) {
        isValid = /^[A-Ž](('[A-Ž]?[a-ž]+)|([a-ž]+'[a-ž])|([a-ž]+-[A-Ž]?[a-ž]+)|('[A-Ž]?[a-ž]+-[A-Ž]?[a-ž]+)|([a-ž]*-[A-Ž]?[a-ž]+'[a-ž])|([a-ž]+))$/.test(action.input);

        if (action.type === FRSTNAME) {
            return {
                ...state,
                firstname: isValid,
                firstnameValue: action.input
            };
        }

        return {
            ...state,
            lastname: isValid,
            lastnameValue: action.input
        };
    }

    if (action.type === MAIL) {
        isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(action.input);

        return {
            ...state,
            email: isValid,
            emailValue: action.input
        }
    }

    return defaultState;
}

const ReservationForm = () => {
    const selectingCntxt = useContext(SelectingContext);
    const reservationCntxt=useContext(ReservationContext)
    const [validatedInputs, dispatchInput] = useReducer(validateInput, defaultState);
    const [isFormValid, setIsFormValid] = useState(true);

    const navigate=useNavigate();

    useEffect(() => {
        if (validatedInputs.firstname && validatedInputs.lastname && validatedInputs.email) {
            setIsFormValid(true);
            reservationCntxt.setGuestsFirstname(validatedInputs.firstnameValue);
            reservationCntxt.setGuestLastname(validatedInputs.lastnameValue);
            reservationCntxt.setGuestEmail(validatedInputs.emailValue);
        }
    }, [reservationCntxt,validatedInputs])

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

    const submitHandler =  event => {
        event.preventDefault();

        if (validatedInputs.firstname && validatedInputs.lastname && validatedInputs.email && validatedInputs.firstnameValue !== '' &&
            validatedInputs.lastnameValue !== '' && validatedInputs.emailValue !== '') {
            reservationCntxt.makeReservation(selectingCntxt.dateFrom, selectingCntxt.dateTo, selectingCntxt.typeId);

         
            setIsFormValid(true);
            navigate('/booking/response',{replace:true});
        } else {
            setIsFormValid(false);
        }
    }

    const warningMessage = () => {
        let message = 'Prosím, vyplňte správně';

        if (!validatedInputs.firstname) {
            message = message + ' své křesní jméno';
        }

        if (!validatedInputs.lastname) {
            if (!validatedInputs.firstname) {
                message = message + ',';
            }
            message = message + ' své příjmení';
        }

        if (!validatedInputs.email) {
            if (!validatedInputs.firstname || !validatedInputs.lastname) {
                message = message + ',';
            }
            message = message + ' svůj email';
        }

        return <p className={cssStyles.warning}>{message + '.'}</p>;
    }  

    return (
        <form className={cssStyles.formMain} onSubmit={submitHandler}>
            <div className={cssStyles.formGroup}>
                <InputGroup type="text" name="Firstname" text="Jméno" change={validateFirstNameHandler} />
                <InputGroup type="text" name="Lastname" text="Příjmení" change={validateLastNameHandler} />
            </div>
            <div className={cssStyles.formGroup}>
                <InputGroup type="email" name="mail" text="E-mail" change={validateEmailHandler} />
            </div>
            {!isFormValid && warningMessage()}
            <div className={cssStyles.formSection}>
                <p>Váš pokoj:</p>
                <h3>{selectingCntxt.typeName}</h3>
            </div>
            <div className={cssStyles.formSection}>
                <input type="submit" className={cssStyles.inputButton} name="submit" value="Vytvořit rezervaci" />
            </div>
        </form>
    );
}

export default ReservationForm;