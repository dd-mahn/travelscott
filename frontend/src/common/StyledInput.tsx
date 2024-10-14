import React, { useEffect } from "react";
import "src/common/style/styled-input.css"

interface StyledInputProps {
  type: string;
  id: string;
  label: string
}

const StyledInput: React.FC<StyledInputProps> = ({ type, id, label }) => {

  const handleFocus = () => {
    const input = document.getElementById(id);
    if (input) {
      const styledInput = input.closest(".styled-input");
      if (styledInput) styledInput.classList.add("active");
    }
  };

  const handleBlur = () => {
    const input = document.getElementById(id);
    if (input && (input as HTMLInputElement).value === "") {
      const styledInput = input.closest(".styled-input");
      if (styledInput) styledInput.classList.remove("active");
    }
  };

  const handleAutoFill = () => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input && input.value !== "") {
      handleFocus();
    } else {
      handleBlur();
    }
  };

  useEffect(() => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      // Check for autofill on mount
      handleAutoFill();

      // Listen for animationstart event
      input.addEventListener("animationstart", handleAutoFill);

      // Use setInterval to check for autofill every 3 seconds
      const intervalId = setInterval(handleAutoFill, 2000);

      return () => {
        input.removeEventListener("animationstart", handleAutoFill);
        clearInterval(intervalId);
      };
    }
  }, [id]); // Add 'id' as a dependency

  return (
    <div className="styled-input flex w-full items-center border-b border-text-light dark:border-text-dark">
      <label htmlFor={id} className="label span-regular">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="input border-0 bg-transparent focus:outline-none p-regular w-full"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default StyledInput;
