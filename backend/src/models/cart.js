import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Listing', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    default: 1, 
    min: 0.01 
  },
  unit: {
    type: String,
    enum: ['Kg', 'Mt'], 
    required: true
  }
});

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
