import express from "express";
import {
  createCountry,
  deleteCountry,
  getCountries,
  getCountryById,
  updateCountry,
  updateTotalDestinations,
} from "src/controllers/CountryControllers";

const router = express.Router();

router.get("/", getCountries);
router.post("/", createCountry);
router.get("/:id", getCountryById);
router.put("/:id", updateCountry);
router.put("/:id/total", updateTotalDestinations);
router.delete("/:id", deleteCountry);

export default router;