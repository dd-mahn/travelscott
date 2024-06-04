import { Feedback } from "src/types/Feedback";
import { BASE_URL } from "src/utils/config";

export const sendFeedback = async ({ name, email, feedback }: Feedback) => {
  const feedbackObj = {
    name: name,
    email: email,
    message: feedback,
  };

  try {
    const response = await fetch(`${BASE_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackObj),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      alert("Thank you for submitting your feedback!");
    } else {
      alert("Error: " + response.status);
    }
  } catch (error) {
    console.error(error);
  }
};
