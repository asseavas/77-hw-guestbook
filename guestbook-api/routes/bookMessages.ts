import express from "express";
import fileDb from "../fileDb";
import { BookMessageMutation } from "../types";
import { imagesUpload } from "../multer";

const bookMessagesRouter = express.Router();

bookMessagesRouter.get("/", async (req, res) => {
  const bookMessages = await fileDb.getItems();

  return res.send(bookMessages);
});

bookMessagesRouter.post("/", imagesUpload.single("image"), async (req, res) => {
  if (!req.body.message) {
    return res.status(400).send({ error: "Message is required" });
  }

  const bookMessage: BookMessageMutation = {
    message: req.body.message,
    image: req.file ? req.file.filename : null,
    author: req.body.author ? req.body.author : null,
  };

  const savedBookMessage = await fileDb.addItem(bookMessage);
  return res.send(savedBookMessage);
});

export default bookMessagesRouter;
