import { BASE_URL } from "src/utils/config";

/**
 * Sends a subscription request to the server with the provided email.
 * @param {string} email - The email address to subscribe.
 * @returns {Promise<boolean>} - A promise that resolves to true if the subscription was successful, otherwise false.
 */
export const sendSubscribe = async (email: string): Promise<boolean> => {
  try {
    // Make a POST request to the subscribe endpoint with the email in the request body
    const res = await fetch(`${BASE_URL}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // Return true if the response is ok, otherwise false
    return res.ok;
  } catch (error) {
    // Log any errors to the console and return false
    console.error("Error subscribing:", error);
    return false;
  }
};
