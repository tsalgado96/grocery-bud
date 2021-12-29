import { useEffect } from 'react';

const Modal = (props) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      props.removeModal();
    }, 2000);
    return () => clearTimeout(timeOut);
  }); //change

  return (
    <div style={{ background: bgColors[props.modalType] }} className={'modal-container'}>
      <p>{props.modalContent}</p>
    </div>
  );
};

const bgColors = {
  add: '#42ba96',
  edit: '#ffc107',
  delete: '#df4759'
};

export default Modal;
