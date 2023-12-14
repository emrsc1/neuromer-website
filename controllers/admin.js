const Event=require("../models/events");
const Publication=require("../models/publications");
const Admin=require("../models/admin");
const bcrypt = require("bcrypt");
const { Op} = require("sequelize");
const sequelize = require("../data/db");
const slugField = require("../helpers/slugfield");
const fs=require("fs");
exports.index = async function (req, res) {
  try {
    return res.render("admin/index", {
      title: "Neuromer Admin",
    });
  } catch (err) {
    console.log(err);
  }
};  
exports.get_events=async function(req,res){
    
    const events= await Event.findAll();
    try{
         return res.render("admin/events",{
            title:"Admin Events",
            events:events,
            action:req.query.action,
         })
    }catch(err){
        console.log(err);
    }
}
exports.get_event_create=async function(req,res){
    try{
        return res.render("admin/event-create",{
            title:"Add Event",
        })
    }
    catch(err){
        console.log(err);
    }
}
exports.post_event_create = async function (req, res) {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file.filename;
  const date = req.body.date;
  const time = req.body.time;
  const link = req.body.link;
  try {
    await Event.create({
      title: title,
      url: slugField(title),
      description: description,
      image: image,
      date: date,
      time: time,
      link: link,
    });
    res.redirect("/admin/events?action=create");
  } catch (err) {
    console.log(err);
  }
};
exports.get_event_edit = async function (req, res) {
  const id = req.params.id;
  try {
    const events = await Event.findOne({
      where: {
        id: id,
      },
    });
    return res.render("admin/event-edit", {
      event: events,
      title: "Event Edit",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.post_event_edit=async function(req,res){
    const id=req.body.eventid;
    const title=req.body.title;
    const description=req.body.description;
    const date=req.body.date;
    const time=req.body.time;
    const link=req.body.link;
    const url=req.body.url;

    let image=req.body.image;
    if(req.file){
        image=req.file.filename;
        fs.unlink("./static/images/"+req.body.image,err=>{
            console.log(err);
        });
    }
    try{
        const events=await Event.findOne({
            where:{
                id:id
            }
        });
        await events.update({
            title:title,
            description:description,
            date:date,
            time:time,
            link:link,
            url:url,
            image:image
        });
        await events.save();
        return res.redirect("/admin/events?action=update");
    }
    catch(err){
        console.log(err);
    }
}
exports.get_event_delete=async function(req,res){
  const id=req.params.id;
  try{
     const event=await Event.findOne({
      where:{
        id:id
      }
     });
     res.render("admin/event-delete",{
      title:"Event Delete",
      event:event
     });
  }
  catch(err){
    console.log(err);
  }
}
exports.post_event_delete=async function(req,res){
  const id=req.body.id;
  try{
      const event=await Event.findByPk(id);
      if(event){
        await event.destroy();
        return res.redirect("/admin/events?action=delete");
      }
     res.redirect("/admin/events");
  }
  catch(err){
    console.log(err);
  }
}
exports.get_publications=async function(req,res){
   const publication = await Publication.findAll({
      order: [["id", "DESC"]], // id'ye göre ters sırada sırala
    });
  try{
   
     res.render("admin/publications", {
       title: "Admin Publications",
       publications: publication,
       action: req.query.action,
     });
  }
  catch(err){
    console.log(err);
  }
}
exports.get_publications_create=async function(req,res){
  try{
      res.render("admin/publications-create",{
        title:"Add Publication",
      });
  }
  catch(err){
      console.log(err);
  }
}
exports.post_publications_create=async function(req,res){
  const title=req.body.title;
  const image=req.file.filename;
  const description=req.body.description;
  const today = new Date();
  const date = today.toISOString().split("T")[0]; //2023-10-10
  const reverseDate = date.split("-").reverse().join(".");//10-10-2023
  try{
    await Publication.create({
      title: title,
      image: image,
      description: description,
      date:reverseDate,
      url: slugField(title),
    });
    res.redirect("/admin/publications?action=create");
  }
  catch(err){
    console.log(err);
  }
}
exports.get_publication_edit=async function(req,res){
  const id=req.params.id;
  try{
    const publication=await Publication.findOne({
      where:{
        id:id
      }
    });
    res.render("admin/publication-edit",{
      title:"Publication Edit",
      publication:publication
    });
    
  }
  catch(err){
    console.log(err);
  }
}
exports.post_publication_edit=async function(req,res){
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const url=req.body.url;

  let image=req.body.image;
  if(req.file){
    image=req.file.filename;
    fs.unlink("./static/images/"+req.body.image,err=>{
      console.log(err);
    });
  }
  try{
    const publication=await Publication.findOne({
      where:{
        id:id
      }
    });
    await publication.update({
      title:title,
      description:description,
      image:image,
      url:slugField(title)
    })
    await publication.save();
    res.redirect("/admin/publications?action=update");
  }catch(err){
    console.log(err);
  }
}
exports.get_publication_delete=async function(req,res){
  const id=req.params.id;
  try{
      const publication=await Publication.findOne({
        where:{
          id:id
        }
      });
      res.render("admin/publication-delete",{
        title:"Publication Delete",
        publication:publication
      });
  }
  catch(err){

  }
}
exports.post_publication_delete=async function(req,res){
  const id=req.params.id;
  try{
    const publication=await Publication.findOne({
      where:{
        id:id
      }
    });
    if(publication){
      publication.destroy();
      return res.redirect("/admin/publications?action=delete");
    }
    res.redirect("/admin/publications");
  }
  catch(err){
    console.log(err);
  }
}
exports.get_login=async function(req,res){
  const message=req.session.message;
  delete req.session.message;
  try{
     res.render("admin/login",{
      title:"Neuromer Admin",
      message:message
     });
  }
  catch(err){
    console.log(err);
  }
}
exports.post_login=async function(req,res){
  const username=req.body.username;
  const password=req.body.password;
  try{
     const admin=await Admin.findOne({
      where:{
        username:username
      }
     });
     if(!admin){
      return res.render("admin/login", {
        title: "Neuromer Admin",
        message: { text: "Username is incorrect",class:"danger"},
      });
      
     }
     if(password==admin.password){
      const url = req.query.returnUrl || "/admin";
      req.session.isAuth = true; //session oluştururuz
      req.session.username = admin.username;
      req.session.name=admin.name;
      req.session.surname=admin.surname;
      return res.redirect(url);
     }
     else{
      return res.render("admin/login", {
        title: "Neuromer Admin",
        message: { text: "Password is incorrect", class: "danger" },
      });
     }
  }
  catch(err){
    console.log(err);
  }
}
exports.get_logout = async function (req, res) {
  try {
    delete req.session.isAuth;
    return res.redirect("/admin/login");
  } catch (err) {
    console.log(err);
  }
};
