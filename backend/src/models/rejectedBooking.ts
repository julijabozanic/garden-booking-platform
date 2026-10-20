import mongoose from 'mongoose';

const rejectedBookingSchema = new mongoose.Schema(
    {
      idBooking: { type: String, required: true },
      username: { type: String, required: true },
      comment: { type: String, required: true }
    }
    ,{
    versionKey:false  
  }
);

export default mongoose.model('RejectedBookingModel', rejectedBookingSchema, 'rejectedBookings');
