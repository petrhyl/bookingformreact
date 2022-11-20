import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import ReservationForm from './components/reservation/ReservationForm';
import ChoosingType from './components/ChoosingType';
import { useContext } from 'react';
import SelectingContext from './store/select-context';
import ResponseForm from './components/response/ResponseForm';
import ReservationContext from './store/reservation-context';

function App() {
  const selectingCntxt = useContext(SelectingContext);
  const reservationCntxt = useContext(ReservationContext);

  return (
    <main>
      <div className='content'>
        <Routes>
          <Route path='/' element={<ChoosingType />} />
          <Route path='/reservation' element={selectingCntxt.typeId > 0 ? <ReservationForm /> : <Navigate to='/' replace />} />
          <Route path='/response' element={reservationCntxt.isResponded ? <ResponseForm /> : <Navigate to='/' replace />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
