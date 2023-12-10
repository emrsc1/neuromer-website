const express=require("express");
const router=express.Router();
const adminController=require("../controllers/admin");
const imageUpload=require("../helpers/image-upload");

router.get("/",adminController.index);

router.get("/events/:id", adminController.get_event_edit);

router.get("/events", adminController.get_events);

router.get("/event-create",adminController.get_event_create);

router.post("/event-create",imageUpload.upload.single("image"),adminController.post_event_create);



module.exports=router;