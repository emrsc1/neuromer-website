const Event = require("../models/events");
const { Op } = require("sequelize");
const sequelize = require("../data/db");

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
    return res.render("user/publication", {
      title: "Publications",
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
