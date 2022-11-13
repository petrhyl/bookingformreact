import { useContext } from 'react';
import SelectingContext from '../../store/select-context';
import cssStyles from '../formUI/Form.module.css';
import InputGroup from '../input/InputGroup';

const ReservationForm = () =>{
    const selectingCntxt=useContext(SelectingContext);

    const validateNameHandler=value=>{

    }

    const validateEmailHandler=value=>{

    }
    console.log(selectingCntxt.dateFrom);

    return(
        <form className={cssStyles.formMain}>
            <div className={cssStyles.formGroup}>
                <InputGroup type="text" name="Firstname" text="Jméno" change={validateNameHandler} />
                <InputGroup type="text" name="Lastname" text="Příjmení" change={validateNameHandler} />
            </div>
            <div className={cssStyles.formGroup}>
                <InputGroup type="e-mail" name="mail" text="E-mail" change={validateEmailHandler} />
            </div>
            <div className={cssStyles.formSection}>
                <p>Váš pokoj:</p>
                <h3>{selectingCntxt.roomHeader}</h3>
            </div>
            <div className={cssStyles.formSection}>
                <input type="submit" className={cssStyles.inputButton} name="submit" value="Vytvořit rezervaci" />
            </div>
        </form>
    );
}

export default ReservationForm;