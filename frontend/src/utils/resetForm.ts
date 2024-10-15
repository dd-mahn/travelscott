export const resetForm = () => {
  // Get all form elements by their IDs
  const formElements = [
    document.getElementById("firstName") as HTMLInputElement,
    document.getElementById("lastName") as HTMLInputElement,
    document.getElementById("email") as HTMLInputElement,
    document.getElementById("age") as HTMLInputElement,
    document.getElementById("country") as HTMLInputElement,
    document.getElementById("message") as HTMLTextAreaElement
  ];

  // Reset the value of each form element
  formElements.forEach(element => {
    if (element) {
      element.value = "";
    }
  });
};
