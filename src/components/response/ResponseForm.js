import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReservationContext from "../../store/reservation-context";
import SelectingContext from "../../store/select-context";
import cssStyles from "../formUI/Form.module.css";
import LoadingIcon from "../icon/LoadingIcon";

const ResponseForm = () => {
    const reservationCntxt = useContext(ReservationContext);
    const selectingCntxt = useContext(SelectingContext);
    const navigate=useNavigate();

    const dateForm = new Date(selectingCntxt.dateFrom);
    const dateTo = new Date(selectingCntxt.dateTo);

    const submitHandler=() =>{
        navigate('/booking',{replace:true});
    }

    let message;
    if (reservationCntxt.responseBody.isError) {
        message = (
            <Fragment>
                <h3 className={cssStyles.info + ' ' + cssStyles.warning}>
                    {reservationCntxt.responseBody.response.message}
                </h3>
                <p>Chcete vytvořit jinou rezervaci?</p>
            </Fragment>
        );
    } else {
        message = (
            <Fragment>
                <p className={cssStyles.info + ' ' + cssStyles.success}>Vaše rezervace byla úspěšně vytvořena.</p>
                <div className={cssStyles.formSection}>
                    <p>Váš pokoj:</p>
                    <h3>{selectingCntxt.typeName}</h3>
                </div>
                <div className={cssStyles.formSection}>
                    <p>Datum od - do:</p>
                    <h3>{dateForm.toLocaleDateString()}&nbsp;&nbsp; - &nbsp;&nbsp;{dateTo.toLocaleDateString()}</h3>
                </div>
                <div className={cssStyles.formSection}>
                    <p>Číslo vaší rezervace:</p>
                    <h3>{reservationCntxt.responseBody.response.reservationId}</h3>
                </div>
                <p></p>
                <p>Chcete vytvořit další rezervaci?</p>
            </Fragment>
        );
    }

    const resform = (
        <form className={cssStyles.formMain} onSubmit={submitHandler}>
            <div className={cssStyles.formSection}>
                {message}
                <input type="submit" className={cssStyles.inputButton} value="Přejít na rezervaci" />
            </div>
        </form>);

    return (
        <Fragment>
            {!reservationCntxt.isLoading && resform}
            {reservationCntxt.isLoading && <LoadingIcon />}
        </Fragment>
    );
}

export default ResponseForm;