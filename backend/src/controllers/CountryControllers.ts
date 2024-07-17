import { Request, Response } from "express";
import Country from "../models/Country";
import Destination from "src/models/Destination";
import countryImages from "src/types/countryImages";
import countryAdditionalInfo from "src/types/countryAdditionalInfo";
import path from "path";
import fs from "fs";
import { convertToBase64 } from "src/utils/convertImages";
import AWS from "aws-sdk";
import s3 from "src/utils/aws";

// Create country
export const createCountry = async (req: Request, res: Response) => {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).json(country);
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

// Get all countries
type getCountryRequest = {
  continent?: string;
};

export const getCountries = async (req: Request, res: Response) => {
  try {
    const { continent } = req.query as getCountryRequest;

    type Filter = {
      continent?: string;
    };

    const filter: Filter = {};

    if (continent) {
      filter.continent = continent;
    }

    const countries = await Country.find(filter);
    const count = await Country.countDocuments(filter);
    res.status(200).json({
      result: countries,
      count,
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

// Get country by ID
export const getCountryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const country = await Country.findById(id);
    if (!country) {
      res.status(404).json({ message: "Country not found" });
      return;
    }
    res.status(200).json(country);
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

// Update country
interface updateData {
  name?: string;
  images?: countryImages;
  description?: string[];
  capital?: string;
  continent?: string;
  currency?: string;
  population?: number;
  languages?: string;
  visaRequirement?: string;
  dialInCode?: string;
  timeZone?: string;
  additionalInfo?: countryAdditionalInfo;
}

export const updateCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: updateData = {};

    const fieldsToUpdate = [
      "name",
      "images",
      "description",
      "capital",
      "continent",
      "currency",
      "population",
      "languages",
      "visaRequirement",
      "dialInCode",
      "timeZone",
      "additionalInfo",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field]) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ message: "No fields to update provided" });
      return;
    }

    const country = await Country.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!country) {
      res.status(404).json({ message: "Country not found" });
      return;
    }
    res.status(200).json(country);
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

// Delete country
export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const country = await Country.findByIdAndDelete(id);
    if (!country) {
      res.status(404).json({ message: "Country not found" });
      return;
    }
    res.status(200).json({ message: "Country deleted successfully" });
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

// Update total destinations
export const updateTotalDestinations = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Assuming the parameter name is id

    // Find the country by ID to ensure it exists
    const country = await Country.findById(id);
    if (!country) {
      res.status(404).json({ message: "Country not found" });
      return;
    }

    // Count how many destinations are there for the country
    const destinationCount = await Destination.countDocuments({
      country: country.name,
    });

    // Update the country with the total destinations
    await Country.findByIdAndUpdate(id, {
      totalDestinations: destinationCount,
    });

    res.status(200).json({
      message: `Total destinations updated successfully for ${country.name}`,
      totalDestinations: destinationCount,
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

// Update country images

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png"];

export const updateCountryImages = async (req: Request, res: Response) => {
  try {
    console.log("Starting updateCountryImages");

    const { id } = req.params;
    const country = await Country.findById(id);
    if (!country) {
      console.log("Country not found");
      return res.status(404).json({ message: "Country not found." });
    }

    const { folderName } = req.body;
    console.log("Folder name:", folderName);

    const dirname = __dirname;
    const flagDir = path.join(
      dirname,
      `../../../frontend/src/assets/images/countries/${folderName}/flag`
    );
    const mapDir = path.join(
      dirname,
      `../../../frontend/src/assets/images/countries/${folderName}/map`
    );
    const otherDir = path.join(
      dirname,
      `../../../frontend/src/assets/images/countries/${folderName}/others`
    );

    // Function to upload files to S3
    const uploadToS3 = async (filePath: string, s3Path: string) => {
      const fileContent = fs.readFileSync(filePath);
      const params = {
        Bucket: "travelscott", // Your bucket name
        Key: s3Path,
        Body: fileContent,
        ACL: "public-read",
      };
      const { Location } = await s3.upload(params).promise();
      return Location;
    };

    // Process and upload flag images
    const flagImages = await Promise.all(
      fs
        .readdirSync(flagDir)
        .filter((file) => ALLOWED_EXTENSIONS.some((ext) => file.endsWith(ext)))
        .map((file) =>
          uploadToS3(
            path.join(flagDir, file),
            `countries/${folderName}/flag/${file}`
          )
        )
    );

    // Process and upload map images
    const mapImages = await Promise.all(
      fs
        .readdirSync(mapDir)
        .filter((file) => ALLOWED_EXTENSIONS.some((ext) => file.endsWith(ext)))
        .map((file) =>
          uploadToS3(
            path.join(mapDir, file),
            `countries/${folderName}/map/${file}`
          )
        )
    );

    // Process and upload other images
    const otherImages = await Promise.all(
      fs
        .readdirSync(otherDir)
        .filter((file) => ALLOWED_EXTENSIONS.some((ext) => file.endsWith(ext)))
        .map((file) =>
          uploadToS3(
            path.join(otherDir, file),
            `countries/${folderName}/others/${file}`
          )
        )
    );

    // Update the country with the new image URLs
    country.images.flagImages = flagImages;
    country.images.mapImages = mapImages;
    country.images.otherImages = otherImages;

    await country.save();
    console.log("Country images saved successfully");

    res.json({
      message: `Country images updated successfully for ${folderName}`,
      flagImages,
      mapImages,
      otherImages,
    });
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
