import mongoose from 'mongoose';
import firm from './firm';

const bookingSchema = new mongoose.Schema(
    {
      username: { type: String, required: true },
      firmname: { type: String, required: true },
      dateTime: { type: Date, required: true },
      bookingDate: { type: Date, required: true },
      maintenance: { type: Number, required: true },
      acceptedMaintenance: { type: Boolean, required: true },
      area: { type: Number, required: true },
      type: { type: String, required: true },
      done: { type: Boolean, required: true },
      doneDate: { type: Date,  default: null},
      decorator: { type: String, default: null },
      fountain: { type: Number, default: null },
      gardenGreen: { type: Number, default: null },
      tablesCount: { type: Number, default: null },
      chairsCount: { type: Number, default: null },
      gardenPool: { type: Number, default: null },
      gardenFurniture: { type: Number, default: null },
      description: { type: String, default: null },
      services: {type: [{ name: String, price: Number }], default: []
    }
},{
    versionKey:false  
  }
);

export default mongoose.model('BookingModel', bookingSchema, 'bookings');
