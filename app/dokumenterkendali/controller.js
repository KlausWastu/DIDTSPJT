const Dokumen = require("./model");
const Departemen = require("../departemen/model");
module.exports = {
  index: async (req, res) => {
    const dokumen = await Dokumen.find({ isdeleted: false }).populate(
      "pemegangDokumen"
    );
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/dokumenterkendali/view_dokumen", {
        alert,
        title: "Dokumen Terkendali",
        dokumen,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dokumen");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const departemen = await Departemen.find({ isdeleted: false });
      res.render("admin/dokumenterkendali/create", {
        title: "Tambah Dokumen Terkendali",
        departemen,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dokumen");
    }
  },
  createDokumen: async (req, res) => {
    try {
      const { namaDokumen, kodeDok, revisi, pemegangDok } = req.body;
      const dokumen = await Dokumen({
        NamaDokumen: namaDokumen,
        revisi,
        kodeDok,
        pemegangDokumen: pemegangDok,
      });
      await dokumen.save();
      req.flash("alertMessage", `Berhasil membuat data ${namaDokumen}`);
      req.flash("alertStatus", "success");
      res.redirect("/dokumen");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dokumen");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const dok = await Dokumen.findOne({ _id: id }).populate(
        "pemegangDokumen"
      );
      const departemen = await Departemen.find({ isdeleted: false });
      res.render("admin/dokumenterkendali/edit", {
        title: "Edit Dokumen Terkendali",
        dok,
        departemen,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dokumen");
    }
  },
  editDokumen: async (req, res) => {
    try {
      const { id } = req.params;
      const { namaDokumen, kodeDok, revisi, pemegangDok } = req.body;
      await Dokumen.findOneAndUpdate(
        { _id: id },
        {
          NamaDokumen: namaDokumen,
          revisi,
          kodeDok,
          pemegangDokumen: pemegangDok,
        }
      );
      req.flash("alertMessage", `Berhasil mengubah data ${namaDokumen}`);
      req.flash("alertStatus", "success");
      res.redirect("/dokumen");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dokumen");
    }
  },
  deleteDokumen: async (req, res) => {
    try {
      const { id } = req.params;
      const dok = await Dokumen.findOne({ _id: id });

      await Dokumen.findOneAndUpdate({ _id: id }, { isdeleted: true });
      req.flash("alertMessage", `Berhasil menghapus data ${dok.NamaDokumen}`);
      req.flash("alertStatus", "success");
      res.redirect("/dokumen");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dokumen");
    }
  },
};
