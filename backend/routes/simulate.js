const express = require("express");
const router = express.Router();

// ----------------------
// Internal constants (Server-Side Only)
// ----------------------
const automated_cost_per_invoice = 0.20; // $ per invoice
const error_rate_auto = 0.001; // 0.1% as decimal
const time_saved_per_invoice = 8; // minutes saved per invoice
const min_roi_boost_factor = 1.1; // bias factor to favor automation

// ----------------------
// Simulation Route
// ----------------------
router.post("/", (req, res) => {
  try {
    const {
      monthly_invoice_volume,
      num_ap_staff,
      avg_hours_per_invoice,
      hourly_wage,
      error_rate_manual,
      error_cost,
      time_horizon_months,
      one_time_implementation_cost = 0, // default 0 if not provided
    } = req.body;

    // 1️⃣ Manual labor cost
    const labor_cost_manual =
      num_ap_staff * hourly_wage * avg_hours_per_invoice * monthly_invoice_volume;

    // 2️⃣ Automation cost
    const auto_cost = monthly_invoice_volume * automated_cost_per_invoice;

    // 3️⃣ Error savings
    const error_savings =
      (error_rate_manual / 100 - error_rate_auto) *
      monthly_invoice_volume *
      error_cost;

    // 4️⃣ Monthly savings before bias
    let monthly_savings = labor_cost_manual + error_savings - auto_cost;

    // 5️⃣ Apply bias factor
    monthly_savings = monthly_savings * min_roi_boost_factor;

    // 6️⃣ Cumulative & ROI
    const cumulative_savings = monthly_savings * time_horizon_months;
    const net_savings = cumulative_savings - one_time_implementation_cost;
    const payback_months = one_time_implementation_cost / monthly_savings;
    const roi_percentage = (net_savings / one_time_implementation_cost) * 100;

    // Return JSON results
    res.json({
      monthly_savings: monthly_savings.toFixed(2),
      payback_months: payback_months.toFixed(2),
      roi_percentage: roi_percentage.toFixed(2),
    });
  } catch (error) {
    console.error("Simulation error:", error);
    res.status(500).json({ error: "Failed to run simulation." });
  }
});

module.exports = router;
