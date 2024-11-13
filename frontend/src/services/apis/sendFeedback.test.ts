import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendFeedback } from "src/services/apis/sendFeedback";
import config from "src/config/config";

describe("sendFeedback", () => {
  const mockFeedbackData = {
    firstName: "John",
    lastName: "Doe", 
    email: "john@example.com",
    age: "25",
    country: "USA",
    message: "Test feedback message"
  };

  const mockFetch = vi.fn();
  
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Mock global fetch
    global.fetch = mockFetch;
    
    // Reset console.error mock
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it("should successfully send feedback when API call succeeds", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    const result = await sendFeedback(mockFeedbackData);

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      `${config.api.baseUrl}/feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockFeedbackData),
      }
    );
  });

  it("should return false when API call fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("API Error"));

    const result = await sendFeedback(mockFeedbackData);

    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalledWith(
      "Error sending feedback:",
      expect.any(Error)
    );
  });

  it("should return false when API returns non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    const result = await sendFeedback(mockFeedbackData);

    expect(result).toBe(false);
  });
});
