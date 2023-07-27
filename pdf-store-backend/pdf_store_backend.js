const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// Use the CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Punit:Puni!%402002@mydatabase.vvzigjf.mongodb.net/pdf_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define PDF model
const pdfSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const Pdf = mongoose.model('Pdf', pdfSchema);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Upload endpoint
app.post('/upload', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No PDF file received.');
  }

  const pdf = new Pdf({
    name: req.file.filename,
    path: req.file.path,
  });

  try {
    await pdf.save();
    return res.status(200).send('PDF uploaded successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error uploading PDF');
  }
});

// Get uploaded PDFs
app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, 'uploads', filename));
});

app.get('/pdfs', async (req, res) => {
  try {
    const pdfs = await Pdf.find({});
    return res.json(pdfs);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error fetching PDFs');
  }
});

// Delete PDF endpoint
app.delete('/pdfs/:pdfId', async (req, res) => {
  const { pdfId } = req.params;

  try {
    const deletedPdf = await Pdf.findByIdAndRemove(pdfId);
    if (!deletedPdf) {
      return res.status(404).send('PDF not found.');
    }

    return res.status(200).send('PDF deleted successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error deleting PDF');
  }
});


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
