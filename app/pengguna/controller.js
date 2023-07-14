const User = require("../user/model");
const bcrypt = require("bcryptjs");
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
      const usr = await User.findOne({ email });
      if (usr) {
        req.flash("alertMessage", `${email} sudah ada`);
        req.flash("alertStatus", "danger");
        res.redirect("/pengguna");
      } else {
        let hashpassword = await bcrypt.hash(password, 10);
        const user = await User({
          email,
          password: hashpassword,
          nama: name,
        });
        await user.save();
        req.flash("alertMessage", `Berhasil membuat data ${name}`);
        req.flash("alertStatus", "success");
        res.redirect("/pengguna");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pengguna");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const usr = await User.findOne({ _id: id });
      res.render("admin/tambahpengguna/edit", {
        title: "Edit Dokumen Terkendali",
        usr,
        name: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/dokumen");
    }
  },
  editPengguna: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password, name } = req.body;
      let hashpass = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { _id: id },
        {
          email,
          password: hashpass,
          nama: name,
        }
      );
      req.flash("alertMessage", `Berhasil mengubah data ${name}`);
      req.flash("alertStatus", "success");
      res.redirect("/pengguna");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pengguna");
    }
  },
  deleteDokumen: async (req, res) => {
    try {
      const { id } = req.params;
      const usr = await User.findOne({ _id: id });

      await User.findOneAndUpdate({ _id: id }, { isdeleted: true });
      req.flash("alertMessage", `Berhasil menghapus ${usr.email}`);
      req.flash("alertStatus", "success");
      res.redirect("/pengguna");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pengguna");
    }
  },
  aktifkan: async (req, res) => {
    try {
      const { id } = req.params;
      const usr = await User.findOne({ _id: id });
      await User.findOneAndUpdate({ _id: id }, { isdeleted: false });
      req.flash("alertMessage", `Berhasil mengaktifkan kembali ${usr.email}`);
      req.flash("alertStatus", "success");
      res.redirect("/pengguna");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/pengguna");
    }
  },
};
