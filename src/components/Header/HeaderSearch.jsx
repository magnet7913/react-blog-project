import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../shared/Input';

function HeaderSearch() {
  const inputRef = React.createRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?keyword=${inputRef.current.value}`);
  };

  return (
    <div className="tcl-col-4">
      {/* Header Search */}
      <form onSubmit={handleSubmit}>
        <Input type="search" placeholder="Nhap gia tri search ..." ref={inputRef} />
      </form>
    </div>
  );
}

export default HeaderSearch;

