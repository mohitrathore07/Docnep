import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Diseaseschema = mongoose.Schema ({ 
    _id: Number,  
    collection_name: String,
    DiseaseName: {
        type: String, 
        required: [true, "Disease name is required"], 
        lowercase: true,
        trim: true,  
    },

    Specialization: {
        type: String, 
        required: [true, "Specialization is required"],  
        lowercase: true,
        trim: true,  
    },

    Diseaseiconnm: {
        type: String, 
        required: [true, "Doctors icon name is required"], 
        trim: true,     
    },

    Details: {
        type: String,
        required: [true,"Detials is required"],
        trim: true
    },
    info: String 
});

Diseaseschema.plugin(uniqueValidator);

const DiseaseSchemaModel = mongoose.model('disease_collection',Diseaseschema);

export default DiseaseSchemaModel