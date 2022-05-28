import { Schema, model } from "mongoose";
import { TUser } from "../types/user";

const SUser = new Schema<TUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
},{
    versionKey: false
});

export const User = model<TUser>('User', SUser);