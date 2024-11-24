import asyncHandler from "../middlewares/asynchandler.js";
import Order from "../models/order.model.js";
import dotenv from 'dotenv'
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
  
  export { addOrderItems };
  