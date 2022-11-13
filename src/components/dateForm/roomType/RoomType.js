import cssStyles from './RoomType.module.css';
import apartmentImg from '../../../assets/apartment.jpg';
import { useContext } from 'react';
import SelectingContext from '../../../store/select-context';
import { useNavigate } from "react-router-dom";

const RoomType = proc => {
    const typeId= parseInt(proc.id);
    const name=proc.name;

    const selectingCntxt=useContext(SelectingContext);
    const navigate=useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();

        selectingCntxt.setRoomHeader(name);
        selectingCntxt.setTypeId(typeId);

        navigate('/reservation');
    }

    return (
        <div className={cssStyles.card}>
            <div>
                <h3>{name}</h3>
            </div>
            <div>
                <img src={apartmentImg} alt="room" />
            </div>
            <div>
                {proc.description}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input className={cssStyles.submit} type="submit" name="submit" value="Vybrat Pokoj" />
                </form>
            </div>
        </div>
    );
}

export default RoomType;