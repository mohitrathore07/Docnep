import express from 'express';
const router = express.Router();

import * as OrderController from '../controller/order.controller.js';

router.post("/save",OrderController.save);

router.get("/fetch",OrderController.fetch);

router.patch("/update",OrderController.update);

router.delete("/delete",OrderController.deleteuser);

export default router;