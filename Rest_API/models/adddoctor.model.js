import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Doctorsschema = mongoose.Schema ({ 
    _id: Number,  
    collection_name: String,
    DrName: {
        type: String, 
        required: [true, "name is required"], 
        lowercase: true,
        trim: true,  
    },
    DrEmail: {
        type: String, 
        required: [true, "Email is required"],  
        unique: true, 
        lowercase: true,
        trim: true,  
    },
    DrPhone: {
        type: String,
        required: [true, "Mobile is required"],
        maxlength: 10,
        minlength:10,
        trim: true
    },
 
    DrConsultancyFee: Number,

    DrSpecialization: {
        type: String,
        required: [true,"Specialization is required"],
        trim: true
    },
    DrAddress: {
        type: String,
        required: [true, "Address is required"],
        trim:true
    },
    DrLocation: {
        type: String,
        required: [true, "Location is required"],
        trim:true
    },
    DrDetails: {
        type: String,
        required: [true, "Details is required"],
        trim:true
    },
    Driconnm: {
        type: String, 
        required: [true, "Doctors icon name is required"], 
        trim: true,     
    },
    info: String 
});

Doctorsschema.plugin(uniqueValidator);

const DoctorSchemaModel = mongoose.model('Doctor_collection',Doctorsschema);

export default DoctorSchemaModel