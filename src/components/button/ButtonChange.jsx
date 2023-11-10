import React from "react";
import {Button} from "react-bootstrap";

function ButtonChange({onClick, onHandleChange, icon1, icon2}) {
  return (
    <Button onClick={onClick} className="bg-white btn-outline-light">
      {onHandleChange ? icon1 : icon2}
    </Button>
  );
}

export default ButtonChange;
