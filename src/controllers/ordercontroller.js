import mongoose from "mongoose";
import Order from "../models/order.js"; // Assuming this is the file where your schema is defined.
import Product from "../models/product.js";

const placeOrder = async (req, res) => {
 
    const { product, price, user } = req.body;

    if (!product || !price || !user) {
      return res.status(400).json({ message: "Product, price, and user are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (existingProduct.price !== price) {
      return res.status(400).json({ message: "Price mismatch with product price" });
    }

    // Create the order
    const newOrder = await Order.create({
      user,
      product,
      price,
    });

    await Product.findByIdAndUpdate(product, {
        $push: { orderitems: newOrder._id },
      });
    const populatedOrder = await Order.findById(newOrder._id)
      .populate("user", "username email") 
      .populate("product", "name description price"); 

    res.status(201).json({
      message: "Order placed successfully",
      order: populatedOrder,
    });
  
};

const Allorder = async (req, res) => {
    try {
      const {user} = req.body; 
  
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      const orders = await Order.find({user })
        .populate("user", "username email") 
        .populate("product", "name description price") 
        .sort({ createdAt: -1 });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user" });
      }
  
      res.status(200).json({
        message: "Orders retrieved successfully",
        orders,
      });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving orders", error: error.message });
    }
  };
  const getDetails = async (req, res) => {
  const { id } = req.params; 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

    const order = await Order.findById(id)
      .populate("user", "username email") 
     

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order details fetched successfully",
      order, 
    });
  
};

export {placeOrder,Allorder,getDetails}