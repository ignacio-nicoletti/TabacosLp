import { formatError } from "../utils/formatError.js";
import { User } from "../models/user.js";
// import { sendNewPassword } from "../helpers/sendNewPassword.js";
// import bcryptjs from "bcryptjs";
// import { DecodedToken } from "../utils/DecodedToken.js";

export const getAllUser = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({ users }).select("-password");
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, country, email, carrito, image, dni, phone } =
    req.body.data.dataUpdate;

  let Name;
  let LastName;
  if (name || lastName) {
    Name = name[0].toUpperCase() + name.slice(1);
    LastName = lastName[0].toUpperCase() + lastName.slice(1);
  }

  try {
    let user = await User.findByIdAndUpdate(
      id,
      {
        name: Name,
        lastName: LastName,
        country: country,
        email: email,
        image: image,
        carrito: carrito,
        adress: req.body.data.dataUpdateAdress,
        dni: dni,
        phone: phone,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

// export const confirmEmail = async (req, res) => {
//   const { id } = req.params;
//   const { value } = req.body;
//   try {
//     let user = await User.findByIdAndUpdate(
//       id,
//       {
//         verify: value,
//       },
//       { new: true }
//     ).select("-password");

//     return res.status(200).json({ user });
//   } catch (error) {
//     res.status(400).json(formatError(error.message));
//   }
// };

// export const UpdatePassword = async (req, res) => {
//   const { email, password, token } = req.body;

//   try {
//     if (email) {
//       await User.findOne({ email: email }).then((data) => {
//         sendNewPassword(data.email);
//       });
//     } else if (password && token) {
//       const { value } = DecodedToken(token); //devolveria un email

//       if (value) {
//         const salt = await bcryptjs.genSalt(10);
//         let passwordHash = await bcryptjs.hash(password.toString(), salt); //hashea la password enviada

//         await User.findOneAndUpdate(
//           { email: value },
//           { $set: { password: passwordHash } } //la actualiza en la base
//         );
//       }
//     }
//     return res.status(200).json("password update");
//   } catch (error) {
//     res.status(400).json(formatError(error.message));
//   }
// };
