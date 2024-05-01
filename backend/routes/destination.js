import {
  createDestination,
  getDestinations,
  getSingleDestination,
  updateDestination,
  deleteDestination,
  updateDestinationPlaces,
  updateDestinationReviews,
  updateDestinationTransportation,
  deleteAllDestinations,
  updateDestinationImages,
  getCountries,
  getDestinationCount
} from "../controllers/DestinationControllers.js";
import express from "express";

const router = express.Router();

router.post("/", createDestination);
router.get("/", getDestinations);
router.get("/count", getDestinationCount);
router.get("/countries", getCountries);
router.get("/:id", getSingleDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);
router.delete("/", deleteAllDestinations);
router.put("/:id/places", updateDestinationPlaces);
router.put("/:id/transportation", updateDestinationTransportation);
router.put("/:id/reviews", updateDestinationReviews);
router.put("/:id/images", updateDestinationImages);

export default router;
