import RoomType from './RoomType';
import cssStyles from './RoomTypeList.module.css';

const RoomTypeList=props=>{

    const roomTypes=props.roomTypes.map(room=>{
        return(
            <RoomType                 
                key={room.id}
                id={room.id}
                name={room.name}
                description={room.description}
            />
        );
    });

    return(
        <div className={cssStyles.list}>
            {roomTypes}
        </div>
    );
}

export default RoomTypeList;