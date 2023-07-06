const mongoose = require("mongoose")
const mongoose_delete = require("mongoose-delete")
let dokumenSchema = mongoose.Schema(
    {
      NamaDokumen: {
        type: String,
        require: [true || "Nama Dokumen harus di isi"],
      },
      kodeDok: {
        type:String,
        require: [true]
      },
      revisi: {
        type: Number,
      },
      pemegangDokumen: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Departemen"
      },
      isdeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  dokumenSchema.plugin(mongoose_delete, {
    deleteAt: true,
  });
  module.exports = mongoose.model("DokumenTerkendali", dokumenSchema);