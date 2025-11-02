import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  ContactDetail: {
    type: String,
    required: true,
  },
  organization:{
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  replied: {
    type: Boolean,
    default: false
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  }  

},{ timestamps: true });



const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
