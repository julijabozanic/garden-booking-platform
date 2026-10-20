import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      sex: { type: String, required: true },
      address: { type: String, required: true },
      telephone: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      picture: { type: String },
      card: { type: String, required: true },
      type: { type: String, required: true },
      salt: { type: String, required: true },
      activated: { type: Boolean, required: true },
      free: { type: Boolean, required: true },
      firm: { type: String, default: null },
    },{
      versionKey:false  
    }
);

// export default mongoose.model('UserModel', 
// userSchema, 'users');

const UserM = mongoose.model('UserModel', userSchema, 'users');
const RequestM = mongoose.model('RequestModel', userSchema, 'requests');

export { UserM, RequestM };