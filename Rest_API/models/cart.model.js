import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Cart = mongoose.Schema ({ 
    _cid: Number,
    
    collection_name: String,
    
    ProductName: {
        type: String, 
        required: [true, "Product name is required"], 
        lowercase: true,
        trim: true,  
    },
    email : {
        type: String, 
        required: [true, "Email  is required"], 
        lowercase: true,
        trim: true,
    },

    info: String 
});

Cart.plugin(uniqueValidator);

const CartModel = mongoose.model('cart_collection',Cart);

export default CartModel;