import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalIcon({
  modalComponent, // component to render inside the modal
  icon, // class name of the icon that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };


  return (
    // <button onClick={onClick}>{buttonText}</button>
    // <div onClick={onClick} className="button animate">
    //     <div className="hover-effect"></div>
    //     <span className='signup-button-font'>{buttonText}</span>
    //   </div>
    // <div onClick={onClick}>
        <i onClick={onClick} className={`${icon}`} />
    // {/* </div> */}
  );
}

export default OpenModalIcon;