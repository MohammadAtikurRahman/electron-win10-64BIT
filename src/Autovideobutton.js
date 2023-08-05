import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Autovideobutton = () => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      buttonRef.current.click();
    }, 120000*1000); // Every one minute

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const handleButtonClick = () => {
    console.log("Button clicked");
    navigate('/dashboard'); // Navigate to '/video'
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleButtonClick}
      ref={buttonRef}
      style={{ zIndex: "9999" }}
    >
      VIDEO INFO
    </Button>
  );
};

export default Autovideobutton;
