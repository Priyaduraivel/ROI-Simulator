const express = require("express");
const router = express.Router();
const db = require("../db");

// Save a scenario
router.post("/", (req, res) => {
  const {
    scenario_name,
    monthly_invoice_volume,
    num_ap_staff,
    avg_hours_per_invoice,
    hourly_wage,
    error_rate_manual,
    error_cost,
    time_horizon_months,
    one_time_implementation_cost,
    monthly_savings,
    payback_months,
    roi_percentage,
  } = req.body;

  const sql = `INSERT INTO scenarios 
    (scenario_name, monthly_invoice_volume, num_ap_staff, avg_hours_per_invoice, hourly_wage, error_rate_manual, error_cost, time_horizon_months, one_time_implementation_cost, monthly_savings, payback_months, roi_percentage)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      scenario_name,
      monthly_invoice_volume,
      num_ap_staff,
      avg_hours_per_invoice,
      hourly_wage,
      error_rate_manual,
      error_cost,
      time_horizon_months,
      one_time_implementation_cost || 0,
      monthly_savings,
      payback_months,
      roi_percentage,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Scenario saved successfully!", id: result.insertId });
    }
  );
});

// Get all scenarios
router.get("/", (req, res) => {
  const sql = "SELECT * FROM scenarios ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get a single scenario by ID
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM scenarios WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

// Delete a scenario by ID
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM scenarios WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Scenario deleted successfully!" });
  });
});

module.exports = router;
