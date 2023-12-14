module.exports = (req, res, next) => {
  if (!req.session.isAuth) {
    return res.redirect("/admin/login?returnUrl=" + req.originalUrl); //req.originalUrl ile kullanıcının giriş yapmadan önceki url'sini alıyoruz.
  }
  next();
};