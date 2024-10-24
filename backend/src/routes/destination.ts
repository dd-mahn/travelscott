import express from "express";
import * as destinationController from "src/controllers/DestinationControllers/DestinationControllers";
import { validateRequest } from "src/utils/validation/validationMiddleware";
import { destinationSchema } from "src/utils/validation/validationSchemas";

const router = express.Router();

router.post("/", validateRequest(destinationSchema), destinationController.createDestination);
router.get("/", destinationController.getDestinations);
router.get("/search", destinationController.getDestinationBySearch);
router.delete("/", destinationController.deleteAllDestinations);
router.get("/:id", destinationController.getSingleDestination);
router.put("/:id", validateRequest(destinationSchema), destinationController.updateDestination);
router.delete("/:id", destinationController.deleteDestination);
router.put("/:id/places", destinationController.updateDestinationPlaces);
router.put("/:id/transportation", destinationController.updateDestinationTransportation);
router.put("/:id/insight", destinationController.updateDestinationInsight);
router.put("/:id/images", destinationController.updateDestinationImages);

export default router;
