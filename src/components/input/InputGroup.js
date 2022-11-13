import { useRef } from 'react';
import cssStyles from './InputGroup.module.css';

const InputGroup = props=>{
  const currentDate=useRef();

  const onChangeHandler=()=>{;
    props.change(currentDate.current.value);
  }

    return(
        <div className={cssStyles.inputGroup}>
          <label htmlFor={props.name}>{props.text}</label>
          <input type={props.type} className={cssStyles.input} name={props.name} onChange={onChangeHandler} ref={currentDate} />
        </div>
    );
}

export default InputGroup;