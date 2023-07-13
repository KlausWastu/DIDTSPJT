const User = require("../user/model");
module.exports = {
  index: async (req, res) => {
    try {
      const user = await User.find({ role: "user" });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/tambahpengguna/view_pengguna", {
        alert,
        title: "Pengguna",
        user,
        name: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pengguna");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/tambahpengguna/create", {
        title: "Tambah Pengguna",
        name: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pengguna");
    }
  },
  createDokumen: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const user = await User({
        email,
        password,
        nama: name,
      });
      await user.save();
      req.flash("alertMessage", `Berhasil membuat data ${nama}`);
      req.flash("alertStatus", "success");
      res.redirect("/pengguna");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pengguna");
    }
  },
  //   viewEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const dok = await Dokumen.findOne({ _id: id }).populate(
  //         "pemegangDokumen"
  //       );
  //       const departemen = await Departemen.find({ isdeleted: false });
  //       res.render("admin/dokumenterkendali/edit", {
  //         title: "Edit Dokumen Terkendali",
  //         dok,
  //         departemen,
  //         name: req.session.user.name,
  //         role: req.session.user.role,
  //       });
  //     } catch (err) {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/dokumen");
  //     }
  //   },
  //   editDokumen: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { namaDokumen, kodeDok, revisi, pemegangDok } = req.body;
  //       await Dokumen.findOneAndUpdate(
  //         { _id: id },
  //         {
  //           NamaDokumen: namaDokumen,
  //           revisi,
  //           kodeDok,
  //           pemegangDokumen: pemegangDok,
  //         }
  //       );
  //       req.flash("alertMessage", `Berhasil mengubah data ${namaDokumen}`);
  //       req.flash("alertStatus", "success");
  //       res.redirect("/dokumen");
  //     } catch (err) {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/dokumen");
  //     }
  //   },
  //   deleteDokumen: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const dok = await Dokumen.findOne({ _id: id });

  //       await Dokumen.findOneAndUpdate({ _id: id }, { isdeleted: true });
  //       req.flash("alertMessage", `Berhasil menghapus data ${dok.NamaDokumen}`);
  //       req.flash("alertStatus", "success");
  //       res.redirect("/dokumen");
  //     } catch (err) {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/dokumen");
  //     }
  //   },
};
