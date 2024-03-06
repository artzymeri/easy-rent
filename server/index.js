const express = require("express");
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const cookieParser = require("cookie-parser");

const { reservations } = require("./models");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const db = require("./models");

const port = 1234;

app.get("/getreservations", async (req, res) => {
  try {
    const reservationsData = await reservations.findAll();

    res.json(reservationsData);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/addreservation", async (req, res) => {
  try {
    const {
      firstAndLastName,
      phoneNumber,
      documentId,
      carInfo,
      startTime,
      endTime,
      imagesArray,
    } = req.body.newReservation;

    let checkedPhoneNumber = phoneNumber;
    let checkedDocumentId = documentId;

    if (phoneNumber === "") {
      checkedPhoneNumber = null;
    }

    if (documentId === "") {
      checkedDocumentId = null;
    }

    await reservations.create({
      clientNameSurname: firstAndLastName,
      clientPhoneNumber: checkedPhoneNumber,
      carInfo: carInfo,
      clientDocumentId: checkedDocumentId,
      startTime: startTime,
      endTime: endTime,
      imagesArray: JSON.stringify(imagesArray),
    });
    res.json({
      title: "success",
      message: "Reservimi u shtua me sukses",
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.json({ title: "error", message: "Një problem u shkaktua" });
  }
});

app.post("/editreservation/:reservationId", async (req, res) => {
  const { reservationId } = req.params;


  const {
    firstAndLastName,
    phoneNumber,
    documentId,
    carInfo,
    startTime,
    endTime,
    imagesArray,
  } = req.body.object;


  const reservationToEdit = await reservations.findByPk(reservationId);

  if (!reservationId) {
    res.json({ title: "error", message: "Produkti nuk ekziston" });
  }

  reservationToEdit.clientNameSurname = firstAndLastName;
  reservationToEdit.clientPhoneNumber = phoneNumber;
  reservationToEdit.clientDocumentId = documentId;
  reservationToEdit.carInfo = carInfo;
  reservationToEdit.startTime = startTime;
  reservationToEdit.endTime = endTime;

  if (imagesArray == "[]") {
    reservationToEdit.imagesArray = null;
  } else {
    reservationToEdit.imagesArray = imagesArray;
  }

  await reservationToEdit.save();
  res.json({ title: "success", message: "Produkti u editua me sukses" });
});

app.post("/deletereservation/:reservationId", async (req, res) => {
  try {
    const { reservationId } = req.params;

    const deletedRequest = await reservations.destroy({
      where: { id: reservationId },
    });

    if (!deletedRequest) {
      res.json({ title: "error", message: "Produkti nuk u fshi me sukses" });
    }

    res.json({ title: "success", message: "Produkti u fshi me sukses" });
  } catch (error) {
    console.log(error);
  }
});

db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Server is running successfully`);
  });
});
