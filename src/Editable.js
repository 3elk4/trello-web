import React, { useState, useEffect } from "react";

const Editable = ({
  childRef,
  text,
  type,
  placeholder,
  children,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  const handleBlur = () => {
    setEditing(false);
    props.onConfirm();
  };

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  return (
    <>
      {isEditing ? (
        <span onBlur={() => handleBlur()}>{children}</span>
      ) : (
        <span style={{ cursor: "pointer" }} onClick={() => setEditing(true)}>
          {text || placeholder || "Editable content"}
        </span>
      )}
    </>
  );
};

export default Editable;
