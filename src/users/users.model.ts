import * as mongoose from "mongoose";
import {environment} from '../common/environment'
import * as bcrypt from "bcrypt"

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.pre('save', function(next){
   const user = this as User;

  
  if(!user.isModified('password')){
    next()
  }else{
    bcrypt.hash(user.password, environment.security.saltRounds ).then(hash=> {
      user.password = hash;
      next()
    }).catch(next)

  }
})

export const User = mongoose.model<User>("User", userSchema);
