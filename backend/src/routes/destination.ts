import {
  createDestination,
  getDestinations,
  getSingleDestination,
  updateDestination,
  deleteDestination,
  updateDestinationPlaces,
  updateDestinationTransportation,
  deleteAllDestinations,
  updateDestinationImages,
  getDestinationBySearch,
  updateDestinationInsight
} from "src/controllers/DestinationControllers.js";
import express from "express";

const router = express.Router();

router.post("/", createDestination);
router.get("/", getDestinations);
router.get("/search", getDestinationBySearch);
router.delete("/", deleteAllDestinations);
router.get("/:id", getSingleDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);
router.put("/:id/places", updateDestinationPlaces);
router.put("/:id/transportation", updateDestinationTransportation);
router.put("/:id/insight", updateDestinationInsight);
router.put("/:id/images", updateDestinationImages);

export default router;
