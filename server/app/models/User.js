const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
