import React, { useState } from "react"

const SelectingContext = React.createContext({
    typeId:0,
    setTypeId:()=>{},
    roomHeader:'',
    setRoomHeader:()=>{},
    dateFrom:'',
    dateTo: '',
    setDateFrom:()=>{},
    setDateTo:()=>{}    
});

export const SelectingContextProvider=props=>{
    const [typeId,setTypeId]=useState(0);
    const [roomHeader,setRoomHeader]=useState('');
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);



    const selectingContext={
        typeId:typeId,        
        setTypeId:setTypeId,
        roomHeader:roomHeader,
        setRoomHeader:setRoomHeader,
        dateFrom:dateFrom,
        dateTo:dateTo,
        setDateFrom:setDateFrom,
        setDateTo:setDateTo        
    }

    return (
        <SelectingContext.Provider value={selectingContext} >
            {props.children}
        </SelectingContext.Provider>
    )
}

export default SelectingContext;