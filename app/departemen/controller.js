const Departemen = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      const departemen = await Departemen.find({ isdeleted: false });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/departemen/view_departemen", {
        alert,
        title: "Departemen",
        departemen,
        name: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/departemen");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/departemen/create", {
        title: "Tambah Departemen",
        name: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/departemen");
    }
  },
  createDepartemen: async (req, res) => {
    try {
      const { nameDepartemen } = req.body;
      const dep = await Departemen.findOne({ nameDepartemen });
      if (dep) {
        if (dep.isdeleted === true) {
          await Departemen.findOneAndUpdate(
            { nameDepartemen },
            { isdeleted: false }
          );
          req.flash("alertMessage", "Berhasil menambahkan data Departemen");
          req.flash("alertStatus", "success");
          res.redirect("/departemen");
        } else if (dep.isdeleted === false) {
          req.flash(
            "alertMessage",
            "Departemen yang anda masukan sudah ditambahkan"
          );
          req.flash("alertStatus", "success");
          res.redirect("/departemen");
        }
      } else {
        let departemen = await Departemen({ nameDepartemen });
        await departemen.save();
        req.flash("alertMessage", "Berhasil menambahkan data Departemen");
        req.flash("alertStatus", "success");
        res.redirect("/departemen");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/departemen");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const departemen = await Departemen.findOne({ _id: id });
      res.render("admin/departemen/edit", {
        title: "Edit Departemen",
        departemen,
        name: req.session.user.name,
        role: req.session.user.role,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/departemen");
    }
  },
  editDepartemen: async (req, res) => {
    try {
      const { id } = req.params;
      const { nameDepartemen } = req.body;
      const depart = await Departemen.findOne({ _id: id });
      await Departemen.findOneAndUpdate(
        {
          _id: id,
        },
        {
          nameDepartemen,
        }
      );
      req.flash(
        "alertMessage",
        `Berhasil mengubah data ${depart.nameDepartemen}`
      );
      req.flash("alertStatus", "success");
      res.redirect("/departemen");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/departemen");
    }
  },
  deleteDepartemen: async (req, res) => {
    try {
      const { id } = req.params;
      const nm = await Departemen.findOne({ _id: id });

      await Departemen.findOneAndUpdate({ _id: id }, { isdeleted: true });

      req.flash("alertMessage", `Berhasil menghapus data ${nm.nameDepartemen}`);
      req.flash("alertStatus", "success");
      res.redirect("/departemen");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/departemen");
    }
  },
};
