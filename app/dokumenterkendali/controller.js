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
    // createDepartemen: async(req,res)=>{
    //     try {
    //         const {nameDepartemen} = req.body
    //         const dep = await Departemen.findOne({nameDepartemen})
    //         if(dep){
    //             if(dep.isdeleted===true){
    //                 await Departemen.findOneAndUpdate(
    //                     { nameDepartemen },
    //                     { isdeleted: false }
    //                   );
    //                 req.flash("alertMessage", "Berhasil menambahkan data Departemen");
    //                 req.flash("alertStatus", "success");
    //                 res.redirect("/departemen");
    //             } else if(dep.isdeleted===false){
    //                 req.flash(
    //                     "alertMessage",
    //                     "Departemen yang anda masukan sudah ditambahkan"
    //                   );
    //                   req.flash("alertStatus", "success");
    //                   res.redirect("/departemen");
    //             }
    //         } else {
    //             let departemen = await Departemen({ nameDepartemen });
    //             await departemen.save();
    //             req.flash("alertMessage", "Berhasil menambahkan data Departemen");
    //             req.flash("alertStatus", "success");
    //             res.redirect("/departemen");
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
}