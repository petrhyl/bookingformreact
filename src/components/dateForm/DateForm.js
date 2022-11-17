import { useContext, useEffect, useReducer, useState } from 'react';

import InputGroup from '../input/InputGroup';
import InputNumber from '../input/InputNumber';
import cssStyles from '../formUI/Form.module.css';
import SelectingContext from '../../store/select-context';

const DATE_TO = 'TO';
const DATE_FROM = 'FROM';

const defaultDateState = {
    dateTo: null,
    dateFrom: null,
    areDatesValid: true,
    dateWarningText: ''
}

const dateReduser = (state, action) => {
    const currentDate = new Date();
    const d = new Date(action.date);
    let areValid = true;
    let warningText = '';

    switch (action.type) {
        case DATE_FROM:
            if (d < currentDate) {
                areValid = false;
                warningText = 'Prosím, vyberte pozdější datum příjezdu.';
            } else if (state.dateTo !== null) {
                if (d >= state.dateTo) {
                    areValid = false;
                    warningText = 'Datum příjezdu musí být dřívější než datum odjezdu.';
                }
            }

            return {
                ...state,
                dateFrom: d,
                areDatesValid: areValid,
                dateWarningText: warningText
            }
        case DATE_TO:
            if (d <= currentDate) {
                areValid = false;
                warningText = 'Prosím, vyberte pozdější datum odjezdu.';
            } else if (state.dateFrom !== null) {
                if (d > state.dateFrom) {
                    if (state.dateFrom < currentDate) {
                        areValid = false;
                        warningText = 'Prosím, vyberte pozdější datum příjezdu.';
                    } else {
                        areValid = true;
                    }
                } else {
                    areValid = false;
                    warningText = 'Datum příjezdu musí být dřívější než datum odjezdu.';
                }
            }

            return {
                ...state,
                dateTo: d,
                areDatesValid: areValid,
                dateWarningText: warningText
            }
        default:
            return {
                ...state,
                areDatesValid: areValid,
                dateWarningText: warningText
            }
    }
}

const DateForm = props => {
    const [dateState, dispatchDateAction] = useReducer(dateReduser, defaultDateState);
    const [isPersonNumValid, setIsPersonNumValid] = useState(true);
    const [isFormValid, setIsFormValid] = useState(true);
    const [personNumber, setPersonNumber] = useState(null);
    const selectingCntxt = useContext(SelectingContext);

    const changeFromHandler = (dateFrom) => {
        dispatchDateAction({
            type: DATE_FROM,
            date: dateFrom + 'T20:30:00'
        });
    }

    const changeToHandler = (dateTo) => {
        dispatchDateAction({
            type: DATE_TO,
            date: dateTo
        });
    }

    const changePersonsHandler = (persons) => {
        if (isNaN(persons)) {
            setIsPersonNumValid(false);
            return;
        }
        if (!/^[1-4]$/.test(persons)) {
            setIsPersonNumValid(false);
            return;
        }
        setIsPersonNumValid(true);
        setPersonNumber(persons);
    }

    useEffect(() => {
        if (dateState.areDatesValid && isPersonNumValid) {
            setIsFormValid(true);

            // *** je treba ulozit data do contextu mimo submitHandler
            // jinak se neprepisi pred volanim metody props.submitHandler a v teto metode budou mit spatnou hodnotu
            if ((dateState.dateFrom !== null) && (dateState.dateTo !== null)) {
                const strDateFrom = dateState.dateFrom.toISOString().slice(0, 10);
                const strDateTo = dateState.dateTo.toISOString().slice(0, 10);

                selectingCntxt.setDateFrom(strDateFrom);
                selectingCntxt.setDateTo(strDateTo);
            }
        }
    }, [dateState, isPersonNumValid, setIsFormValid, selectingCntxt]);

    const submitHandler = event => {
        event.preventDefault();

        if (!dateState.areDatesValid || !isPersonNumValid) {
            setIsFormValid(false);
            return;
        }
        if (dateState.dateFrom === null || dateState.dateTo === null || personNumber === null) {
            setIsFormValid(false);
            return;
        }

        setIsFormValid(true);

        props.submitHandler(personNumber);
    }

    const warningInvalidForm = <p className={cssStyles.warning}>Prosím, vyplňte správně všechny položky.</p>;

    const warningDates = <p className={cssStyles.warning}>{dateState.dateWarningText}</p>;

    const warningPersons = <p className={cssStyles.warning}>Prosím, zadejte počet osob v rozmezí 1-4.</p>;

    return (
        <form className={cssStyles.formMain} onSubmit={submitHandler}>
            <div className={cssStyles.formGroup}>
                <InputGroup name="from" text="Datum příjezdu" type="date" change={changeFromHandler} />
                <InputGroup name="to" text="Datum odjezdu" type="date" change={changeToHandler} />
            </div>
            {!dateState.areDatesValid && warningDates}
            <div className={cssStyles.formGroup}>
                <InputNumber name="person" text="Počet osob" type="number" min="1" max="4" step="1" change={changePersonsHandler} />
            </div>
            {!isPersonNumValid && warningPersons}
            {!isFormValid && warningInvalidForm}
            <input type="submit" className={cssStyles.inputButton} value="Zobrazit volné pokoje" onClick={submitHandler} />
        </form>
    );
}

export default DateForm;