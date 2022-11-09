import { useRef } from 'react';
import cssStyles from './InputGroup.module.css';

const InputNumber = props => {
    const number=useRef();

    const onChangeHandler=()=>{
        props.change(number.current.value);
    }

    return(
        <div className={cssStyles.inputGroup}>
        <label htmlFor={props.name}>{props.text}</label>
        <input 
        type={props.type} 
        className={cssStyles.input}
        name={props.name} 
        min={props.min} 
        max={props.max} 
        step={props.step}
        onChange={onChangeHandler}
        ref={number} />
    </div>
        );
}

export default InputNumber;