const express=require("express");
const app=express();
const path=require("path");
const config=require("config");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/img", express.static(path.join(__dirname, "static/images")));

const userRoutes=require("./routers/user");
const adminRoutes = require("./routers/admin");

const Event=require("./models/events");

const sequelize=require("./data/db");
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
})