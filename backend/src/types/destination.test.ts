import mongoose from "mongoose";
import Destination, { IDestination } from "src/models/Destination";

describe("Destination Model Test", () => {
  it("create & save destination successfully", async () => {
    const validDestination: IDestination = new Destination({
      name: "Test Destination",
      video: "test_video.mp4",
      images: ["image1.jpg", "image2.jpg"],
      country: "Test Country",
      continent: "Test Continent",
      location: "Test Location",
      description: "A beautiful destination",
      places: {
        to_stay: [{ name: "Hotel Test", address: "123 Test St" }],
        to_visit: [{ name: "Test Park", address: "456 Test Ave" }],
        to_eat: [{ name: "Test Restaurant", address: "789 Test Blvd" }]
      },
      transportation: {
        overview: "Test transportation overview",
        types: [{ type: "Bus", availability: "High" }]
      },
      additionalInfo: {
        whenToVisit: "Spring",
        whoToGoWith: "Friends",
        whatToExpect: "Great experience",
        healthAndSafety: "Safe"
      },
      tags: ["Wilderness", "Culture&Heritage"],
      insight: {
        from_us: {
          tips: ["Tip 1", "Tip 2"],
          article: [{ title: "Test Article", id: "123" }]
        },
        from_others: [{ title: "Other Article", link: "http://example.com" }]
      },
      summary: "Test summary",
      featured: true
    });
    const savedDestination = await validDestination.save();

    expect(savedDestination._id).toBeDefined();
    expect(savedDestination.name).toBe(validDestination.name);
    expect(savedDestination.video).toBe(validDestination.video);
    expect(savedDestination.images).toEqual(validDestination.images);
    expect(savedDestination.country).toBe(validDestination.country);
    expect(savedDestination.continent).toBe(validDestination.continent);
    expect(savedDestination.location).toBe(validDestination.location);
    expect(savedDestination.description).toBe(validDestination.description);
    expect(savedDestination.places).toEqual(validDestination.places);
    expect(savedDestination.transportation).toEqual(validDestination.transportation);
    expect(savedDestination.additionalInfo).toEqual(validDestination.additionalInfo);
    expect(savedDestination.tags).toEqual(validDestination.tags);
    expect(savedDestination.insight).toEqual(validDestination.insight);
    expect(savedDestination.summary).toBe(validDestination.summary);
    expect(savedDestination.featured).toBe(validDestination.featured);
  });

  it("insert destination successfully, but the field not defined in schema should be undefined", async () => {
    const destinationWithInvalidField: IDestination = new Destination({
      name: "Test Destination",
      video: "test_video.mp4",
      images: ["image1.jpg", "image2.jpg"],
      country: "Test Country",
      continent: "Test Continent",
      location: "Test Location",
      description: "A beautiful destination",
      places: {
        to_stay: [{ name: "Hotel Test", address: "123 Test St" }],
        to_visit: [{ name: "Test Park", address: "456 Test Ave" }],
        to_eat: [{ name: "Test Restaurant", address: "789 Test Blvd" }]
      },
      transportation: {
        overview: "Test transportation overview",
        types: [{ type: "Bus", availability: "High" }]
      },
      additionalInfo: {
        whenToVisit: "Spring",
        whoToGoWith: "Friends",
        whatToExpect: "Great experience",
        healthAndSafety: "Safe"
      },
      tags: ["Wilderness", "Culture&Heritage"],
      insight: {
        from_us: {
          tips: ["Tip 1", "Tip 2"],
          article: [{ title: "Test Article", id: "123" }]
        },
        from_others: [{ title: "Other Article", link: "http://example.com" }]
      },
      summary: "Test summary",
      featured: true,
      extraField: "This field is not defined in schema"
    });
    const savedDestination = await destinationWithInvalidField.save();
    expect(savedDestination._id).toBeDefined();
    expect((savedDestination as any).extraField).toBeUndefined();
  });

  it("create destination without required field should fail", async () => {
    const destinationWithoutRequiredField: IDestination = new Destination({
      video: "test_video.mp4",
      images: ["image1.jpg", "image2.jpg"],
      country: "Test Country",
      continent: "Test Continent",
      location: "Test Location",
      description: "A beautiful destination",
      places: {
        to_stay: [{ name: "Hotel Test", address: "123 Test St" }],
        to_visit: [{ name: "Test Park", address: "456 Test Ave" }],
        to_eat: [{ name: "Test Restaurant", address: "789 Test Blvd" }]
      },
      transportation: {
        overview: "Test transportation overview",
        types: [{ type: "Bus", availability: "High" }]
      },
      additionalInfo: {
        whenToVisit: "Spring",
        whoToGoWith: "Friends",
        whatToExpect: "Great experience",
        healthAndSafety: "Safe"
      },
      tags: ["Wilderness", "Culture&Heritage"],
      insight: {
        from_us: {
          tips: ["Tip 1", "Tip 2"],
          article: [{ title: "Test Article", id: "123" }]
        },
        from_others: [{ title: "Other Article", link: "http://example.com" }]
      },
      summary: "Test summary",
      featured: true
    });
    let err;
    try {
      await destinationWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });
});
