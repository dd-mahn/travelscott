import mongoose from "mongoose";
import Feedback, { IFeedback } from "src/models/Feedback";

describe("Feedback Model Test", () => {
  it("create & save feedback successfully", async () => {
    const validFeedback: IFeedback = new Feedback({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: 30,
      country: "USA",
      message: "This is a test feedback message"
    });
    const savedFeedback = await validFeedback.save();

    expect(savedFeedback._id).toBeDefined();
    expect(savedFeedback.firstName).toBe(validFeedback.firstName);
    expect(savedFeedback.lastName).toBe(validFeedback.lastName);
    expect(savedFeedback.email).toBe(validFeedback.email);
    expect(savedFeedback.age).toBe(validFeedback.age);
    expect(savedFeedback.country).toBe(validFeedback.country);
    expect(savedFeedback.message).toBe(validFeedback.message);
  });

  it("insert feedback successfully, but the field not defined in schema should be undefined", async () => {
    const feedbackWithInvalidField: IFeedback = new Feedback({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: 30,
      country: "USA",
      message: "This is a test feedback message",
      extraField: "This field is not defined in schema"
    });
    const savedFeedback = await feedbackWithInvalidField.save();
    expect(savedFeedback._id).toBeDefined();
    expect((savedFeedback as any).extraField).toBeUndefined();
  });

  it("create feedback without required field should fail", async () => {
    const feedbackWithoutRequiredField: IFeedback = new Feedback({
      lastName: "Doe",
      email: "john.doe@example.com",
      age: 30,
      country: "USA",
      message: "This is a test feedback message"
    });
    let err;
    try {
      await feedbackWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.firstName).toBeDefined();
  });
});
