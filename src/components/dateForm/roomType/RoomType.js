import cssStyles from './RoomType.module.css';
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

        selectingCntxt.setTypeName(name);
        selectingCntxt.setTypeId(typeId);

        navigate('/booking/reservation');
    }

    return (
        <div className={cssStyles.card}>
            <div>
                <h3>{name}</h3>
            </div>
            <div>
                <img src={proc.picture} alt="room" />
            </div>
            <div>
                <p className={cssStyles.available}>Počet volných pokojů: {proc.available}</p>
                <p>{proc.description}</p>
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