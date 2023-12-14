const express=require("express");
const router=express.Router();
const userController=require("../controllers/user");

router.get("/pdfs/:pdf",userController.pdfs);

router.get("/aboutus",userController.aboutus);

router.get("/events",userController.events);

router.get("/ongoingresearch",userController.ongoingresearch)

router.get("/publication/:slug",userController.publication_detail);

router.get("/publication",userController.publication);


router.get("/committee-executive",userController.committee_executive);

router.get("/committee-public-rel",userController.committee_public_rel);

router.get("/committee-minorities",userController.committee_minorities);

router.get("/committee-women",userController.committee_women);

router.get("/committee-neuro-res",userController.committee_neuro_res);

router.get("/committee-neuro-surg",userController.committee_neuro_surg);

router.get("/committee-neuro-train", userController.committee_neuro_train);

router.get("/onresearch-mult-scle",userController.onresearch_mult_scle);

router.get("/onresearch-alzhe",userController.onresearch_alzhe);

router.get("/onresearch-spinal", userController.onresearch_spinal);

router.get("/:slug", userController.event_details);

router.get("/", userController.index);


module.exports=router;