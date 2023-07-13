const User = require("./model");
const bcrypt = require("bcryptjs");
module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/signin/view_signin", {
          title: "Sign In",
          alert,
        });
      } else {
        if (
          req.session.user.role === "admin" ||
          req.session.user.role === "user"
        ) {
          res.redirect("/dashboard");
        }
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await User.findOne({ email: email });
      if (check) {
        if (check.isdeleted === false) {
          const checkpass = await bcrypt.compare(password, check.password);
          if (checkpass) {
            req.session.user = {
              id: check._id,
              email: check.email,
              role: check.role,
              name: check.nama,
            };
            if (check.role === "admin" || check.role === "user") {
              res.redirect("/dashboard");
            }
          } else {
            req.flash("alertMessage", `Password yang anda masukan salah`);
            req.flash("alertStatus", "danger");
            res.redirect("/");
          }
        } else {
          req.flash(
            "alertMessage",
            `Akun anda sudah di non-aktifkan oleh admin, silahkan hubungi Admin dan coba lagi`
          );
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash(
          "alertMessage",
          `Email yang anda masukan salah, Silahkan coba lagi`
        );

        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
