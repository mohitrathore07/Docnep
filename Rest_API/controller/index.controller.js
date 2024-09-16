import '../models/connection.js';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import url from 'url';

import UserSchemaModel from '../models/user.model.js';


export const save = async (req,res)=>{

   let usersList = await UserSchemaModel.find();
   let l = usersList.length;
   let _id=l==0?1:usersList[l-1]._id+1; 

    let userDetails ={...req.body,"_id":_id,"role":"user","status":0,"info":Date()};
    try {
    await UserSchemaModel.create(userDetails);
    res.status(201).json({"status":"true"});
    }
    catch(error) {
        res.status(500).json({"status":"false"});
    }
};

export const login = async (req,res)=>{
    let condition_obj = {...req.body,"status":1};
    let usersList = await UserSchemaModel.find(condition_obj);  
    if(usersList.length!=0) {
        const payload = {"subject":usersList[0].email};
        const key = rs.generate();
        const token = jwt.sign(payload,key); 
        res.status(200).json({"token":token,"userDetails":usersList[0]});
    }
    else {
        res.status(500).json({"token":"error"});
    }
};

export const fetch = async (req,res)=>{
    
    let condition_obj = url.parse(req.url,true).query;    
    let usersList = await UserSchemaModel.find(condition_obj);
    
    if (usersList.length != 0) {
        res.status(200).json(usersList);
    }
    else {
        res.status(404).json({"status": "Resource not found"});
    }
}

export const update = async (req,res) => {

    let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);

    if(userDetails) {
        let user = await UserSchemaModel.updateOne((req.body.condition_obj),{$set: (req.body.content_obj)});
        if (user) {
            res.status(200).json({"msg":"success"});
        }
        else {
            res.status(500).json({"status":"Server error"});
        }
    }
    else {
        res.status(404).json({"status":"Requested resource not availible"})
    }
}


export const deleteuser = async (req,res) => {
    let userDetails = await UserSchemaModel.findOne((req.body.condition_obj));
    if(userDetails) {
        let user = await UserSchemaModel.deleteOne((req.body.condition_obj));
        if (user) {
            res.status(200).json({"msg":"success"});
        }
        else {
            res.status(500).json({"status":"Server error"});
        }
    }
    else {
        res.status(404).json({"status":"Requested resource not availible"})
    }
}