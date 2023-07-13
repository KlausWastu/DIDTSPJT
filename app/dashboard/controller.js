module.exports = {
  index: async (req, res) => {
    try {
      res.render("admin/dashboard/dashboard", {
        title: "Dashboard",
        name: req.session.user.name,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
