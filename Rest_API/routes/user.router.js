import express from 'express';
const router = express.Router();

import * as IndexController from '../controller/index.controller.js';

router.post("/save",IndexController.save);

router.post("/login",IndexController.login);

router.get("/fetch",IndexController.fetch);

router.patch("/update",IndexController.update);

router.delete("/delete",IndexController.deleteuser);

export default router;