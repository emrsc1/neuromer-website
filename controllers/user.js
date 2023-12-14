const Event = require("../models/events");
const Publication=require("../models/publications");
const { Op } = require("sequelize");
const sequelize = require("../data/db");
const PDFDocument=require("pdfkit");
const fs=require("fs");
const path=require("path");
exports.index = async function (req, res) {
  const Events=await Event.findAll();
  try {
    return res.render("user/index", {
      title: "Neuromer",
      events:Events,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.aboutus = async function (req, res) {
  try {
    return res.render("user/aboutus", {
      title: "About Neuromer",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.events = async function (req, res) {
  try {
    return res.render("user/events", {
      title: "Neuromer Events",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.event_details = async function (req, res) {
  const url = req.params.slug;
  try {
    const events = await Event.findOne({
      where: {
        url: url,
      },
    });
    res.render("user/event-details", {
      title: "Event Details",
      event: events,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.ongoingresearch = async function (req, res) {
  try {
    return res.render("user/ongoingresearch", {
      title: "Neuromer-Ongoing Research",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.publication = async function (req, res) { 
  try {
    const lastPublication = await Publication.findOne({
      order: [["id", "DESC"]], // İd'ye göre ters sırada sırala
    });
    const publication = await Publication.findAll({
      order: [["id", "DESC"]], // id'ye göre ters sırada sırala
      offset: 1, // İlk veriyi atla
    });
    const doc = new PDFDocument();
    const description=lastPublication.description.slice(4,-4);
    doc.fontSize(25).text(lastPublication.title, { align: "left" });
    doc.moveDown();
    doc.fontSize(18).text(description, { align: "left" });
    const filePath = `pdfs/${Date.now()}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));
    doc.end();
    return res.render("user/publication", {
      title: "Publications",
      pdfUrl:filePath,
      publications:publication,
      lastPublication:lastPublication
    });
  } catch (err) {
    console.log(err);
  }
};
exports.committee_executive = async function (req, res) {
  try {
    return res.render("user/committee-executive", {
      title: "Neuromer-Detailed-Committee",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.committee_public_rel = async function (req, res) {
  try {
    return res.render("user/committee-public-rel", {
      title: "Neuromer-Detailed-Committee",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.committee_minorities = async function (req, res) {
  try {
    return res.render("user/committee-minorities", {
      title: "Neuromer-Detailed-Committee",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.committee_women = async function (req, res) {
  try {
    return res.render("user/committee-women", {
      title: "Neuromer-Detailed-Committee",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.committee_neuro_res = async function (req, res) {
  try {
    return res.render("user/committee-neuro-res", {
      title: "Neuromer-Detailed-Committee",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.committee_neuro_surg = async function (req, res) {
  try {
    res.render("user/committee-neuro-surg", {
      title: "Neuromer-Detailed-Committee",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.committee_neuro_train = async function (req, res) {
  try {
    res.render("user/committee-neuro-train", {
      title: "Neuromer-Detailed-Committee",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.onresearch_mult_scle = async function (req, res) {
  try {
    res.render("user/onresearch-mult-scle", {
      title: "Neuromer-Detailed-Ongoing-Research",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.onresearch_alzhe = async function (req, res) {
  try {
    res.render("user/onresearch-alzhe", {
      title: "Neuromer-Detailed-Ongoing-Research",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.onresearch_spinal = async function (req, res) {
  try {
    res.render("user/onresearch-spinal", {
      title: "Neuromer-Detailed-Ongoing-Research",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.pdfs=function(req,res){
  const pdf=req.params.pdf;
  const filePath=path.join(__dirname,'pdfs',pdf);
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath,(err,data)=>{
      if(err){
        console.error("File Reading Error:",err);
        res.status(404).send("File not found!");
      }
      else{
        res.setHeader('Content-Type','application/pdf');
        res.setHeader("Content-Disposition",`attachment;filename='${pdf}'`);
        res.send(data);
      }
    });
    }else{
  res.status(404).send("Folder not found!");
} 
}


