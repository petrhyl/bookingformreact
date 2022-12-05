import RoomType from './RoomType';
import cssStyles from './RoomTypeList.module.css';

const RoomTypeList=props=>{
    let roomTypes;

    if (props.roomTypes.length > 0) {
        roomTypes=props.roomTypes.map(room=>{
            return(
                <RoomType                 
                    key={room.id}
                    id={room.id}
                    name={room.name}
                    description={room.description}
                    picture={room.picture}
                    available={room.numberOfAvailable}
                />
            );
        });
    }else{
        roomTypes = <p className={cssStyles.message}>There are no free rooms available in chosen interval.</p>
    }

    return(
        <div className={cssStyles.list}>
            {roomTypes}
        </div>
    );
}

export default RoomTypeList;