const Event=require("../models/events");
const { Op } = require("sequelize");
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

