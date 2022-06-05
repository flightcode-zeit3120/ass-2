import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validate from "deep-email-validator";
import { checkStrength } from "../utils/passwordStrength";
import { User } from "../models/user";

// Gets name of currently logged-in user
export async function getEmail(req, res) {
  const id = req.params.user;

  // Error checking
  const errors = [];

  // Check if value not inputted
  if (!id) {
    errors.push({ id: "required" });
  }

  // Output any errors
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  User.findOne({ _id: id }, "email -_id")
    .then((data) => res.json(data?.email));
}

// Finds user with given details, and logs in if correct. Creates JWT for session (Which should be used in Authorization header as "Bearer ...")
export async function logIn(req, res) {
  const { email, password } = req.body;

  // Error checking
  const errors = [];

  // Check if value not inputted
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }

  // Output any errors
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  User.findOne({ email }).then((data) => {
    if (!data) {
      return res.status(404).json({ errors: [{ email: "not found" }] });
    }

    bcrypt.compare(password, data.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(403).json({ errors: [{ password: "incorrect" }] });
      }
      jwt.sign(
        { id: data.id },
        process.env.TOKEN_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            return res.status(500).json({ errors: err });
          }

          if (token) {
            return res
              .status(200)
              .json({ message: "success", token: `${token}` });
          }
        }
      );
    });
  });
}

// Creates user with given details
export async function register(req, res) {
  const { email, password } = req.body;

  // Error checking
  const errors = [];

  // Check if value not inputted
  if (!email) {
    errors.push({ email: "required" });
  }
  let emailCheck = await validate({
    email: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: false,
    validateDisposable: false,
    validateSMTP: false,
  })
  if (!emailCheck.valid) {
    errors.push({ email: "invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  let passwordStrength = checkStrength(password);
  if (!passwordStrength.strong) {
    errors.push({ password: "insecure", errors: passwordStrength.tests });
  }

  // Check if value already exists in database
  if (await User.exists({ email })) {
    errors.push({ email: "already exists" });
  }

  // Output any errors
  if (errors.length > 0) { 
    return res.status(422).json({ errors });
  }

  const user = new User({
    email,
    password,
  });

  // Encrypt password
  user.password = await bcrypt.hash(user.password, 10);

  user
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "success",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        errors: err,
      });
    });
}

export async function deleteUser(req, res){
  var userID = req.query.userID;

  // Error checking
  const errors = [];

  // Check if value not inputted
  if (!userID) {
    errors.push({ itemID: "required" });
  }

  // Run conversion after verifying it exists
  try {
    userID = new ObjectId(req.query.userID);
  } catch(e){
    errors.push({ userID: "must be a geniune user ID" })
    return res.status(422).json({ errors });
  }

  // Output any errors
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  User.deleteOne({ _id: userID})
  .then((data) => res.json(data));
}