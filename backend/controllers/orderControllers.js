import Order from '../models/orderModel.js' //the order data structure in the DB
import asyncErrorhandler from 'express-async-handler' //an npm pack for handling errors instead of using try catch


//POST request for creating a new order in the DB,  private route: /api/orders
const createOrder = asyncErrorhandler(async (req,res)=>{
    
    //destructure data from the body. (we got it from PlaceOrderScreen.js)
    //orderItems= an array of the items.
    const {
        orderItems, 
        shippingAddress, 
        paymentMethod,
        itemsTotalPrice,
        taxPrice, 
        shippingPrice,
        totalOrderPrice
    }= req.body 

    if(orderItems && orderItems.length ===0){
        res.status(400)
        throw new Error('Cart Is Empty')
        return
    }else{
        //create the order object according the order model
        const order = new Order({
        
            orderItems,
            user: req.user._id, //we want to attach the customer id- the one who filled the order. because it's a protected rout we will need the id to get the token
            shippingAddress, 
            paymentMethod,
            itemsTotalPrice,
            taxPrice, 
            shippingPrice,
            totalOrderPrice
            //order id will be generated in the db automatically
        })
        //save the order with the user data to the DB!!
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
        //res.status(201).json({massage:'Your order has been succwssfuly filled'})
    }
})

//GET request for fetching an order from the DB by order id,  private route: /api/orders/:id
const getOrderById = asyncErrorhandler(async (req,res)=>{
    
    //search the DB for the order by the id in the URL params.
    const order = await Order.findById(req.params.id).populate(
        "user", 
        "name email"
        ) 
   // populate('user', 'name email') ==> will attach the order object with two more fields that are under the user model : email and name. 
   //it is possible because we created relations between the user and order schema.(check order model.)
   if(order){
       res.json(order)
   }else{
       res.status(404)
       throw new Error('Order not found')
   }

})


//PUT request- first  fetching an order from the DB by order id and then update some of it's status to fit a "paid-order"(therefore PUT)
//  private route: /api/orders/:id/pay
const updateOrderToPaidById = asyncErrorhandler(async (req,res)=>{
    
    //search the DB for the order by the id in the URL params.
    const order = await Order.findById(req.params.id)
 
  
   if(order){
       order.isPaid = true
       order.paidAt = Date.now()
       order.paymentResult = {
         //will be recieved from the paypal response, we will fetch this data from the body!
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address:  req.body.payer.email_address,  
        }
     
        const updatedOrder = await order.save()
        res.json(updatedOrder)
   }else{
       res.status(404)
       throw new Error('Order not found')
   }

})



//GET request- get specific user's order history (for user's profile screen)
//  private route: /api/orders/myorders
const allUserOrders = asyncErrorhandler(async (req,res)=>{
    
    //search the DB for the orders were the user index equals to the specific id in the URL params (it's the user that currently logged-in).
    const allMyOrders = await Order.find({user: req.user._id})
    res.json(allMyOrders)
 

})



export {createOrder, getOrderById, updateOrderToPaidById, allUserOrders}

