import express from "express";
import * as countryController from "src/controllers/CountryControllers";
import { validateRequest } from "src/utils/validationMiddleware";
import { countrySchema } from "src/utils/validationSchemas";

const router = express.Router();

router.get("/", countryController.getCountries);
router.post("/", validateRequest(countrySchema), countryController.createCountry);
router.get("/:id", countryController.getCountryById);
router.put("/:id/images", countryController.updateCountryImages);
router.put("/:id", validateRequest(countrySchema), countryController.updateCountry);
router.put("/:id/total", countryController.updateTotalDestinations);
router.delete("/:id", countryController.deleteCountry);

export default router;
