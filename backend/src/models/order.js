import mongoose, { Schema } from 'mongoose';

const ProductItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Listing',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ['Kg', 'Mt'], 
    required: true
  }
}, { _id: false });

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  identifier: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: {
    type: [ProductItemSchema],
    validate: v => Array.isArray(v) && v.length > 0,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['cash_on_delivery', 'card'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  paymentId: {
    type: String,
  },
  note: {
    type: String,
  }
}, {
  timestamps: true,
});

orderSchema.index({ userId: 1, status: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
