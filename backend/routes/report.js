const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// POST /report/generate
router.post("/", (req, res) => {
  const { email, scenario } = req.body;

  if (!email || !scenario) {
    return res.status(400).json({ error: "Email and scenario data are required." });
  }

  try {
    // Ensure reports folder exists
    const reportsDir = path.join(__dirname, "../reports");
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

    // Create PDF file
    const filename = `ROI_Report_${scenario.scenario_name.replace(/\s/g, "_")}.pdf`;
    const filePath = path.join(reportsDir, filename);

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

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

    // Return URL when PDF is finished
    writeStream.on("finish", () => {
      res.json({
        message: "Report generated successfully!",
        download_url: `http://localhost:5000/reports/${filename}`,
      });
    });

    writeStream.on("error", (err) => {
      console.error("PDF write error:", err);
      res.status(500).json({ error: "Failed to generate the report." });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate the report." });
  }
});

module.exports = router;
