import React, { useState, forwardRef } from 'react';
import cls from 'classnames';
import IconSearch from '../IconSearch';
import './input.css';

const Input = forwardRef(({ label, type = 'text', className, icon = <IconSearch />, ...restProps }, ref) => {
  const [localType, setLocalType] = useState(type);

  function handleToggleShowPwd() {
    if (localType === 'password') {
      setLocalType('text');
    } else if (localType === 'text') {
      setLocalType('password');
    }
  }

  const classesIconPwd = cls('toggle-password', {
    'ion-eye': localType === 'password',
    'ion-eye-disabled': localType === 'text',
  });
  const classesSearch = cls('input-search__input', className);

  if (type === 'search') {
    return (
      <div className="input-search">
        {icon}
        <input ref={ref} className={classesSearch} type={localType} {...restProps} />
      </div>
    );
  }

  return (
    <div className="form-control">
      {label && <label>{label}</label>}
      {type === 'password' && <i className={classesIconPwd} onClick={handleToggleShowPwd}></i>}
      <input ref={ref} type={localType} className={className} {...restProps} />
    </div>
  );
});

export default Input;
