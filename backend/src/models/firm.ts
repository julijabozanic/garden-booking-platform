import mongoose from 'mongoose';

const firmSchema = new mongoose.Schema(
    {
    name: String,
    address: String,
    services: Array,
    location: String,
    contact: String,
    vacationFrom: Date,
    vacationTo: Date,
    decorators: Array
},{
    versionKey:false  
  }
);

export default mongoose.model('FirmModel', firmSchema, 'firms');
