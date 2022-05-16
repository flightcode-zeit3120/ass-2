import { Schema, model } from "mongoose";
import { TUser } from "../types/user";

const SUser = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = model<TUser>('User', SUser);