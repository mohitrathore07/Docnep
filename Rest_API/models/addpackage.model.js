import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const PackageSchema = mongoose.Schema ({ 
    _id: Number,  
    collection_name: String,
    PackageName: {
        type: String, 
        required: [true, "Package name is required"], 
        lowercase: true,
        trim: true,  
    },

    PDiscount: {
        type: Number, 
        required: [true, "Discount is required"], 
        lowercase: true,
        trim: true,  
    },

    Fees: {
        type: Number, 
        required: [true, "Package Fees is required"],  
        lowercase: true,
        trim: true,  
    },

    Packageiconnm: {
        type: String, 
        required: [true, "Package icon name is required"], 
        trim: true,     
    },

    Details: {
        type: String,
        required: [true,"Details is required"],
        trim: true
    },

    info: String 
});

PackageSchema.plugin(uniqueValidator);

const PackageSchemaModel = mongoose.model('package_collection',PackageSchema);

export default PackageSchemaModel;