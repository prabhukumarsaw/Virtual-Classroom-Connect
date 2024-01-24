import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  fullname: {
    type: String,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  education: String,
  location: String,
  friends: {
    type: Number,
  },
  kudos: String,
  focus_time: String,
  sex: String,
  interests: {
    type: [String],
    default: [],
  },
  imageUrl: String,
  about: String,
});



//pre method:  save karne se pahle target krna hain

//----------------------- secure password using bcryptjs--------------------------//



userSchema.pre('save', async function(next){
    const user = this; // get data

    if(!user.isModified("password")) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});


//jwt

userSchema.methods.generateToken = function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            role: this.role,
        },
        'HELLOEYERTONE',  //seceret key
        {
            expiresIn: "30d",
        }
        );
    } catch (error) {
        console.log(error);
    }
}

















const User = mongoose.model("User", userSchema);
export { User };




