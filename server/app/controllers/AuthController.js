require("dotenv").config();
const User = require("../models/User");
const Role = require("../models/Role");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
  //[GET] /api/auth/
  async getUser(req, res) {
    try {
      const hasUser = await User.findById(req.userId)
        .select("-password")
        .populate("roles", "-__v -_id -created_at");
      if (!hasUser) return res.status(400).json({ success: false, message: "User not found" });
      res.json({ success: true, hasUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  //[POST] /api/auth/signup
  async signup(req, res) {
    const { name, password, email, roles } = req.body;

    try {
      //Check role exists
      if (roles) {
        const hasRoles = await Role.find({ name: { $in: roles } });
        if (!hasRoles) {
          return res.status(400).json({ success: false, message: "Role not found" });
        }
      }

      //Check duplicate email
      const hasEmail = await User.findOne({ email });
      if (hasEmail) {
        return res
          .status(400)
          .json({ success: false, message: "Failed, Email is already in use!" });
      }

      // Create new user
      const hashedPassword = await bcrypt.hashSync(password, 10);
      const newUser = new User({ name, password: hashedPassword, email });

      // Set role for user
      if (roles) {
        const hasRoles = await Role.find({ name: { $in: roles } });
        const ROLES = [];

        // Create array ROLES
        for (let role of hasRoles) {
          ROLES.push(role.name);
        }
        // Check roles exist ?
        for (let role of roles) {
          if (!ROLES.includes(role)) {
            return res
              .status(400)
              .json({ success: false, message: `Failed, Role ${role} does not exist!` });
          }
        }

        newUser.roles = hasRoles.map(role => role._id);
      } else {
        const hasRole = await Role.findOne({ name: "user" });
        newUser.roles = [hasRole._id];
      }

      await newUser.save();

      res.json({ success: true, message: "New user was registered successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  //[POST] /api/auth/signin
  async signin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing email and/or password" });
    }

    try {
      const hasUser = await User.findOne({ email }).populate("roles");
      if (!hasUser) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect email and/or password!" });
      }

      const passwordIsValid = await bcrypt.compareSync(password, hasUser.password);
      if (!passwordIsValid) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect email and/or password!" });
      }

      // Token;
      const accessToken = jwt.sign(
        { userId: hasUser._id },
        process.env.ACCESS_TOKEN_SECRET
        //{expiresIn: 86400, // 24 hours}
      );

      const authorities = [];
      for (let roles of hasUser.roles) {
        authorities.push("" + roles.name.toUpperCase());
      }
      res.status(200).json({
        success: true,
        message: "User logged in successfully!",
        name: hasUser.name,
        email: hasUser.email,
        roles: authorities,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
