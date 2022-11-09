import { useState } from 'react';
import ReservationForm from '../form/ReservationForm';
import RoomType from './RoomType';
import cssStyles from './RoomTypeList.module.css';

const RoomTypeList=props=>{
    const [isPicked,setIsPicked]=useState(false);

    const handlePickRoom =(typeId)=>{
        // je treba udelat useContext na datumy
        setIsPicked(true)
    }

    const roomTypes=props.roomTypes.map(room=>{
        return(
            <RoomType                 
                key={room.id}
                id={room.id}
                name={room.name}
                description={room.description}
                onPickRoom={handlePickRoom}
            />
        );
    });

    return(
        <div className={cssStyles.list}>
            {!isPicked && roomTypes}
            {isPicked && <ReservationForm />}
        </div>
    );
}

export default RoomTypeList;