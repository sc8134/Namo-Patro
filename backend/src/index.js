require("dotenv").config();
const express = require("express");
const cors = require("cors");

const calendarRoutes  = require("./api/calendar/routes");
const festivalRoutes  = require("./api/festivals/routes");
const userRoutes      = require("./api/users/routes");
const financeRoutes   = require("./api/finance/routes");
const astrologyRoutes = require("./api/astrology/routes");
const radioRoutes     = require("./api/radio/routes");
const utilitiesRoutes = require("./api/utilities/routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/calendar",   calendarRoutes);
app.use("/api/festivals",  festivalRoutes);
app.use("/api/users",      userRoutes);
app.use("/api/finance",    financeRoutes);
app.use("/api/astrology",  astrologyRoutes);
app.use("/api/radio",      radioRoutes);
app.use("/api/utilities",  utilitiesRoutes);

app.get("/health", (req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
