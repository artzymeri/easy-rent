const PDFDocument = require("pdfkit");

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(30, y).lineTo(560, y).stroke();
}

function generateVr(doc, x1, y1, x2, y2) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(x1, y1)
    .lineTo(x2, y2)
    .stroke();
}

function generateBackground(doc, x, y, width, height, color) {
  doc.fillColor(color).rect(x, y, width, height).fill();
}

function generateCompanyLogo(doc) {
  doc.image("logo.png", 40, 40, { width: 180, height: 130 }).moveDown();
}

function generateCarDiagram(doc) {
  doc.image("cardiagram.jpeg", 240, 55, { width: 180, height: 115 }).moveDown();
}

function generateCarFuel(doc) {
  doc.image("fueltank.jpg", 431, 46, { width: 128, height: 133 }).moveDown();
}

function generateHeaderInfo(doc) {
  doc
    .fillColor("#000000")
    .fontSize(9)
    .text("Gjendja e veturës", 285, 34)
    .text("Derivati", 477, 34)
    .moveDown();
}

function generateReservationInfo(doc, theReservation) {
  const startTime = "2024-03-01T00:00:00+01:00";
  const endTime = "2024-03-23T00:00:00+01:00";

  // Extracting start date
  const startDateObj = new Date(startTime);
  const startTimeDate = `${startDateObj.getDate()}/${
    startDateObj.getMonth() + 1
  }/${startDateObj.getFullYear()}`;

  // Extracting start time
  const startTimeStr = startTime.split("T")[1];
  const startTimeClock = startTimeStr.substring(0, 5);

  // Extracting end date
  const endDateObj = new Date(endTime);
  const endTimeDate = `${endDateObj.getDate()}/${
    endDateObj.getMonth() + 1
  }/${endDateObj.getFullYear()}`;

  // Extracting end time
  const endTimeStr = endTime.split("T")[1];
  const endTimeClock = endTimeStr.substring(0, 5);

  doc
    .fontSize(11)
    .fillColor("#000000")
    .text("Kontratë mbi dhënien e veturës me qera", 37, 231)
    .fontSize(10)
    .text("Kontrata vlen për:   Kosovë   |   Jashtë-vendit", 37, 281)
    .fontSize(9)
    .text("Data e dorëzimit::", 302, 220)
    .text("Ora e dorëzimit:", 302, 244)
    .text("Data e kthimit:", 302, 269)
    .text("Ora e kthimit:", 302, 293)
    .text(`${startTimeDate}`, 430, 220)
    .text(`${startTimeClock}`, 430, 244)
    .text(`${endTimeDate}`, 430, 269)
    .text(`${endTimeClock}`, 430, 293)
    .text("Shënimet e veturës:", 115, 319)
    .text("Marka:", 35, 344)
    .text("Tipi:", 35, 369)
    .text("Nr.Shasisë:", 35, 394)
    .text("Ngjyra:", 35, 419)
    .text("Targat:", 35, 444)
    .text(`${theReservation.carMake}`, 125, 344)
    .text(`${theReservation.carModel}`, 125, 369)
    .text(`${theReservation.carId}`, 125, 394)
    .text(`${theReservation.carColor}`, 125, 419)
    .text(`${theReservation.carLabel}`, 125, 444)
    .fontSize(10)
    .text("Me nënshkrimin e kësaj kontrate pranoj se do të marrë", 310, 335)
    .text("përgiegjësi të plotë për automjetin e cekur nga", 330, 346)
    .text("Filan Fisteku.", 400, 357)
    .text("Koment Shtesë::", 300, 390)
    .text("Shoferi 1", 139, 469)
    .text("Shoferi 2", 404, 469)
    .fontSize(9)
    .text("Emri i plotë:", 35, 494)
    .text(`${theReservation.firstAndLastNameD1 == null ? '' : theReservation.firstAndLastNameD1}`, 165, 494)
    .text("Emri i plotë:", 300, 494)
    .text(`${theReservation.firstAndLastNameD2 == null ? '' : theReservation.firstAndLastNameD2}`, 430, 494)
    .text("Adresa:", 35, 519)
    .text(`${theReservation.addressD1 == null ? '' : theReservation.addressD1}`, 165, 519)
    .text("Adresa:", 300, 519)
    .text(`${theReservation.addressD2 == null ? '' : theReservation.addressD2}`, 430, 519)
    .fontSize(8)
    .text("NR. Dokumentit Personal:", 35, 544)
    .fontSize(9)
    .text(`${theReservation.documentIdD1 == null ? '' : theReservation.documentIdD1}`, 165, 544)
    .fontSize(8)
    .text("NR. Dokumentit Personal:", 300, 544)
    .fontSize(9)
    .text(`${theReservation.documentIdD2 == null ? '' : theReservation.documentIdD2}`, 430, 544)
    .text("Numri Kontaktues:", 35, 569)
    .text(`${theReservation.phoneNumberD1 == null ? '' : theReservation.phoneNumberD1}`, 165, 569)
    .text("Numri Kontaktues:", 300, 569)
    .text(`${theReservation.phoneNumberD2 == null ? '' : theReservation.phoneNumberD2}`, 430, 569)
    .text("Nënshkrimi:", 35, 594)
    .text("Nënshkrimi:", 300, 594)
    .moveDown();
}

