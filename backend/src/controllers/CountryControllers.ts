import { Request, Response } from "express";
import Country from "../models/Country";
import Destination from "../models/Destination";
import { sendSuccessResponse, sendErrorResponse } from "../utils/apiResponse";
import s3 from "../utils/aws";
import path from "path";
import fs from "fs";

const ALLOWED_EXTENSIONS = [".png", ".jpg"];

export const createCountry = async (req: Request, res: Response) => {
  try {
    const country = new Country(req.body);
    await country.save();
    sendSuccessResponse(res, "Country created successfully", country, 201);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to create country", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to create country",
        500,
        "An unknown error occurred"
      );
    }
  }
};

export const getCountries = async (req: Request, res: Response) => {
  try {
    const { continent, searchQuery } = req.query;
    const filter: any = {};
    if (continent) filter.continent = continent;
    if (typeof searchQuery === 'string') {
      const regex = new RegExp(searchQuery, "i"); // 'i' makes it case-insensitive
      filter.$or = [{ name: regex }, { continent: regex }];
    }

    const countries = await Country.find(filter);
    const count = await Country.countDocuments(filter);
    sendSuccessResponse(res, "Countries retrieved successfully", {
      result: countries,
      count,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to retrieve countries",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to retrieve countries",
        500,
        "An unknown error occurred"
      );
    }
  }
};

export const getCountryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const country = await Country.findById(id);
    if (!country) {
      return sendErrorResponse(res, "Country not found", 404);
    }
    sendSuccessResponse(res, "Country retrieved successfully", country);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to retrieve country", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to retrieve country",
        500,
        "An unknown error occurred"
      );
    }
  }
};

export const updateCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const country = await Country.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!country) {
      return sendErrorResponse(res, "Country not found", 404);
    }
    sendSuccessResponse(res, "Country updated successfully", country);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to update country", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to update country",
        500,
        "An unknown error occurred"
      );
    }
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const country = await Country.findByIdAndDelete(id);
    if (!country) {
      return sendErrorResponse(res, "Country not found", 404);
    }
    sendSuccessResponse(res, "Country deleted successfully", country);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(res, "Failed to delete country", 500, error.message);
    } else {
      sendErrorResponse(
        res,
        "Failed to delete country",
        500,
        "An unknown error occurred"
      );
    }
  }
};

export const updateCountryImages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { folderName } = req.body;

    const country = await Country.findById(id);
    if (!country) {
      return sendErrorResponse(res, "Country not found", 404);
    }

    const dirname = __dirname;
    const imageDir = path.join(
      dirname,
      `../../../frontend/src/assets/images/countries/${folderName}`
    );

    const uploadToS3 = async (subFolder: string, category: string) => {
      const subFolderPath = path.join(imageDir, subFolder);
      const imageFiles = fs
        .readdirSync(subFolderPath)
        .filter((file) => ALLOWED_EXTENSIONS.some((ext) => file.endsWith(ext)));

      return Promise.all(
        imageFiles.map(async (file) => {
          const filePath = path.join(subFolderPath, file);
          const fileContent = fs.readFileSync(filePath);

          const params = {
            Bucket: "travelscott",
            Key: `${category}_images/${folderName}/${subFolder}/${file}`,
            Body: fileContent,
            ACL: "public-read",
          };

          const { Location } = await s3.upload(params).promise();
          return Location.replace(
            "https://travelscott.s3.amazonaws.com/",
            "https://ik.imagekit.io/godsadeser/travelscott/"
          );
        })
      );
    };

    const [flagImages, mapImages, otherImages] = await Promise.all([
      uploadToS3("flag", "countries"),
      uploadToS3("map", "countries"),
      uploadToS3("others", "countries"),
    ]);

    country.images = { flagImages, mapImages, otherImages };
    await country.save();

    sendSuccessResponse(res, "Country images updated successfully", country);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to update country images",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to update country images",
        500,
        "An unknown error occurred"
      );
    }
  }
};

export const updateTotalDestinations = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const country = await Country.findById(id);
    if (!country) {
      return sendErrorResponse(res, "Country not found", 404);
    }

    const destinationCount = await Destination.countDocuments({
      country: country.name,
    });
    country.totalDestinations = destinationCount;
    await country.save();

    sendSuccessResponse(res, "Total destinations updated successfully", {
      country: country.name,
      totalDestinations: destinationCount,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      sendErrorResponse(
        res,
        "Failed to update total destinations",
        500,
        error.message
      );
    } else {
      sendErrorResponse(
        res,
        "Failed to update total destinations",
        500,
        "An unknown error occurred"
      );
    }
  }
};
