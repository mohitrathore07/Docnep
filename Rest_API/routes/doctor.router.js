import express from 'express';
const router = express.Router();

import * as AddDoctorController from '../controller/adddoctor.controller.js';

router.post("/save",AddDoctorController.save);

router.get("/fetch",AddDoctorController.fetch);

router.patch("/update",AddDoctorController.update);

router.delete("/delete",AddDoctorController.deleteuser);

export default router;