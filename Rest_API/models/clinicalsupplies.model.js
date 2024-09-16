import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ClinicalSupplies = mongoose.Schema ({ 
    _id: Number,  
    collection_name: String,
    ProductName: {
        type: String, 
        required: [true, "Product name is required"], 
        lowercase: true,
        trim: true,  
    },

    ProductCategory: {
        type: String, 
        required: [true, "Product category is required"], 
        lowercase: true,
        trim: true,  
    },

    Productprice: {
        type: Number, 
        required: [true, "Product Price is required"],  
        lowercase: true,
        trim: true,  
    },

    Producticonnm: {
        type: String, 
        required: [true, "Product icon name is required"], 
        trim: true,     
    },

    Details: {
        type: String,
        required: [true,"Details is required"],
        trim: true
    },

    info: String 
});

ClinicalSupplies.plugin(uniqueValidator);

const ClinicalSuppliesModel = mongoose.model('clinicalsupplies_collection',ClinicalSupplies);

export default ClinicalSuppliesModel;