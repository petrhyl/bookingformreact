import { useState } from 'react';
import './App.css';
import DateForm from './components/form/DateForm';
import RoomTypeList from './components/roomType/RoomTypeList';

function App() {
  const [isError, setIsError] = useState(false);
  const [requestErrMessage, setRequestErrorMessage] = useState('');
  const [roomTypes, setRoomTypes] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getRooms = async (from, to, persons) => {
    setIsError(false);
    setIsLoading(true);
    // try{
    const response = await fetch(`http://localhost:8008/controller/roomtypes/free.php?from=${from}&to=${to}&persons=${persons}`);
    const data = await response.json();

    if (response.ok) {
      const loadedTypes = [];
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
    } else {
      setIsError(true);
      setRequestErrorMessage(data.error.message);
    }
    // } catch (error) {
    //   setIsError(true);
    //   setRequestErrorMessage(error.message);
    // }

    setIsLoading(false);
  }

  return (
    <main>
      <div className='content'>
        <DateForm submitHandler={getRooms} />
        {isError && <div className='error'>{requestErrMessage}</div>}
        {isLoaded && <RoomTypeList roomTypes={roomTypes} />}
      </div>
    </main>
  );
}

export default App;
