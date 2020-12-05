import React, { useState, useEffect } from "react";

const Editable = ({
  childRef,
  text,
  type,
  placeholder,
  children,
  originalText,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  const handleBlur = () => {
    setEditing(false);
    props.onConfirm();
  };

  const reset = () => {
    setEditing(false);
  };

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];

    if (keys.indexOf(key) >= 0) {
      reset();
    } else if (type !== "textarea" && allKeys.indexOf(key) >= 0) {
      handleBlur();
    }
  };

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  return (
    <>
      {isEditing ? (
        <div
          onBlur={() => handleBlur()}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div style={{ cursor: "pointer" }} onClick={() => setEditing(true)}>
          {text || placeholder || "Editable content"}
        </div>
      )}
    </>
  );
};

export default Editable;
