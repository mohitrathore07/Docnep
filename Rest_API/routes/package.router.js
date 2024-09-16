import express from 'express';
const router = express.Router();

import * as PackageController from '../controller/package.controller.js';

router.post("/save",PackageController.save);

router.get("/fetch",PackageController.fetch);

router.patch("/update",PackageController.update);

router.delete("/delete",PackageController.deleteuser);
    
export default router;