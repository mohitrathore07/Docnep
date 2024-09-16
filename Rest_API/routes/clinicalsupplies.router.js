import express from 'express';
const router = express.Router();

import * as ClinicalSuppliesController from '../controller/clinicalsupplies.controller.js';

router.post("/save",ClinicalSuppliesController.save);

router.get("/fetch",ClinicalSuppliesController.fetch);

router.patch("/update",ClinicalSuppliesController.update);

router.delete("/delete",ClinicalSuppliesController.deleteuser);

export default router;