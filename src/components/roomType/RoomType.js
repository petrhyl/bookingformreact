import cssStyles from './RoomType.module.css';
import apartmentImg from '../../assets/apartment.jpg';

const RoomType = proc => {
    const typeId=proc.id;

    const handleSubmit=()=>{
        proc.onPickRoom(typeId);
    }

    return (
        <div className={cssStyles.card}>
            <div>
                <h3>{proc.name}</h3>
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
                    <input type="hidden" name="type_id" value={typeId} />
                </form>
            </div>
        </div>
    );
}

export default RoomType;