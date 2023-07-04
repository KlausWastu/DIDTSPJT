const mongoose = require("mongoose")
const mongoose_delete = require("mongoose-delete")
let departemenSchema = mongoose.Schema(
    {
      nameDepartemen: {
        type: String,
        require: [true || "Nama Departemen harus di isi"],
      },
      isdeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  departemenSchema.plugin(mongoose_delete, {
    deleteAt: true,
  });
  module.exports = mongoose.model("Departemen", departemenSchema);