const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
let userSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      require: [true || "Nama harus di isi"],
    },
    email: {
      type: String,
      require: [true || "Email harus di isi"],
    },
    password: {
      type: String,
      require: [true || "Password harus di isi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.plugin(mongoose_delete, {
  deleteAt: true,
});
module.exports = mongoose.model("User", userSchema);
