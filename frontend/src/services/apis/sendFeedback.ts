import config from "src/config/config";

// Define the type for feedback data
interface FeedbackData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  country: string;
  message: string;
}

// Function to send feedback data to the server
export const sendFeedback = async (feedbackData: FeedbackData): Promise<boolean> => {
  try {
    // Make a POST request to the feedback endpoint
    const res = await fetch(`/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    // Return true if the response is ok, otherwise false
    return res.ok;
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error("Error sending feedback:", error);
    return false;
  }
};
