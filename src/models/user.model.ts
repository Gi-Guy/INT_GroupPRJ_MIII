import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
      },
      registeredAt: {
        type: Number,
        required: true
      }
});

export const UserModel = mongoose.model('User', userSchema);