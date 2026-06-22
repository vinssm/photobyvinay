const express = require("express");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const resume = require("./data/resume");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// ─── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ service: "bio-service", status: "ok", uptime: process.uptime() });
});

// ─── Bio / profile ─────────────────────────────────────────────────────────────
app.get("/bio", (req, res) => {
  res.json(resume.bio);
});

// ─── Skills ────────────────────────────────────────────────────────────────────
app.get("/skills", (req, res) => {
  res.json(resume.skills);
});

// ─── Work history ──────────────────────────────────────────────────────────────
app.get("/jobs", (req, res) => {
  res.json(resume.jobs);
});

// ─── Education ─────────────────────────────────────────────────────────────────
app.get("/education", (req, res) => {
  res.json(resume.education);
});

// ─── Full resume JSON ──────────────────────────────────────────────────────────
app.get("/resume", (req, res) => {
  res.json(resume);
});

// ─── PDF resume download ───────────────────────────────────────────────────────
app.get("/resume/pdf", (req, res) => {
  const doc = new PDFDocument({ margin: 50, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${resume.bio.name.replace(/ /g, "_")}_Resume.pdf"`,
  );
  doc.pipe(res);

  const { bio, jobs, education, skills } = resume;

  // ── Header ──
  doc.fontSize(24).font("Helvetica-Bold").text(bio.name, { align: "center" });
  doc.fontSize(13).font("Helvetica").text(bio.title, { align: "center" });
  doc
    .fontSize(10)
    .fillColor("#555")
    .text(`${bio.location}  •  ${bio.email}  •  ${bio.github}`, {
      align: "center",
    });

  doc.moveDown(0.5);
  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .strokeColor("#3b82f6")
    .lineWidth(2)
    .stroke();
  doc.moveDown(0.5);

  // ── Summary ──
  doc.fillColor("#000").fontSize(13).font("Helvetica-Bold").text("SUMMARY");
  doc.moveDown(0.2);
  doc.fontSize(10).font("Helvetica").text(bio.summary);
  doc.moveDown(0.8);

  // ── Experience ──
  doc.fontSize(13).font("Helvetica-Bold").text("EXPERIENCE");
  doc.moveDown(0.2);

  jobs.forEach((job) => {
    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .fillColor("#1d4ed8")
      .text(`${job.title}`, { continued: true })
      .fillColor("#000")
      .font("Helvetica")
      .text(
        `  —  ${job.company}  |  ${job.start} – ${job.end}  |  ${job.location}`,
      );

    job.highlights.forEach((h) => {
      doc.fontSize(10).text(`• ${h}`, { indent: 10 });
    });
    doc.moveDown(0.5);
  });

  // ── Education ──
  doc.fontSize(13).font("Helvetica-Bold").text("EDUCATION");
  doc.moveDown(0.2);

  education.forEach((edu) => {
    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .fillColor("#1d4ed8")
      .text(`${edu.degree}`, { continued: true })
      .fillColor("#000")
      .font("Helvetica")
      .text(`  —  ${edu.institution}  |  ${edu.graduated}`);

    edu.highlights.forEach((h) => {
      doc.fontSize(10).text(`• ${h}`, { indent: 10 });
    });
    doc.moveDown(0.5);
  });

  // ── Skills ──
  doc.fontSize(13).font("Helvetica-Bold").text("SKILLS");
  doc.moveDown(0.2);

  skills.forEach((group) => {
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(`${group.category}: `, { continued: true })
      .font("Helvetica")
      .text(group.items.join(", "));
  });

  doc.end();
});

app.listen(PORT, () => {
  console.log(`Bio Service running on http://localhost:${PORT}`);
});
