export async function makeReservation(dateOfArriving, dateOfDeparting, typeOfRoom, guestsFirstname, guestsLastname, guestsEmail) {
    let isError;
    let returningObject;

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

        returningObject=data;
        isError=false;
    } catch (err) {
        isError=true;
        returningObject= err.message;
    }

    return{
        isError:isError,
        responseBody:returningObject
    }
}