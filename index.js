const express=require("express");
const app=express();
const path=require("path");
const config=require("config");
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/img", express.static(path.join(__dirname, "static/images")));
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));
const userRoutes=require("./routers/user");
const adminRoutes = require("./routers/admin");

const Event=require("./models/events");
const Admin=require("./models/admin");
const Publication=require("./models/publications");
const sequelize=require("./data/db");
const locals = require("./middlewares/locals");
app.use(cookieParser());
app.use(
  session({
    secret: "eba1e643-853d-4475-840f-d8b49168a9f5", //session bilgilerini şifreleme
    resave: false, //her istekte session bilgilerini kaydetme
    saveUninitialized: false, //session bilgisi oluşmadan önce kaydetme
    cookie: {
      maxAge: 1000 * 60 * 60 * 1, //cookie süresi
    },
  })
);
app.use(locals);
app.use("/admin",adminRoutes);
app.use(userRoutes);

(async () => {
  await sequelize.sync({ alter: true });
})();
if(process.env.NODE_ENV=="production"){
  require("./production")(app);
}


const port=process.env.PORT;
app.listen(port || 3000,()=>{
    console.log(`listening on port ${port}`);
});