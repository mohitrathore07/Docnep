import OrderModel from "../models/order.model.js";
import "../models/connection.js";
import url from "url";


export const save = async (req, res) => {
  
  let SuppliesList = await OrderModel.find();
  let l = SuppliesList.length;
  let _oid = l == 0 ? 1 : SuppliesList[l - 1]._oid + 1;

  let Productdetails = {...req.body, "_oid": _oid, "info": Date(), 'status': 0};  
  try {
    await OrderModel.create(Productdetails);
    res.status(201).json({ status: "true" });
} 
  catch (error) {
    console.error(error);
    res.status(500).json({ status: "false" });
  }
};

export const fetch = async (req, res) => {
  let condition_obj = url.parse(req.url, true).query;

  let PackageList = await OrderModel.find(condition_obj);
  if (PackageList.length != 0) {
    res.status(200).json(PackageList);
  } else {
    res.status(404).json({ status: "Resource not found" });
  }
};

export const update = async (req, res) => {
  let userDetails = await OrderModel.findOne(
    (req.body.condition_obj)
  );
  if (userDetails) {
    let user = await OrderModel.updateOne((req.body.condition_obj),
      { $set: (req.body.content_obj) }
    );
    if (user) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(500).json({ status: "Server error" });
    }
  } else {
    res.status(404).json({ status: "Requested resource not availible" });
  }
};

export const deleteuser = async (req, res) => {
  let userDetails = await OrderModel.findOne((req.body.condition_obj)
  );
  if (userDetails) {
    let user = await CartModel.deleteOne(
      (req.body.condition_obj)
    );
    if (user) {
      res.status(200).json({ msg: "success" });
    } else {
      res.status(500).json({ status: "Server error" });
    }
  } else {
    res.status(404).json({ status: "Requested resource not availible" });
  }
};
