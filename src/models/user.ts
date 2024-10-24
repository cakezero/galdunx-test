import mongoose, { Schema, Document, Validator } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  userName: {type: String, required: boolean, minlength: [number, string]};
  password: {type: String, required: boolean, validate: Validator, minlength: [number, string]};
  email: {type: String, required: boolean, unique: Boolean, lowercase: boolean, validate: Validator};

}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    userName: {
      type: new String,
      required: true,
      minlength: [3, "Minimum length must be 3"],
    },
    email: {
      type: new String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator(value: string) {
          if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
          }
        },
      },
    },
    password: {
      type: new String,
      required: true,
      minlength: [8, "Minimum length must be 8"],
      validate: {
        validator(value: string) {
          if (value.toLowerCase().includes("password")) {
            throw new Error('Password must not contain "password"');
          }
        },
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
