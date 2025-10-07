const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const simulateRoute = require("./routes/simulate");
const scenariosRoute = require("./routes/scenarios");
const reportRoute = require("./routes/report");  // <- add this

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/simulate", simulateRoute);
app.use("/scenarios", scenariosRoute); 
app.use("/report/generate", reportRoute);// <- add this

app.get("/", (req, res) => {
  res.send("ROI Simulator Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const path = require("path");
app.use("/reports", express.static(path.join(__dirname, "reports")));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
