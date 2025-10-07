# Invoicing ROI Simulator

## Overview
The Invoicing ROI Simulator is a web application designed to help businesses visualize cost savings, payback period, and ROI when switching from manual to automated invoicing. Users can input business metrics and get instant results. The app also allows saving scenarios, generating PDF reports, and ensures that automation outcomes are always favorable.

---

## Technologies Used
- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MySQL
- **PDF Reports:** pdfkit (Node.js)
- **API Requests:** Axios

---

## Features
1. **Quick Simulation**
   - Enter key inputs like invoice volume, team size, wages, etc.
   - View instant calculations: Monthly Savings, Payback Period, and ROI.

2. **Scenario Management**
   - Save, load, and delete named scenarios.
   - Scenarios are stored in the MySQL database for persistence.

3. **Report Generation**
   - Download PDF reports for any scenario.
   - Requires entering an email before downloading (lead capture).

4. **Favorable Output Logic**
   - Built-in server-side constants ensure automation always shows positive ROI.

---

## User Inputs
| Field | Description | Example |
| --- | --- | --- |
| scenario_name | Label for saved scenario | Q4_Pilot |
| monthly_invoice_volume | Invoices processed per month | 2000 |
| num_ap_staff | Staff managing invoicing | 3 |
| avg_hours_per_invoice | Manual hours per invoice | 0.17 (10 mins) |
| hourly_wage | Average cost per hour | 30 |
| error_rate_manual | Estimated manual error rate (%) | 0.5 |
| error_cost | Cost to fix each error | 100 |
| time_horizon_months | Projection period | 36 |
| one_time_implementation_cost | Optional setup cost | 50000 |

---

## Backend Constants (Server-Side Only)
| Constant | Description | Value |
| --- | --- | --- |
| automated_cost_per_invoice | Fixed cost per invoice | 0.20 |
| error_rate_auto | Average error rate after automation | 0.1% |
| time_saved_per_invoice | Time saved per invoice (minutes) | 8 |
| min_roi_boost_factor | ROI bias factor | 1.1 |

---

## Installation and Running Locally

### Step 1: Clone the Repository
```bash
git clone https://github.com/Priyaduraivel/ROI-Simulator.git
cd ROI-Simulator
Step 2: Setup Backend

cd backend
npm install
Configure MySQL Database:
Create a database and update db.js with your MySQL credentials.

Start the Backend Server:


node index.js
You should see:

arduino
Server running on http://localhost:5000
Step 3: Setup Frontend
bash

cd ../frontend
npm install
npm start
This opens the React app in the browser at http://localhost:3000.

Ensure API_URL in SimulationForm.js points to your backend:

javascript
Copy code
const API_URL = "http://localhost:5000";
Step 4: Using the Application
Fill in the form fields with invoice and staff details.

Click Calculate to view Monthly Savings, Payback, and ROI.

Click Save Scenario to store it in the database.

Click Generate Report, enter your email, and download the PDF.# ROI-Simulator
