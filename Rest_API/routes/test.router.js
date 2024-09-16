import express from 'express';
const router = express.Router();

import * as TestController from '../controller/test.controller.js';

router.post("/save",TestController.save);

router.get("/fetch",TestController.fetch);

router.patch("/update",TestController.update);

router.delete("/delete",TestController.deleteuser);

export default router;