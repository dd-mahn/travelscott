import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Request, Response } from "express";

import Destination from "src/models/Destination";
import createRegexArray from "src/utils/createRegexArray";
import s3 from "src/utils/aws";

import destinationPlace from "src/types/destinationPlace";
import destinationTransportation from "src/types/destinationTransportation";
import destinationInsight from "src/types/destinationInsight";

// Default
const DEFAULT_PAGE = "1";
const DEFAULT_LIMIT = "18";
const ALLOWED_EXTENSIONS = [".png", ".jpg"];

// Create destination
export const createDestination = async (req: Request, res: Response) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Get all destinations with pagination
type GetDestinationsRequest = {
  countries?: string;
  tags?: string;
  page?: string;
  limit?: string;
}

export const getDestinations = async (req: Request, res: Response) => {
  try {
    const {
      countries,
      tags,
      page = DEFAULT_PAGE,
      limit = DEFAULT_LIMIT,
    }: GetDestinationsRequest = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    type Filter = {
      countries?: { $all: RegExp[] };
      tags?: { $all: RegExp[] };
    };

    const filter: Filter = {};

    if (countries) {
      filter.countries = { $all: createRegexArray(countries) };
    }

    if (tags) {
      filter.tags = { $all: createRegexArray(tags) };
    }

    const skip = (pageNumber - 1) * limitNumber;

    const destinations = await Destination.find(filter)
      .skip(skip)
      .limit(limitNumber);
    const count = await Destination.countDocuments(filter);

    const totalPages = Math.ceil(count / limitNumber);

    res.status(200).json({
      result: destinations,
      count,
      page: pageNumber || 1,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Get a single destination
export const getSingleDestination = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json();
    }
    res.json(destination);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Update destination
type updateData = {
  name?: string;
  country?: string;
  continent?: string;
  location?: string;
  description?: string;
  tags?: string[];
  summary?: string;
  featured?: boolean;
};

export const updateDestination = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: updateData = {};

    // Dynamically add fields to updateData if they are provided in the request body
    const fieldsToUpdate = [
      "name",
      "country",
      "continent",
      "location",
      "description",
      "tags",
      "summary",
      "featured",
    ];
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update." });
    }

    const destination = await Destination.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!destination) {
      return res.status(404).json({ message: "Destination not found." });
    }
    res.json(destination);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Delete destination
export const deleteDestination = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found." });
    }
    res.json({ message: "Destination deleted successfully." });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Delete all destinations
export const deleteAllDestinations = async (req: Request, res: Response) => {
  try {
    await Destination.deleteMany({});
    res.json({ message: "All destinations deleted successfully" });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Update destination places
export const updateDestinationPlaces = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found." });
    }
    const places: destinationPlace = req.body;
    destination.places = places;
    await destination.save();
    res.json(destination.places);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
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
      return res.status(404).json({ message: "Destination not found." });
    }

    const transportation: destinationTransportation = req.body;
    destination.transportation = transportation;
    await destination.save();
    res.json(destination.transportation);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    }
  }
};

// Update destination insight
export const updateDestinationInsight = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found." });
    }

    const insight: destinationInsight = req.body;
    destination.insight = insight;
    await destination.save();
    res.json(destination.insight);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
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
      return res.status(404).json({ message: "Destination not found." });
    }

    const { folderName } = req.body;
    console.log("Folder name:", folderName);

    // Get the directory of the current module
    // const dirname = path.dirname(fileURLToPath(import.meta.url));
    const dirname = __dirname;

    // Get all image files from the specified folder
    const imageDir = path.join(
      dirname,
      `../../../frontend/src/assets/images/${folderName}`
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
        return Location;
      })
    );

    // Update the destination with the new image URLs
    destination.images = imageUrls;

    await destination.save();
    console.log("Destination Images saved successfully");

    res.json(destination);
  } catch (error) {
    console.error(error); // log the error details on the server
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
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
      return res
        .status(400)
        .json({ message: "Please provide a name or country to search." });
    }

    const destinations = await Destination.find(query);

    if (destinations.length === 0) {
      return res.status(404).json({ message: "No destinations found." });
    }

    res.json({ result: destinations });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};
