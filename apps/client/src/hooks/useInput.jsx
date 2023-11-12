import { useState } from "react";
import useValidation from "./useValidation";

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
  
    const valid = useValidation(value, validations);
  
    const onChange = (e) => {
      setValue(e.target.value);
    };
  
    // when user leaves the input
    const onBlur = (e) => {
      setDirty(true);
    };

    const clearValue = () => {
      setValue('');
      setDirty(false);
    }
  
    return {
      value,
      isDirty,
      onChange,
      onBlur,
      clearValue,
      ...valid,
    };
  };

  export default useInput;