function generateSignatureSpots(doc) {
  doc
    .fillColor("#000000")
    .fontSize(9)
    .text("LËSHON:", 30, 760)
    .text("PRANON:", 420, 760)
    .moveDown();
}

function createInvoiceFromAPI(theReservation, res) {

  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ size: "A4", margin: 30 });

    generateBackground(doc, 427, 210, 133, 100, "#DDDDDD");
    generateBackground(doc, 120, 335, 175, 125, "#DDDDDD");
    generateBackground(doc, 162, 485, 133, 125, "#DDDDDD");
    generateBackground(doc, 427, 485, 133, 125, "#DDDDDD");



    //KUTIA E PARE

    generateHr(doc, 30);
    generateHr(doc, 180);
    generateVr(doc, 30, 30, 30, 180);
    generateVr(doc, 230, 45, 560, 45);
    generateVr(doc, 560, 30, 560, 180);
    generateVr(doc, 230, 30, 230, 180);
    generateVr(doc, 430, 30, 430, 180);

    generateCompanyLogo(doc);
    generateCarDiagram(doc);
    generateCarFuel(doc);

    generateHeaderInfo(doc);

    //KUTIA E DYTE

    generateHr(doc, 210);
    generateVr(doc, 295, 235, 560, 235);
    generateHr(doc, 260);
    generateVr(doc, 295, 285, 560, 285);
    generateVr(doc, 427, 210, 427, 310);
    generateHr(doc, 310);
    generateVr(doc, 30, 335, 295, 335);
    generateVr(doc, 30, 360, 295, 360);
    generateVr(doc, 30, 385, 560, 385);
    generateVr(doc, 30, 410, 295, 410);
    generateVr(doc, 30, 435, 295, 435);
    generateVr(doc, 30, 460, 560, 460);
    generateVr(doc, 30, 485, 560, 485);
    generateVr(doc, 30, 510, 560, 510);
    generateVr(doc, 30, 535, 560, 535);
    generateVr(doc, 30, 560, 560, 560);
    generateVr(doc, 30, 585, 560, 585);
    generateVr(doc, 30, 610, 560, 610);
    generateVr(doc, 30, 610, 560, 610);
    generateVr(doc, 30, 210, 30, 610);
    generateVr(doc, 120, 335, 120, 460);
    generateVr(doc, 162, 485, 162, 610);
    generateVr(doc, 560, 210, 560, 610);
    generateVr(doc, 295, 210, 295, 610);
    generateVr(doc, 427, 485, 427, 610);
    generateHr(doc, 610);

    generateReservationInfo(doc, theReservation);

    //NENSHRKIMET

    generateSignatureSpots(doc);
    generateVr(doc, 30, 805, 170, 805);
    generateVr(doc, 420, 805, 560, 805);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Fatura ${theReservation.firstAndLastName} ${theReservation.firstAndLastName}.pdf`
    );

    doc.pipe(res);
    doc.end();

    doc.on("end", () => {
      resolve();
    });

    doc.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = {
  createInvoiceFromAPI,
};
