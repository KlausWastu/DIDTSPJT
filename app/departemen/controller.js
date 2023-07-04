const Departemen = require("./model")
module.exports = {
    index: async(req,res)=> {
        const departemen = await Departemen.find({isdeleted: false})
        try {
            res.render("admin/departemen/view_departemen", {
                title: "Departemen",
                departemen
            })
        } catch (err) {
            console.log(err)
        }
    }, 
    viewCreate:async(req,res)=>{
        try {
            res.render("admin/departemen/create",{
                title: "Tambah Departemen"
            })
        } catch (err) {
            console.log(err)
        }
    }, 
    
}