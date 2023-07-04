module.exports = {
    index: async(req,res)=> {
        try {
            res.render("admin/departemen/view_departemen", {
                title: "Departemen"
            })
        } catch (error) {
            console.log(error)
        }
    }
}