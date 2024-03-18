const PDFDocument = require("pdfkit");

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(560, y).stroke();
}

function generateBackground(doc, x, y, width, height, color) {
  doc.fillColor(color).rect(x, y, width, height).fill();
}

function generateHeader(doc, theReservation) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(`${theReservation.firstAndLastName}`, 50, 57)
    .fontSize(10)
    .text(`${theReservation.firstAndLastName}`, 50, 75)
    .moveDown();

  generateHr(doc, 110);
}

function generateCustomerInformation(doc, theReservation) {

  doc
    .fillColor("#000000")
    .text(`Porosia Numër: #${theReservation.firstAndLastName}`, 60, 130)
    .text(`Data e porosisë: 10/10/2022`, 60, 145)
    .text(theReservation.firstAndLastName, 60, 160)
    .text(theReservation.firstAndLastName, 60, 175)
    .text(theReservation.firstAndLastName, 60, 190)
    .moveDown();

  generateHr(doc, 220);
}

function generateTableHeader(doc, y, c1, c2, c3, c4) {
  doc.font("Helvetica-Bold");
  doc
    .fontSize(11)
    .text(c1, 50, y)
    .text(c2, 280, y)
    .text(c3, 380, y)
    .text(c4, 480, y);

  generateHr(doc, 280);
}

function generateFooterDisclaimer(doc) {
  doc
    .font("Helvetica")
    .fontSize(9)
    .text(
      "Kjo faturë eshtë përpiluar në kuadër të softuerit/uebfaqes E-Commerce Kosova",
      50,
      730,
      { align: "center" }
    );
}

function createInvoice(theReservation, res) {
  console.log('createInvoice',theReservation)

  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ margin: 50 });

    generateHeader(doc, theReservation);
    generateBackground(doc, 50, 110, 510, 110, "#DDDDDD");
    generateCustomerInformation(doc, theReservation);

    generateTableHeader(
      doc,
      260,
      "Emri produktit",
      "Çmimi për njësi",
      "Sasia e porositur",
      "Totali i vlerës"
    );

    generateFooterDisclaimer(doc);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Fatura ${
        theReservation.firstAndLastName
      } ${theReservation.firstAndLastName}.pdf`
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
  createInvoice,
};
