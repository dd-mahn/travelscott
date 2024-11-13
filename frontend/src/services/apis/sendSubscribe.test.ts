import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendSubscribe } from "src/services/apis/sendSubscribe";
import config from "src/config/config";

describe("sendSubscribe", () => {
  const mockFetch = vi.fn();
  const mockEmail = "test@example.com";

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Mock global fetch
    global.fetch = mockFetch;
    
    // Reset console.error mock
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it("should successfully subscribe when API call succeeds", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    const result = await sendSubscribe(mockEmail);

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      `${config.api.baseUrl}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: mockEmail }),
      }
    );
  });

  it("should return false when API call fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("API Error"));

    const result = await sendSubscribe(mockEmail);

    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalledWith(
      "Error subscribing:",
      expect.any(Error)
    );
  });

  it("should return false when API returns non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    const result = await sendSubscribe(mockEmail);

    expect(result).toBe(false);
  });
});
