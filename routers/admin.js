const express=require("express");
const router=express.Router();
const adminController=require("../controllers/admin");
const imageUpload=require("../helpers/image-upload");
const isAuth = require("../middlewares/auth");

router.get("/",isAuth,adminController.index);

router.get("/events/:id", isAuth, adminController.get_event_edit);

router.post("/events/:id",isAuth, imageUpload.upload.single("image"),adminController.post_event_edit);

router.get("/events", isAuth, adminController.get_events);

router.get("/event-create", isAuth, adminController.get_event_create);

router.post("/event-create",isAuth,imageUpload.upload.single("image"),adminController.post_event_create);

router.get("/event-delete/:id", isAuth, adminController.get_event_delete);

router.post("/event-delete/:id", isAuth, adminController.post_event_delete);

router.get("/publications", isAuth, adminController.get_publications);

router.get("/publications-create",isAuth,adminController.get_publications_create);

router.post("/publications-create",isAuth, imageUpload.upload.single("image"),adminController.post_publications_create);

router.get("/publications/:id", isAuth, adminController.get_publication_edit);

router.post("/publications/:id",isAuth,imageUpload.upload.single("image"),adminController.post_publication_edit);

router.get("/publication-delete/:id",isAuth,adminController.get_publication_delete);

router.post("/publication-delete/:id",isAuth,adminController.post_publication_delete);

router.get("/login", adminController.get_login);

router.post("/login",  adminController.post_login);

router.get("/logout",adminController.get_logout)

module.exports=router;