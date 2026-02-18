const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

// créer le dossier uploads
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// rendre uploads public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({ dest: "uploads/" });

// route upload
app.post("/upload", upload.single("photo"), (req, res) => {
  try {
    const before = req.file.filename;
    const after = before + "_after.jpg";

    // simulation : copie avant -> après
    fs.copyFileSync(
      path.join("uploads", before),
      path.join("uploads", after)
    );

    res.json({
      success: true,
      before,
      after
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// port Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Serveur lancé sur le port", PORT);
});
