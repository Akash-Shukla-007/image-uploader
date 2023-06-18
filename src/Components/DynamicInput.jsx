import React, { useState } from "react";
import { BiShowAlt, BiHide } from "react-icons/bi";

function DynamicInput({
  value,
  setValue,
  placeholder,
  type,
  name,
  label,
  errorText,
}) {
  const [hide, setHide] = useState(true);

  return (
    <div className="input_component">
      <input
        type={type == "password" ? (hide ? "password" : "text") : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {type == "password" && (
        <div className="hide_button_container" onClick={() => setHide(!hide)}>
          {hide ? <BiShowAlt size={25} /> : <BiHide size={25} />}
        </div>
      )}
      {errorText && <p className="error_text">{errorText}</p>}
    </div>
  );
}

export default DynamicInput;
