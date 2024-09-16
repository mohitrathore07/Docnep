import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Order = mongoose.Schema ({ 

    _oid: Number,    
    status: Number,    
    
    items : [{
        _uid : Number,

        ProductName: {
            type: String, 
            required: true
        },

        quantity: { 
            type: Number, 
            required: true 
        },
        collection_name: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
            required: true,
        },
    }],
    totalAmount: String,
    info: String 
});

Order.plugin(uniqueValidator);

const OrderModel = mongoose.model('order_collection',Order);

export default OrderModel;