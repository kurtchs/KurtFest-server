
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      required: [true, 'Email is required.'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    role: {
      type: String,
      enum:["user", "admin"],
      default: "user"
    }
  },
  {
    // configuracion adicional de mongo que crea 2 propiedades createdAt crea el momento en el que se creo ese documento y updatedAt acualizar e ir cambiando
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
