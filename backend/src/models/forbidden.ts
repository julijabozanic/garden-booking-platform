import mongoose from 'mongoose'

const forbiddenSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true }
    },{
      versionKey:false  
    }
);

export default mongoose.model('ForbiddenModel', forbiddenSchema, 'forbiddens');
