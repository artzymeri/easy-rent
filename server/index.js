const express = require("express");
const { Op } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const cookieParser = require("cookie-parser");
const { createInvoiceDirectly } = require("./createInvoiceDirectly.js");
const QRCode = require("qrcode");

const { reservations, veturat } = require("./models");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const db = require("./models");
const { createInvoiceFromAPI } = require("./createInvoiceFromAPI.js");

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

app.get("/reservations/active", async (req, res) => {
  try {
    const reservationsData = await reservations.findAll({
      where: {
        active: true,
      },
    });

    res.json(reservationsData);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/addreservation", async (req, res) => {
  try {
    const {
      firstAndLastNameD1,
      phoneNumberD1,
      documentIdD1,
      addressD1,
      firstAndLastNameD2,
      phoneNumberD2,
      documentIdD2,
      addressD2,
      carInfo,
      startTime,
      endTime,
      imagesArray,
    } = req.body.newReservation;

    const pricePerDay = req.body.selectedCar.price;
    const carMake = req.body.selectedCar.make;
    const carModel = req.body.selectedCar.model;
    const carColor = req.body.selectedCar.color;
    const carLabel = req.body.selectedCar.label;
    const carId = req.body.selectedCar.carId;

    const { numberOfDays, totalPrice } = req.body;

    let checkedPhoneNumberD1 = phoneNumberD1;
    let checkedDocumentIdD1 = documentIdD1;
    let checkedAddressD1 = addressD1;

    let checkedPhoneNumberD2 = phoneNumberD2;
    let checkedDocumentIdD2 = documentIdD2;
    let checkedAddressD2 = addressD2;
    let checkedFirstAndLastNameD2 = firstAndLastNameD2;

    if (phoneNumberD1 === "") {
      checkedPhoneNumberD1 = null;
    }

    if (documentIdD1 === "") {
      checkedDocumentIdD1 = null;
    }

    if (addressD1 === "") {
      checkedAddressD1 = null;
    }

    if (firstAndLastNameD2 === "") {
      checkedFirstAndLastNameD2 = null;
    }

    if (phoneNumberD2 === "") {
      checkedPhoneNumberD2 = null;
    }

    if (documentIdD2 === "") {
      checkedDocumentIdD2 = null;
    }

    if (addressD2 === "") {
      checkedAddressD2 = null;
    }

    await reservations.create({
      clientNameSurnameD1: firstAndLastNameD1,
      clientPhoneNumberD1: checkedPhoneNumberD1,
      clientDocumentIdD1: checkedDocumentIdD1,
      clientAddressD1: checkedAddressD1,
      clientNameSurnameD2: checkedFirstAndLastNameD2,
      clientPhoneNumberD2: checkedPhoneNumberD2,
      clientDocumentIdD2: checkedDocumentIdD2,
      clientAddressD2: checkedAddressD2,
      carInfo: carInfo,
      carId: carId,
      carMake: carMake,
      carModel: carModel,
      carLabel: carLabel,
      carColor: carColor,
      pricePerDay: pricePerDay,
      startTime: startTime,
      endTime: endTime,
      numberOfDays: numberOfDays,
      totalPrice: totalPrice,
      imagesArray: imagesArray !== null ? JSON.stringify(imagesArray) : null,
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
    firstAndLastNameD1,
    phoneNumberD1,
    documentIdD1,
    addressD1,
    firstAndLastNameD2,
    phoneNumberD2,
    documentIdD2,
    addressD2,
    carInfo,
    carId,
    pricePerDay,
    startTime,
    endTime,
    numberOfDays,
    totalPrice,
    imagesArray,
    active,
  } = req.body.object;

  const checkedFirstAndLastNameD1 =
    firstAndLastNameD1 === "" ? null : firstAndLastNameD1;
  const checkedPhoneNumberD1 = phoneNumberD1 === "" ? null : phoneNumberD1;
  const checkedDocumentIdD1 = documentIdD1 === "" ? null : documentIdD1;
  const checkedAddressD1 = addressD1 === "" ? null : addressD1;

  const checkedFirstAndLastNameD2 =
    firstAndLastNameD2 === "" ? null : firstAndLastNameD2;
  const checkedPhoneNumberD2 = phoneNumberD2 === "" ? null : phoneNumberD2;
  const checkedDocumentIdD2 = documentIdD2 === "" ? null : documentIdD2;
  const checkedAddressD2 = addressD2 === "" ? null : addressD2;

  const reservationToEdit = await reservations.findByPk(reservationId);

  if (!reservationId) {
    res.json({ title: "error", message: "Produkti nuk ekziston" });
  }

  reservationToEdit.clientNameSurnameD1 = checkedFirstAndLastNameD1;
  reservationToEdit.clientPhoneNumberD1 = checkedPhoneNumberD1;
  reservationToEdit.clientDocumentIdD1 = checkedDocumentIdD1;
  reservationToEdit.clientAddressD1 = checkedAddressD1;
  reservationToEdit.clientNameSurnameD2 = checkedFirstAndLastNameD2;
  reservationToEdit.clientPhoneNumberD2 = checkedPhoneNumberD2;
  reservationToEdit.clientDocumentIdD2 = checkedDocumentIdD2;
  reservationToEdit.clientAddressD2 = checkedAddressD2;
  reservationToEdit.carInfo = carInfo;
  reservationToEdit.carId = carId;
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

  try {
    await createInvoiceDirectly(theReservation, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: "error",
      message: "Diçka nuk shkoi mirë me kërkesën",
    });
  }
});

app.post("/generatepdfapi/", async (req, res) => {
  const theReservation = req.body.selectedReservation;

  try {
    await createInvoiceFromAPI(theReservation, res);
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

app.get("/getreservationsbyvetura/:veturaCarId", async (req, res) => {
  const { veturaCarId } = req.params;

  try {
    const veturatData = await reservations.findAll({
      where: {
        carId: veturaCarId,
      },
    });
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
      doors,
      color,
      price,
      label,
      carId,
      expiryDate,
      image,
    } = req.body.carInfo;

    const vetura = await veturat.create({
      make: make,
      model: model,
      year: year,
      transmission: transmission,
      fuel: fuel,
      engine: engine,
      doors: doors,
      color: color,
      price: price,
      label: label,
      carId: carId,
      expiryDate: expiryDate,
      image: image,
    });

    res.json({
      veturaId: vetura.id,
      title: "success",
      message: "Reservimi u shtua me sukses",
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.json({ title: "error", message: "Një problem u shkaktua" });
  }
});

const generateQRCode = async (carId) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(carId, function (err, url) {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};

app.post("/generate-qr-code/:veturaId", async (req, res) => {
  const { veturaId } = req.params;

  try {
    const veturaToEdit = await veturat.findByPk(veturaId);

    console.log(veturaToEdit.carId);

    const veturaQRCode = await generateQRCode(veturaToEdit.carId);

    veturaToEdit.qrCode = veturaQRCode;
    await veturaToEdit.save();
  } catch (error) {
    console.error("Error generating or updating QR code:", error);
    res.status(500).json({ error: "Failed to generate or update QR code" });
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
    carId,
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
  veturaToEdit.carId = carId;
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
