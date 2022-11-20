import React, { useState } from "react"

const SelectingContext = React.createContext({
    typeId:0,
    setTypeId:()=>{},
    typeName:'',
    setTypeName:()=>{},
    dateFrom:'',
    dateTo: '',
    setDateFrom:()=>{},
    setDateTo:()=>{}    
});

export const SelectingContextProvider=props=>{
    const [typeId,setTypeId]=useState(0);
    const [typeName,setTypeName]=useState('');
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);



    const selectingContext={
        typeId:typeId,        
        setTypeId:setTypeId,
        typeName:typeName,
        setTypeName:setTypeName,
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