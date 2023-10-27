const { Router } = require("express");

const router = Router();

router.get("/countries",(req, res)=>{});
router.get("/countries/:idPais",(req, res)=>{});
router.get("/countries/name?=''",(req, res)=>{});
router.post("/activities",(req, res)=>{});
router.get("/activities",(req, res)=>{});

module.exports = router;
