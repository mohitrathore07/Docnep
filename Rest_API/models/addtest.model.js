import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


const TestSchema = mongoose.Schema ({ 
    _id: Number,  
    collection_name: String,
    TestName: {
        type: String, 
        required: [true, "Test name is required"], 
        lowercase: true,
        trim: true,  
    },

    Testtype: {
        type: String, 
        required: [true, "Test type is required"], 
        lowercase: true,
        trim: true,  
    },

    Fees: {
        type: Number, 
        required: [true, "Test Fees is required"],  
        lowercase: true,
        trim: true,  
    },

    Testiconnm: {
        type: String, 
        required: [true, "Test icon name is required"], 
        trim: true,     
    },

    Details: {
        type: String,
        required: [true,"Detials is required"],
        trim: true
    },

    info: String 
});

TestSchema.plugin(uniqueValidator);

const TestSchemaModel = mongoose.model('test_collection',TestSchema);

export default TestSchemaModel