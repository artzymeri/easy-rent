const express = require("express");
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const cookieParser = require("cookie-parser");
const { createInvoice } = require("./createInvoice.js");


const { reservations, veturat } = require("./models");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const db = require("./models");

const port = 1234;

//RESERVATIONS ------------------------------>

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

    const pricePerDay = req.body.selectedCar.price;

    const { numberOfDays, totalPrice } = req.body;

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
      clientDocumentId: checkedDocumentId,
      carInfo: carInfo,
      pricePerDay: pricePerDay,
      startTime: startTime,
      endTime: endTime,
      numberOfDays: numberOfDays,
      totalPrice: totalPrice,
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
    pricePerDay,
    startTime,
    endTime,
    numberOfDays,
    totalPrice,
    imagesArray,
    active,
  } = req.body.object;

  const reservationToEdit = await reservations.findByPk(reservationId);

  if (!reservationId) {
    res.json({ title: "error", message: "Produkti nuk ekziston" });
  }

  reservationToEdit.clientNameSurname = firstAndLastName;
  reservationToEdit.clientPhoneNumber = phoneNumber;
  reservationToEdit.clientDocumentId = documentId;
  reservationToEdit.carInfo = carInfo;
  reservationToEdit.pricePerDay = pricePerDay;
  reservationToEdit.startTime = startTime;
  reservationToEdit.endTime = endTime;
  reservationToEdit.numberOfDays = numberOfDays;
  reservationToEdit.totalPrice = totalPrice;
  reservationToEdit.active = active;

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

app.post("/generatepdfdirectly/", async (req, res) => {
  const theReservation = req.body.newReservation;

  theReservation.numberOfDays = req.body.numberOfDays;
  theReservation.totalPrice = req.body.totalPrice;
  theReservation.pricePerDay = req.body.selectedCar.price;

  console.log(theReservation);

  try {
    await createInvoice(theReservation, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: "error",
      message: "Diçka nuk shkoi mirë me kërkesën",
    });
  }
});

//VETURAT ------------------------------>

app.get("/getveturat", async (req, res) => {
  try {
    const veturatData = await veturat.findAll();

    res.json(veturatData);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/addveture", async (req, res) => {
  console.log(req.body);
  try {
    const {
      make,
      model,
      year,
      transmission,
      fuel,
      engine,
      color,
      price,
      label,
      expiryDate,
      image,
    } = req.body.carInfo;

    await veturat.create({
      make: make,
      model: model,
      year: year,
      transmission: transmission,
      fuel: fuel,
      engine: engine,
      color: color,
      price: price,
      label: label,
      expiryDate: expiryDate,
      image: image,
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

app.post("/editveture/:veturaId", async (req, res) => {
  const { veturaId } = req.params;

  const {
    make,
    model,
    year,
    transmission,
    fuel,
    engine,
    color,
    price,
    label,
    expiryDate,
    image,
  } = req.body.carInfo;

  const veturaToEdit = await veturat.findByPk(veturaId);

  if (!veturaId) {
    res.json({ title: "error", message: "Produkti nuk ekziston" });
  }

  veturaToEdit.make = make;
  veturaToEdit.model = model;
  veturaToEdit.year = year;
  veturaToEdit.transmission = transmission;
  veturaToEdit.fuel = fuel;
  veturaToEdit.engine = engine;
  veturaToEdit.color = color;
  veturaToEdit.price = price;
  veturaToEdit.label = label;
  veturaToEdit.expiryDate = expiryDate;
  veturaToEdit.image = image;

  await veturaToEdit.save();
  res.json({ title: "success", message: "Produkti u editua me sukses" });
});

app.post("/deletevetura/:veturaId", async (req, res) => {
  try {
    const { veturaId } = req.params;

    const deletedRequest = await veturat.destroy({
      where: { id: veturaId },
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
