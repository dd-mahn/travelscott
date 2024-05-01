import Destination from "../models/Destination.js";
import { convertImgToBase64 } from "../utils/imageHandler.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import s3 from "../utils/aws.js";

// Create destination
export const createDestination = async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ error: "Invalid request data" });
  }
};

// Get all destinations with pagination
export const getDestinations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const destinations = await Destination.find({}).skip(skip).limit(limit);
    const totalCount = await Destination.countDocuments();

    const totalPages = Math.ceil(totalCount / limit);

    res.status(201).json({
      destinations,
      page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single destination
export const getSingleDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json();
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get destination count
export const getDestinationCount = async (req, res) => {
    try {
        const count = await Destination.countDocuments();
        res.json({ count: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get countries
export const getCountries = async (req, res) => {
    try {
        const countries = await Destination.distinct("country");
        const count = countries.length;
        res.json({ countries: countries, count: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update destination
export const updateDestination = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "country",
    "location",
    "description",
    "types",
    "summary",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!destination) {
      return res.status(404).json();
    }
    res.json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete destination
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json();
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all destinations
export const deleteAllDestinations = async (req, res) => {
  try {
    await Destination.deleteMany({});
    res.json({ message: "All destinations deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update destination places
export const updateDestinationPlaces = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json();
    }
    destination.places = req.body;
    await destination.save();
    res.json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update destination transportation
export const updateDestinationTransportation = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json();
    }
    destination.transportation = req.body;
    await destination.save();
    res.json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update destination reviews
export const updateDestinationReviews = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json();
    }
    destination.reviews = req.body;
    await destination.save();
    res.json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update destination images
export const updateDestinationImages = async (req, res) => {
  try {
    console.log("Starting updateDestinationImages");

    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      console.log("Destination not found");
      return res.status(404).json();
    }

    const { folderName } = req.body;
    console.log("Folder name:", folderName);

    // Get the directory of the current module
    const dirname = path.dirname(fileURLToPath(import.meta.url));

    // Get all image files from the specified folder
    const imageDir = path.join(
      dirname,
      `../../frontend/src/assets/destination_images/${folderName}`
    );
    console.log("Image directory:", imageDir);

    const imageFiles = fs
      .readdirSync(imageDir)
      .filter((file) => file.endsWith(".png") || file.endsWith(".jpg"));
    console.log("Image files:", imageFiles);

    // Convert the images to base64 and replace the existing images
    // const imageBase64s = await Promise.all(
    //   imageFiles.map(async (file) => {
    //     const filePath = path.join(imageDir, file);
    //     const base64 = await convertImgToBase64(filePath);
    //     return base64;
    //   })
    // );

    // console.log("Converted images to base64");

    // destination.images = imageBase64s;

    // Upload the images to S3 and replace the existing images
    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(imageDir, file);
        const fileContent = fs.readFileSync(filePath);

        const params = {
          Bucket: 'travelscott', // replace with your bucket name
          Key: `destination_images/${folderName}/${file}`, // File name you want to save as in S3
          Body: fileContent,
          ACL: 'public-read' // makes the image publicly accessible
        };

        const { Location } = await s3.upload(params).promise();
        return Location;
      })
    );

    // Update the destination with the new image URLs
    destination.images = imageUrls;

    await destination.save();
    console.log("Saved destination");

    res.json(destination);
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({ message: error.message });
  }
};
