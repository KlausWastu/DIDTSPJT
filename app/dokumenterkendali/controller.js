const Dokumen = require("./model")
const Departemen =require("../departemen/model")
module.exports = {
    index: async(req,res)=> {
        const dokumen = await Dokumen.find({isdeleted: false})
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            res.render("admin/dokumenterkendali/view_dokumen", {
                alert,
                title: "Dokumen Terkendali",
                dokumen
            })
        } catch (err) {
            console.log(err)
        }
    }, 
    viewCreate:async(req,res)=>{
        try {
            const departemen = await Departemen.find({isdeleted:false})
            res.render("admin/dokumenterkendali/create",{
                title: "Tambah Dokumen Terkendali",
                departemen
            })
        } catch (err) {
            console.log(err)
        }
    }, 
    createDokumen: async(req,res)=>{
        try {
            const {namaDokumen, kodeDok, revisi, pemegangDok} = req.body
            const dokumen = await Dokumen({NamaDokumen: namaDokumen, revisi, kodeDok, pemegangDokumen: pemegangDok})
            await dokumen.save()
            req.flash("alertMessage", `Berhasil menambahkan data ${namaDokumen}`);
            req.flash("alertStatus", "success");
            res.redirect("/dokumen");
        } catch (err) {
            console.log(err)
        }
    }
}