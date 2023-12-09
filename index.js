const express=require("express");
const app=express();
const path=require("path");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/img", express.static(path.join(__dirname, "static/images")));
const userRoutes=require("./routers/user");
app.use(userRoutes);

app.listen(3000,()=>{
    console.log("listening on port 3000");
})