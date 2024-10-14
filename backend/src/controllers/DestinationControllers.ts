import path from "path";
import fs from "fs";
import { Request, Response } from "express";

import Destination from "src/models/Destination";
import createRegexArray from "src/utils/createRegexArray";
import s3 from "src/utils/aws";

import {
  DestinationAdditionalInfo,
  DestinationInsight,
  DestinationPlace,
  DestinationTransportation,
} from "src/types/destination";
import { sendSuccessResponse, sendErrorResponse } from "src/utils/apiResponse";

// Default
const DEFAULT_PAGE = "1";
const DEFAULT_LIMIT = "18";
const ALLOWED_EXTENSIONS = [".png", ".jpg"];

// Create destination
export const createDestination = async (req: Request, res: Response) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    sendSuccessResponse(
      res,
      "Destination created successfully",
      destination,
      201
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to create destination",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to create destination",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Get all destinations with pagination
type GetDestinationsRequest = {
  countries?: string;
  tags?: string;
  continents?: string;
  searchQuery?: string;
  page?: string;
  limit?: string;
  featured?: string; // Add featured query
};

export const getDestinations = async (req: Request, res: Response) => {
  try {
    const {
      countries,
      tags,
      continents,
      searchQuery,
      page = DEFAULT_PAGE,
      limit = DEFAULT_LIMIT,
      featured, // Destructure featured query
    }: GetDestinationsRequest = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    type Filter = {
      country?: { $in: RegExp[] };
      continent?: { $in: RegExp[] };
      tags?: { $in: RegExp[] };
      featured?: boolean; // Add featured filter
      $or?: { name?: RegExp; country?: RegExp; continent?: RegExp }[];
    };

    const filter: Filter = {};

    if (countries) {
      filter.country = { $in: createRegexArray(countries) };
    }

    if (tags) {
      filter.tags = { $in: createRegexArray(tags) };
    }

    if (continents) {
      filter.continent = { $in: createRegexArray(continents) };
    }

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i"); // 'i' makes it case-insensitive
      filter.$or = [{ name: regex }, { country: regex }, { continent: regex }];
    }

    if (featured) {
      filter.featured = featured === "true"; // Convert string to boolean
    }

    const skip = (pageNumber - 1) * limitNumber;

    const destinations = await Destination.find(filter)
      .skip(skip)
      .limit(limitNumber);
    const count = await Destination.countDocuments(filter);

    const totalPages = Math.ceil(count / limitNumber);

    sendSuccessResponse(res, "Destinations retrieved successfully", {
      result: destinations,
      count,
      page: pageNumber,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to retrieve destinations",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to retrieve destinations",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Get a single destination
export const getSingleDestination = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return sendErrorResponse(res, "Destination not found", 404);
    }
    sendSuccessResponse(res, "Destination retrieved successfully", destination);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to retrieve destination",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to retrieve destination",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Update destination
type updateData = {
  name?: string;
  country?: string;
  video?: string;
  continent?: string;
  location?: string;
  description?: string;
  additionalInfo?: DestinationAdditionalInfo;
  tags?: string[];
  summary?: string;
  featured?: boolean;
};

export const updateDestination = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: updateData = req.body;

    const destination = await Destination.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!destination) {
      return sendErrorResponse(res, "Destination not found", 404);
    }
    sendSuccessResponse(res, "Destination updated successfully", destination);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to update destination",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to update destination",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Delete destination
export const deleteDestination = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return sendErrorResponse(res, "Destination not found", 404);
    }
    sendSuccessResponse(res, "Destination deleted successfully");
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to delete destination",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to delete destination",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Delete all destinations
export const deleteAllDestinations = async (req: Request, res: Response) => {
  try {
    await Destination.deleteMany({});
    sendSuccessResponse(res, "All destinations deleted successfully");
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to delete all destinations",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to delete all destinations",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Update destination places
export const updateDestinationPlaces = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return sendErrorResponse(res, "Destination not found", 404);
    }
    const places: DestinationPlace = req.body;
    destination.places = places;
    await destination.save();
    sendSuccessResponse(
      res,
      "Destination places updated successfully",
      destination.places
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to update destination places",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to update destination places",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Update destination transportation
export const updateDestinationTransportation = async (
  req: Request,
  res: Response
) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return sendErrorResponse(res, "Destination not found", 404);
    }

    const transportation: DestinationTransportation = req.body;
    destination.transportation = transportation;
    await destination.save();
    sendSuccessResponse(
      res,
      "Destination transportation updated successfully",
      destination.transportation
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to update destination transportation",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to update destination transportation",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Update destination insight
export const updateDestinationInsight = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return sendErrorResponse(res, "Destination not found", 404);
    }

    const insight: DestinationInsight = req.body;
    destination.insight = insight;
    await destination.save();
    sendSuccessResponse(
      res,
      "Destination insight updated successfully",
      destination.insight
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to update destination insight",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to update destination insight",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Update destination images
export const updateDestinationImages = async (req: Request, res: Response) => {
  try {
    console.log("Starting updateDestinationImages");

    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      console.log("Destination not found");
      return sendErrorResponse(res, "Destination not found", 404);
    }

    const { folderName } = req.body;
    console.log("Folder name:", folderName);

    // Get the directory of the current module
    const dirname = __dirname;

    // Get all image files from the specified folder
    const imageDir = path.join(
      dirname,
      `../../../frontend/src/assets/images/destinations/${folderName}`
    );
    console.log("Image directory:", imageDir);

    const imageFiles = fs
      .readdirSync(imageDir)
      .filter((file) => ALLOWED_EXTENSIONS.some((ext) => file.endsWith(ext)));
    console.log("Image files:", imageFiles);

    // Upload the images to S3 and replace the existing images
    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(imageDir, file);
        const fileContent = fs.readFileSync(filePath);

        const params = {
          Bucket: "travelscott", // replace with your bucket name
          Key: `destination_images/${folderName}/${file}`, // File name you want to save as in S3
          Body: fileContent,
          ACL: "public-read", // makes the image publicly accessible
        };

        const { Location } = await s3.upload(params).promise();
        // Replace the S3 URL with the ImageKit URL
        const imageKitUrl = Location.replace(
          "https://travelscott.s3.amazonaws.com/",
          "https://ik.imagekit.io/godsadeser/travelscott/"
        );

        return imageKitUrl;
      })
    );

    // Update the destination with the new image URLs
    destination.images = imageUrls;

    await destination.save();
    console.log("Destination Images saved successfully");

    sendSuccessResponse(
      res,
      "Destination images updated successfully",
      destination
    );
  } catch (error) {
    console.error(error); // log the error details on the server
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to update destination images",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to update destination images",
        500,
        "An unknown error occurred"
      );
    }
  }
};

// Get destination by search
export const getDestinationBySearch = async (req: Request, res: Response) => {
  try {
    const { name, country }: { name?: string; country?: string } = req.query;

    let query: { name?: unknown; country?: unknown } = {};

    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    if (country) {
      query.country = { $regex: new RegExp(country, "i") };
    }

    if (!name && !country) {
      return sendErrorResponse(
        res,
        "Please provide a name or country to search",
        400
      );
    }

    const destinations = await Destination.find(query);

    if (destinations.length === 0) {
      return sendErrorResponse(res, "No destinations found", 404);
    }

    sendSuccessResponse(res, "Destinations retrieved successfully", {
      result: destinations,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to search destinations",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to search destinations",
        500,
        "An unknown error occurred"
      );
    }
  }
};
