import mongoose, { mongo } from "mongoose";
const schema =new mongoose.Schema({

shippingInfo:{
    hNo:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
   
    phoneNo:{
        type:Number,
        required:true,
    },
    pinCode:{
        type:Number,
        required:true,
    },
},

orderItems:{
    cheeseBurger:{
        price:{
            type:Number,
            required:true,

        },
        quantity:{
            type:Number,
            required:true,
            
        }
    },
    vegCheeseBurger:{
        price:{
            type:Number,
            required:true,

        },
        quantity:{
            type:Number,
            required:true,
            
        }
    },
    BurgerWithFries:{
        price:{
            type:Number,
            required:true,

        },
        quantity:{
            type:Number,
            required:true,
           
        }
    }
}
,
user:{
type:mongoose.Schema.ObjectId,
ref:"User",
required:true
},
paymentMethod:{
    type:String,
    enum:["COD","ONLINE"],
    default:"COD",
},
pqymentInfo:{
type:mongoose.Schema.ObjectId,
ref:"Payment"
}
,
paidAt:{
    type:Date,
    
},
itemsPrice:{
    type:Number,
    default:0
}
,taxPrice:{
    type:Number,
    default:0
}
,shippingCharges:{
    type:Number,
    default:0
},
totalAmount:{
    type:Number,
    default:0
}
,
orderStatus:{
    type:String,
    enum:["Preparing","Shipped","Delivered"],
    default:"Preparing",
}
,
deliveredAt:{
    type:Date,
}
,createdAt:{
    type:Date,
    default:Date.now()
}
});


export const Order= mongoose.model("Order",schema);