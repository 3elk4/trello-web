import React from "react";
import { Toast } from "react-bootstrap";

const MyToast = (props) => {
  return (
    <Toast
      show={props.show}
      onClose={props.handleClose}
      style={{
        position: "absolute",
        top: 10,
        zIndex: 9999,
        left: "50%",
        transform: "translate(-50%, 0px)",
        backgroundColor: props.bgColor,
        textAlign: "center",
      }}
      delay={3000}
      autohide
    >
      <Toast.Body className="pr-5 pl-5">{props.message}</Toast.Body>
    </Toast>
  );
};

export default MyToast;
