const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const fs = require("fs");

// POST /report/generate
router.post("/", (req, res) => {
  const { email, scenario } = req.body;

  if (!email || !scenario) {
    return res.status(400).json({ error: "Email and scenario data are required." });
  }

  // Create PDF document
  const doc = new PDFDocument();
  const filename = `ROI_Report_${scenario.scenario_name.replace(/\s/g, "_")}.pdf`;
  const filePath = `./reports/${filename}`;

  // Ensure reports folder exists
  if (!fs.existsSync("./reports")) fs.mkdirSync("./reports");

  doc.pipe(fs.createWriteStream(filePath));

  // Add content to PDF
  doc.fontSize(20).text("Invoicing ROI Simulator Report", { align: "center" });
  doc.moveDown();

  Object.keys(scenario).forEach((key) => {
    doc.fontSize(12).text(`${key.replace(/_/g, " ")}: ${scenario[key]}`);
  });

  doc.moveDown();
  doc.fontSize(16).text("Simulation Results:", { underline: true });
  doc.text(`Monthly Savings: $${scenario.monthly_savings}`);
  doc.text(`Payback Period: ${scenario.payback_months} months`);
  doc.text(`ROI: ${scenario.roi_percentage}%`);

  doc.end();

  // Return PDF download link
  res.json({
    message: "Report generated successfully!",
    download_url: `http://localhost:5000/reports/${filename}`,
  });
});

module.exports = router;
