import mongoose from "mongoose";
import Subscribe from "src/models/Subscribe";

describe("Subscribe Model Test", () => {
  it("create & save subscription successfully", async () => {
    const validSubscription = new Subscribe({
      email: "test@example.com",
    });
    const savedSubscription = await validSubscription.save();

    expect(savedSubscription._id).toBeDefined();
    expect(savedSubscription.email).toBe(validSubscription.email);
  });

  it("insert subscription successfully, but the field not defined in schema should be undefined", async () => {
    const subscriptionWithInvalidField = new Subscribe({
      email: "test@example.com",
      extraField: "This field is not defined in schema",
    });
    const savedSubscription = await subscriptionWithInvalidField.save();
    expect(savedSubscription._id).toBeDefined();
    expect((savedSubscription as any).extraField).toBeUndefined();
  });

  it("create subscription without required field should fail", async () => {
    const subscriptionWithoutRequiredField = new Subscribe({});
    let err;
    try {
      await subscriptionWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });
});
