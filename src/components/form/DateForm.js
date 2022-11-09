import { useState } from 'react';

import InputDate from '../input/InputDate';
import InputNumber from '../input/InputNumber';
import cssStyles from './Form.module.css';

const DateForm = props => {
    const [areDatesValid, setAreDatesValid] = useState(true);
    const [isPersonNumValid, setIsPersonNumValid] = useState(true);
    const [isFormValid, setIsFormValid] = useState(true);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [dateWarningText, setDateWarningText] = useState('');
    const [personNumber, setPersonNumber] = useState(null);

    const changeFromHandler = (date) => {
        const now = new Date();
        const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const d = new Date(date).getTime();

        if (d < currentDate) {
            setAreDatesValid(false);
            setDateWarningText('Prosím, vyberte pozdější datum příjezdu.');
        } else if (dateTo !== null) {
            if (d < dateTo) {
                setAreDatesValid(true);
            } else {
                setAreDatesValid(false);
                setDateWarningText('Datum příjezdu musí být dřívější než datum odjezdu.');
            }
        }

        setDateFrom(d);
    }

    const changeToHandler = (date) => {
        const now = new Date();
        const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const d = new Date(date).getTime();        

        if (d <= currentDate) {
            setAreDatesValid(false);
            setDateWarningText('Prosím, vyberte pozdější datum odjezdu.');
        } else if (dateFrom !== null) {
            if (d > dateFrom) {
                if (dateFrom < currentDate) {
                    setAreDatesValid(false);
                    setDateWarningText('Prosím, vyberte pozdější datum příjezdu.');
                } else {
                    setAreDatesValid(true);
                }
            } else {
                setAreDatesValid(false);
                setDateWarningText('Datum příjezdu musí být dřívější než datum odjezdu.');
            }
        } else {
            setAreDatesValid(true);
        }

        setDateTo(d);
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

    const submitHandler = event => {
        event.preventDefault();

        if (!areDatesValid || !isPersonNumValid) {
            setIsFormValid(false);
            return;
        }
        if (dateFrom === null || dateTo === null || personNumber === null) {
            setIsFormValid(false);
            return;
        }

        setIsFormValid(true);

        const dateTypeFrom=new Date(dateFrom);
        const dateTypeTo=new Date(dateTo);
        const strDateFrom=dateTypeFrom.toISOString().slice(0,10);
        const strDateTo=dateTypeTo.toISOString().slice(0,10);
        
        props.submitHandler(strDateFrom, strDateTo,personNumber);
    }

    const warningInvalidForm = (
        <div>
            <p className={cssStyles.warning}>Prosím, vyplňte správně všechny položky.</p>
        </div>
    );

    const warningDates = (
        <div>
            <p className={cssStyles.warning}>{dateWarningText}</p>
        </div>
    );

    const warningPersons = (
        <div>
            <p className={cssStyles.warning}>Prosím, zadejte počet osob v rozmezí 1-4.</p>
        </div>
    );

    return (
        <form className={cssStyles.formMain} onSubmit={submitHandler}>
            <div className={cssStyles.formGroup}>
                <InputDate name="from" text="Datum příjezdu" type="date" change={changeFromHandler} />
                <InputDate name="to" text="Datum odjezdu" type="date" change={changeToHandler} />
            </div>
            {!areDatesValid && warningDates}
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