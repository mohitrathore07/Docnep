import CartModel from "../models/cart.model.js";
import "../models/connection.js";
import url from "url";


export const save = async (req, res) => {
  let SuppliesList = await CartModel.find();
  let l = SuppliesList.length;
  let _cid = l == 0 ? 1 : SuppliesList[l - 1]._cid + 1;


  let Productdetails = {...req.body, "_cid": _cid, "info": Date()};  
  try {
    await CartModel.create(Productdetails);
    res.status(201).json({ status: "true" });
} 
  catch (error) {
    res.status(500).json({ status: "false" });
  }
};

export const fetch = async (req, res) => {
  let condition_obj = url.parse(req.url, true).query;

  let PackageList = await CartModel.find(condition_obj);
  if (PackageList.length != 0) {
    res.status(200).json(PackageList);
  } else {
    res.status(404).json({ status: "Resource not found" });
  }
};

export const update = async (req, res) => {
  let userDetails = await CartModel.findOne(
    JSON.parse(req.body.condition_obj)
  );
  if (userDetails) {
    let user = await CartModel.updateOne(
      JSON.parse(req.body.condition_obj),
      { $set: JSON.parse(req.body.content_obj) }
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
  let userDetails = await CartModel.findOne((req.body.condition_obj)
  );
  if (userDetails) {
    let user = await CartModel.deleteOne((req.body.condition_obj)
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
