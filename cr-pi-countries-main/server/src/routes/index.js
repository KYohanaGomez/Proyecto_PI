const { Router } = require("express");
const getCountries = require("../controllers/getCountries");
const getCountriesById = require("../controllers/getCountriesById");
const getCountriesByName = require("../controllers/getCountriesByName");
const postActivities = require("../controllers/postActivities");
const getActivities = require("../controllers/getActivities");

const router = Router();

router.get("/countries", getCountries);
router.get("/countries/name", getCountriesByName);
router.get("/countries/:id", getCountriesById);
router.post("/activities",postActivities);
router.get("/activities",getActivities);

module.exports = router;
