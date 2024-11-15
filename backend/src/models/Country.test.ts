import mongoose from "mongoose";
import Country, { ICountry } from "src/models/Country";

describe("Country Model Test", () => {
  it("create & save country successfully", async () => {
    const validCountry: ICountry = new Country({
      name: "Test Country",
      images: {
        flagImages: ["flag1.jpg"],
        mapImages: ["map1.jpg"],
        otherImages: ["other1.jpg"]
      },
      description: ["A beautiful country"],
      capital: "Test Capital",
      continent: "Asia",
      currency: "Test Currency",
      language: "Test Language",
      visaRequirement: "Required",
      dialInCode: "+123",
      timeZone: "GMT+5",
      additionalInfo: {
        whenToVisit: ["Spring", "Autumn"],
        transportation: ["Bus", "Train"],
        healthAndSafety: ["Safe"]
      },
      totalDestinations: 10
    });
    const savedCountry = await validCountry.save();

    expect(savedCountry._id).toBeDefined();
    expect(savedCountry.name).toBe(validCountry.name);
    expect(savedCountry.images).toEqual(validCountry.images);
    expect(savedCountry.description).toEqual(validCountry.description);
    expect(savedCountry.capital).toBe(validCountry.capital);
    expect(savedCountry.continent).toBe(validCountry.continent);
    expect(savedCountry.currency).toBe(validCountry.currency);
    expect(savedCountry.language).toBe(validCountry.language);
    expect(savedCountry.visaRequirement).toBe(validCountry.visaRequirement);
    expect(savedCountry.dialInCode).toBe(validCountry.dialInCode);
    expect(savedCountry.timeZone).toBe(validCountry.timeZone);
    expect(savedCountry.additionalInfo).toEqual(validCountry.additionalInfo);
    expect(savedCountry.totalDestinations).toBe(validCountry.totalDestinations);
  });

  it("insert country successfully, but the field not defined in schema should be undefined", async () => {
    const countryWithInvalidField: ICountry = new Country({
      name: "Test Country",
      images: {
        flagImages: ["flag1.jpg"],
        mapImages: ["map1.jpg"],
        otherImages: ["other1.jpg"]
      },
      description: ["A beautiful country"],
      capital: "Test Capital",
      continent: "Asia",
      currency: "Test Currency",
      language: "Test Language",
      visaRequirement: "Required",
      dialInCode: "+123",
      timeZone: "GMT+5",
      additionalInfo: {
        whenToVisit: ["Spring", "Autumn"],
        transportation: ["Bus", "Train"],
        healthAndSafety: ["Safe"]
      },
      totalDestinations: 10,
      extraField: "This field is not defined in schema"
    });
    const savedCountry = await countryWithInvalidField.save();
    expect(savedCountry._id).toBeDefined();
    expect((savedCountry as any).extraField).toBeUndefined();
  });

  it("create country without required field should fail", async () => {
    const countryWithoutRequiredField: ICountry = new Country({
      images: {
        flagImages: ["flag1.jpg"],
        mapImages: ["map1.jpg"],
        otherImages: ["other1.jpg"]
      },
      description: ["A beautiful country"],
      capital: "Test Capital",
      continent: "Asia",
      currency: "Test Currency",
      language: "Test Language",
      visaRequirement: "Required",
      dialInCode: "+123",
      timeZone: "GMT+5",
      additionalInfo: {
        whenToVisit: ["Spring", "Autumn"],
        transportation: ["Bus", "Train"],
        healthAndSafety: ["Safe"]
      },
      totalDestinations: 10
    });
    let err;
    try {
      await countryWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });
});
