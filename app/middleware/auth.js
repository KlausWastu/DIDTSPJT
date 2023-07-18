module.exports = {
  isLogin: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash(
        "alertMessage",
        "Mohon maaf session anda telah berakhir, silahkan login kembali"
      );
      req.flash("alertStatus", "danger");
      res.redirect("/");
    } else {
      next();
    }
  },
  admin: (req, res, next) => {
    if (req.session.user.role === "admin") {
      return next();
    } else if (req.session.user.role === "user") {
      req.flash(
        "alertMessage",
        "Anda tidak ada hak untuk mengakses halaman ini"
      );
      req.flash("alertStatus", "danger");
      res.redirect("/departemen");
    }
  },
};
