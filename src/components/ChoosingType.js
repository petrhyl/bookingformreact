import { Fragment, useContext, useState } from "react";
import SelectingContext from "../store/select-context";
import DateForm from "./dateForm/DateForm";
import RoomTypeList from "./dateForm/roomType/RoomTypeList";
import LoadingIcon from "./icon/LoadingIcon";

const ChoosingType = () => {
    const [isError, setIsError] = useState(false);
    const [requestErrMessage, setRequestErrorMessage] = useState('');
    const [roomTypes, setRoomTypes] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const selectingCntxt = useContext(SelectingContext);

    const getRooms = async (persons) => {
        setIsError(false);
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:8008/controller/roomtypes/free.php?from=${selectingCntxt.dateFrom}&to=${selectingCntxt.dateTo}&persons=${persons}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message);
            }

            let loadedTypes = [];
            for (let index = 1; index < data.rooms.length; index++) {
                const element = {
                    id: data.rooms[index].ID_type,
                    name: data.rooms[index].name,
                    description: data.rooms[index].description
                };
                loadedTypes.push(element);
            }

            setRoomTypes(loadedTypes);
            setIsLoaded(true);
        } catch (err) {
            setIsError(true);
            setRequestErrorMessage(err.message);
        }

        setIsLoading(false);
    }

    return (
        <Fragment>
            <DateForm submitHandler={getRooms} />
            {isError && <p className='error'>{requestErrMessage}</p>}
            {isLoading && <LoadingIcon />}
            {isLoaded && <RoomTypeList roomTypes={roomTypes} />}
        </Fragment>
    )
}

export default ChoosingType;