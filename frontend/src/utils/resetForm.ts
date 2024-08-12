export const resetForm = () => {
  const firstName = document.getElementById("firstName") as HTMLInputElement;
  const lastName = document.getElementById("lastName") as HTMLInputElement;
  const email = document.getElementById("email") as HTMLInputElement;
  const age = document.getElementById("age") as HTMLInputElement;
  const country = document.getElementById("country") as HTMLInputElement;
  const message = document.getElementById("message") as HTMLTextAreaElement;

  firstName.value = "";
  lastName.value = "";
  email.value = "";
  age.value = "";
  country.value = "";
  message.value = "";
};
