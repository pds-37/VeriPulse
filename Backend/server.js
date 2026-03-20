/**
 * SentinelAI Backend — Express Server
 * Parametric Insurance Fraud Detection Engine
 */

const express = require("express");
const cors = require("cors");

const { analyze } = require("./controllers/fraudController");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───

// Enable CORS (for frontend connection)
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ─── Routes ───

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    engine: "SentinelAI",
    uptime: process.uptime()
  });
});

// Fraud detection endpoint
app.post("/api/analyze", analyze);

// ─── 404 Handler ───
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found"
  });
});

// ─── Global Error Handler ───
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    success: false,
    error: "Internal Server Error"
  });
});

// ─── Start Server ───
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 POST /api/analyze`);
  console.log(`❤️  GET  /api/health\n`);
});

app.get("/api/analyze", (req, res) => {
  res.send("Use POST request for this endpoint");
});