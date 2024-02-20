import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  Rol: {
    type: String,
    default: "ROL_User",
  },
  verify: {
    type: Boolean,
    default: false,
  },
  state: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
    default: "",
  },
  adress: {
    type: {},
    default: {
      codigoPostal: "",
      provincia: "",
      localidad: "",
      callePrincipal: "",
      calle1: "",
      calle2: "",
      numero: "",
      piso: "",
    },
  },
  admission: {
    type: Date,
  },
  buys: {
    type: Array,
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

userSchema.methods.comparePassword = async function (canditatePassword) {
  return await bcryptjs.compare(canditatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
