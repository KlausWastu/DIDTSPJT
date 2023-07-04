module.exports = {
    index: async(req,res)=> {
        try {
            res.render("admin/dashboard/dashboard", {
                title: "Dashboard"
            })
        } catch (error) {
            console.log(error)
        }
    }
}