import React, { useState } from "react";

const ReservationContext = React.createContext({
    guestsFirstname: '',
    setGuestsFirstname: () => { },
    guestsLastname: '',
    setGuestLastname: () => { },
    GuestsEmail: '',
    setGuestEmail: () => { },
    makeReservation: (dateOfArriving, dateOfDeparting, typeOfRoom) => {},
    isLoading:true,
    isResponded:false,
    responseBody: { isError: false, response: { reservationId: 0, message: '' } }
});

export const ReservationContextProvider = (props) => {
    const [guestsFirstname, setGuestsFirstname] = useState('');
    const [guestsLastname, setGuestLastname] = useState('');
    const [guestsEmail, setGuestEmail] = useState('');
    const [isLoading,setIsLoading]=useState(true);
    const [isResponded,setIsResponded]=useState(false);
    const [responseBody, setResponseBody] = useState({ isError: false, response: { reservationId: 0, message: '' } });

    const makeReservation = async (dateOfArriving, dateOfDeparting, typeOfRoom) => {
        setIsResponded(true);
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8008/controller/reservation/create.php', {
                method: 'POST',
                body: JSON.stringify({
                    guest: {
                        firstname: guestsFirstname,
                        lastname: guestsLastname,
                        email: guestsEmail
                    },
                    from: dateOfArriving,
                    to: dateOfDeparting,
                    id_type: typeOfRoom
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message);
            }

            setResponseBody({ 
                isError: false, 
                response: { 
                    reservationId: data["reservation"]["id"], 
                    message: data["reservation"]["message"] 
                } 
            });
        } catch (err) {
            setResponseBody({ 
                isError: true, 
                response: { 
                    reservationId: 0, 
                    message: err.message 
                } 
            });
        }
        setIsLoading(false);
    }

    const reservationContext = {
        guestsFirstname: guestsFirstname,
        setGuestsFirstname: setGuestsFirstname,
        guestsLastname: guestsLastname,
        setGuestLastname: setGuestLastname,
        GuestsEmail: guestsEmail,
        setGuestEmail: setGuestEmail,
        makeReservation: makeReservation,
        isLoading:isLoading,
    isResponded:isResponded,
        responseBody:responseBody
    }

    return (
        <ReservationContext.Provider value={reservationContext}>
            {props.children}
        </ReservationContext.Provider>
    );
}

export default ReservationContext;