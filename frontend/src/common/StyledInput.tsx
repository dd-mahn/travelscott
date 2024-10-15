import React, { useEffect } from "react";
import "src/common/style/styled-input.css"

// Define the props for the StyledInput component
interface StyledInputProps {
  type: string;
  id: string;
  label: string;
}

const StyledInput: React.FC<StyledInputProps> = ({ type, id, label }) => {

  // Handle focus event to add 'active' class to the closest styled-input element
  const handleFocus = () => {
    const input = document.getElementById(id);
    if (input) {
      const styledInput = input.closest(".styled-input");
      if (styledInput) styledInput.classList.add("active");
    }
  };

  // Handle blur event to remove 'active' class if input value is empty
  const handleBlur = () => {
    const input = document.getElementById(id);
    if (input && (input as HTMLInputElement).value === "") {
      const styledInput = input.closest(".styled-input");
      if (styledInput) styledInput.classList.remove("active");
    }
  };

  // Handle autofill event to check if input is filled and update the class accordingly
  const handleAutoFill = () => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input && input.value !== "") {
      handleFocus();
    } else {
      handleBlur();
    }
  };

  // useEffect hook to handle component mount and unmount logic
  useEffect(() => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      // Check for autofill on mount
      handleAutoFill();

      // Listen for animationstart event
      input.addEventListener("animationstart", handleAutoFill);

      // Use setInterval to check for autofill every 2 seconds
      const intervalId = setInterval(handleAutoFill, 2000);

      // Cleanup event listener and interval on component unmount
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
