import React from "react";
import "src/common/style/styled-input.css"

interface StyledInputProps {
  type: string;
  id: string;
  label: string
}

const StyledInput: React.FC<StyledInputProps> = ({ type, id, label }) => {

  return (
    <div className="styled-input flex w-full items-center border-b border-text-light">
      <label htmlFor={id} className="label span-regular">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="input border-0 bg-transparent focus:outline-none p-regular w-full"
        onFocus={() => {
          const input = document.getElementById(id);
          if (input) {
            const styledInput = input.closest(".styled-input");
            if (styledInput) styledInput.classList.add("active");
          }
        }}
        onBlur={() => {
          const input = document.getElementById(id);
          if (input && ( input as HTMLInputElement).value === "") {
            const styledInput = input.closest(".styled-input");
            if (styledInput) styledInput.classList.remove("active");
          }
        }}
      />
    </div>
  );
};

export default StyledInput;