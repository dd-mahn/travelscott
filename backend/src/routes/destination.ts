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
  getDestinationBySearch
} from "src/controllers/DestinationControllers.js";
import express from "express";

const router = express.Router();

router.post("/", createDestination);
router.get("/", getDestinations);
router.get("/search", getDestinationBySearch);
router.get("/countries", getCountries);
router.delete("/", deleteAllDestinations);
router.get("/:id", getSingleDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);
router.put("/:id/places", updateDestinationPlaces);
router.put("/:id/transportation", updateDestinationTransportation);
router.put("/:id/reviews", updateDestinationReviews);
router.put("/:id/images", updateDestinationImages);

export default router;
