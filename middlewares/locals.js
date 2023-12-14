module.exports = function (req, res, next) {
  res.locals.isAuth = req.session.isAuth; //locals ile ejs dosyasında kullanılabilir. is Auth session bilgisini tüm ejs dosyalarında kullanabiliriz.
  res.locals.username = req.session.username;
  res.locals.name=req.session.name;
  res.locals.surname=req.session.surname;
  next(); //
};