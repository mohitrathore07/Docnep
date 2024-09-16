import DoctorSchemaModel from "../models/adddoctor.model.js";
import "../models/connection.js";
import rs from "randomstring";
import url from "url";
import path from "path";

export const save = async (req, res) => {
  
  let DoctorsList = await DoctorSchemaModel.find();
  let l = DoctorsList.length;
  let _id = l == 0 ? 1 : DoctorsList[l - 1]._id + 1;

  
  let Dricon = req.files.Dricon;
  let Driconnm = rs.generate() + "-" + Date.now() + "-" + Dricon.name;

  let Drdetails = { ...req.body, "Driconnm": Driconnm, "_id": _id, "info": Date() , "collection_name":"doctor" };

  try {
    await DoctorSchemaModel.create(Drdetails);
    let _dirname = url.fileURLToPath(new URL(".", import.meta.url));
    let uploadpath = path.join( _dirname,"../../UI/public/assets/uploads/doctorimage",Driconnm);

    Dricon.mv(uploadpath, (err) => {
      if (err) {
        return res.status(500).json({ status: "false", error: err.message });
      }
      res.status(201).json({ status: "true" });
    });
  } catch (error) {
    res.status(500).json({ status: "false" });
  }
};

export const fetch = async (req, res) => {
  let condition_obj = url.parse(req.url, true).query;
  let usersList = await DoctorSchemaModel.find(condition_obj);
  if (usersList.length != 0) {
    res.status(200).json(usersList);
  } else {
    res.status(404).json({ status: "Resource not found" });
  }
};

export const update = async (req, res) => {
  let userDetails = await DoctorSchemaModel.findOne(
    JSON.parse(req.body.condition_obj)
  );
  if (userDetails) {
    let user = await DoctorSchemaModel.updateOne(
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
  let userDetails = await DoctorSchemaModel.findOne(
    JSON.parse(req.body.condition_obj)
  );
  if (userDetails) {
    let user = await DoctorSchemaModel.deleteOne(
      JSON.parse(req.body.condition_obj)
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
