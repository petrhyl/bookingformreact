import { Fragment, useContext } from "react";
import ReservationContext from "../../store/reservation-context";
import cssStyles from "../formUI/Form.module.css";
import LoadingIcon from "../icon/LoadingIcon";

const ResponseForm = () => {
    const reservationCntxt = useContext(ReservationContext);

    const resform = (
        <form className={cssStyles.formMain}>
            <div className={cssStyles.formSection}>
                <p className={cssStyles.info + ' ' + (reservationCntxt.responseBody.isError ? cssStyles.warning : cssStyles.success)}>
                    {reservationCntxt.responseBody.response.message}
                </p>
                <p>Chcete vytvořit {reservationCntxt.responseBody.isError ? 'jinou' : 'další'} rezervaci?</p>
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