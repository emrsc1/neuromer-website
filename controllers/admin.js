const Event=require("../models/events");
const { Op } = require("sequelize");
const sequelize = require("../data/db");
const slugField = require("../helpers/slugfield");

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
exports.get_event_edit = async function (req, res) {
  const id = req.params.id;
  
  try {
    const events = await Event.findOne({
      where: {
        id: id,
      },
    });
    console.log(events);
    return res.render("admin/event-edit", {
      event:events,
      title: "Event Edit",
      
    });
    
  } catch (err) {
    console.log(err);
  }
};
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
    res.redirect("/admin/event-create");
  } catch (err) {
    console.log(err);
  }
};
 
