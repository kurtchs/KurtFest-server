
const { Schema, model } = require("mongoose");

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
    }
  },
  {
    // configuracion adicional de mongo que crea 2 propiedades createdAt crea el momento en el que se creo ese documento y updatedAt acualizar e ir cambiando
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
