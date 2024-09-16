import express from 'express';
const router = express.Router();

import * as CartController from '../controller/cart.controller.js';

router.post("/save",CartController.save);

router.get("/fetch",CartController.fetch);

router.patch("/update",CartController.update);

router.delete("/delete",CartController.deleteuser);

export default router;