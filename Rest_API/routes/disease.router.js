import express from 'express';
const router = express.Router();

import * as AddDiseaseController from '../controller/adddisease.controller.js';

router.post("/save",AddDiseaseController.save);

router.get("/fetch",AddDiseaseController.fetch);

router.patch("/update",AddDiseaseController.update);

router.delete("/delete",AddDiseaseController.deleteuser);

export default router;