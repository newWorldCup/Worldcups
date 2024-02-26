import { useState } from 'react';

// 각 입력 필드의 상태를 독립적으로 관리하는 커스텀 훅
const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: onChangeHandler
  };
};

export default useFormInput;
