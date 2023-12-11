const express=require("express");
const router=express.Router();
const adminController=require("../controllers/admin");
const imageUpload=require("../helpers/image-upload");

router.get("/",adminController.index);

router.get("/events/:id", adminController.get_event_edit);

router.post("/events/:id", imageUpload.upload.single("image"),adminController.post_event_edit);

router.get("/events", adminController.get_events);

router.get("/event-create",adminController.get_event_create);

router.post("/event-create",imageUpload.upload.single("image"),adminController.post_event_create);

router.get("/event-delete/:id",adminController.get_event_delete);

router.post("/event-delete/:id",adminController.post_event_delete);

module.exports=router;