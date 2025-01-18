import asyncHandler from "../middlewares/asynchandler.js";
import Order from "../models/order.model.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config()
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51L9UqtG0EzPHWgTDVYnc5JN2mZeTJVJL4xPLUrckxRI4cLqM99NtEcfv7X9zll8k98xHajJouexwEWmcNZaDxDex00HzgsqPH4"
);

const addOrderItems = asyncHandler(async (req, res) => {
  console.log("req.body:::", req.body);
  const paymentMethod = "card";
  const products = req.body;

  // Hardcode the frontend origin (3000) for success and cancel URLs
  const clientOrigin = "http://localhost:3000"; // Ensure this is always the frontend URL

  // Validate input
  if (!products || products.length === 0) {
    res.status(400);
    throw new Error("No order items provided");
  }

  if (!paymentMethod) {
    res.status(400);
    throw new Error("Payment method is required");
  }

  // Calculate prices
  const itemsPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const taxPrice = +(itemsPrice * 0.1).toFixed(2); // Example: 10% tax
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Example: free shipping over $100
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  // Prepare Stripe line items
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.image], // Dynamic image URL
      },
      unit_amount: Math.round(product.price * 100), // Convert to cents
    },
    quantity: product.quantity,
  }));

  // Hardcode the success and cancel URLs to point to the frontend (3000)
  const successUrl = `${clientOrigin}/payment/success`;
  const cancelUrl = `${clientOrigin}/payment/cancel`;

  // Create a Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  // Create order in the database
  const order = new Order({
    user: req.user?._id || "000000000000000000000000", // Dummy user ID if not provided
    orderItems: products.map((product) => ({
      name: product.name,
      qty: product.quantity,
      image: product.image,
      price: product.price,
      product: product._id,
    })),
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    shippingAddress: {
      address: "123 Dummy Street",
      city: "Dummville",
      postalCode: "00000",
      country: "Dummyland",
    },
    paymentResult: {
      id: session.id,
      status: "pending",
      update_time: new Date().toISOString(),
      email_address: "dummy@dummy.com",
    },
    isPaid: false,
    isDelivered: false,
  });

  const createdOrder = await order.save();

  res.status(201).json({
    order: createdOrder,
    stripeSessionUrl: session.url,
  });
});

const updateStatusMigration = async (req, res) => {
  const updated_payment_status = await Order.updateMany(
    { isPaid: false },
    { $set: { isPaid: true } }
  );

  if (updated_payment_status.modifiedCount > 0) {
    res.status(200).json({
      message: `${updated_payment_status.modifiedCount} records updated successfully.`,
    });
  } else {
    res.status(404).json({
      message: 'No records were found with isPaid: false.',
    });
  }
};
const rollbackByLastUpdatedDate = asyncHandler(async (req, res) => {
  // Start a session for the transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Specify the last date/time of the migration (when it was run)
    const migrationDate = new Date('2024-11-23T20:15:00.000Z'); // Adjust this to your migration date

    // Find all orders that were updated after the migration date
    const ordersToRollback = await Order.find({
      updatedAt: { $gt: migrationDate }, // Find records updated after the migration date
    }).session(session);

    // Loop through each order and revert the `isPaid` status
    for (let order of ordersToRollback) {
      // Assume the migration mistakenly set `isPaid` to `true` and we want to revert it back to `false`
      if (order.isPaid === true) {
        // Revert the `isPaid` status to `false`
        await Order.findByIdAndUpdate(order._id, { isPaid: false }, { session });
      }
    }

    // Commit the transaction to ensure all operations are successful
    await session.commitTransaction();

    // Respond with how many records were reverted
    res.status(200).json({
      message: `${ordersToRollback.length} orders reverted successfully.`,
    });
  } catch (error) {
    // If anything goes wrong, abort the transaction and rollback
    await session.abortTransaction();
    res.status(500).json({
      message: 'Transaction failed, no changes were made.',
      error: error.message,
    });
  } finally {
    // End the session
    session.endSession();
  }
});

const getTranscationHistory=asyncHandler(async(req,res)=>{
  console.log("req:::");
  const userId="6739e2a44a06b97bb3903ad2"
  //check if user id is provided
  if(!userId){
    return res.status(400).json({msg:"User id is required"})
  }
  //check if user id is valid mongodb id
  if(!mongoose.Types.ObjectId.isValid(userId)){
    return res.status(400).json({msg:"Invalid user id"})
  }
  //fetch record by userid from query params
  const transactions=await Order.find({user:userId, isPaid:true, }).sort({updatedAt:-1})
  console.log("transactions:::",transactions);
  res.status(200).json(transactions)


  res.status(200).json(transactions)
 
})

export { addOrderItems, updateStatusMigration,getTranscationHistory };
