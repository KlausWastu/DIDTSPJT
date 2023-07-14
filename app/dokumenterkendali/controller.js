const Dokumen = require("./model");
const Departemen = require("../departemen/model");
const ExcelJS = require("exceljs");
module.exports = {
  index: async (req, res) => {
    try {
      const dokumen = await Dokumen.find({ isdeleted: false }).populate(
        "pemegangDokumen"
      );
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/dokumenterkendali/view_dokumen", {
        alert,
        title: "Dokumen Terkendali",
        dokumen,
        name: req.session.user.name,
        role: req.session.user.role,
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
        name: req.session.user.name,
        role: req.session.user.role,
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
        name: req.session.user.name,
        role: req.session.user.role,
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
  exportExcel: async (req, res) => {
    const dokumen = await Dokumen.find({ isdeleted: false }).populate(
      "pemegangDokumen"
    );
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Dokumen Terkendali");

    worksheet.columns = [
      { header: "No", key: "no", width: 5 },
      { header: "Nama Dokumen", key: "namaDokumen", width: 20 },
      { header: "Kode Dok / Nomor Salinan", key: "kodeDok", width: 40 },
      { header: "Revisi", key: "revisi", width: 8 },
      { header: "Pemegang Dokumen", key: "pemegangDokumen", width: 30 },
    ];

    dokumen.forEach((dok, index) => {
      worksheet.addRow({
        no: index + 1,
        namaDokumen: dok.NamaDokumen,
        kodeDok: dok.kodeDok,
        revisi: dok.revisi,
        pemegangDokumen: dok.pemegangDokumen.nameDepartemen,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=suratkeluar.xlsx"
    );

    workbook.xlsx
      .write(res)
      .then(() => {
        res.end();
      })
      .catch((err) => {
        console.error("Terjadi kesalahan dalam mengirim file Excel:", err);
        res.status(500).send("Terjadi kesalahan dalam mengirim file Excel.");
      });
  },
};
