const fs = require('fs');
const pdf = require('pdf-parse');
const textrank = require('textrank-summary');

function extractTextFromPDF(pdfPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(pdfPath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        pdf(data).then((data) => {
          resolve(data.text);
        }).catch(reject);
      }
    });
  });
}

function generateSummary(text) {
  return new Promise((resolve, reject) => {
    const summary = textrank.summarize(text);
    resolve(summary);
  });
}

async function getSummary(pdfPath) {
  try {
    const pdfText = await extractTextFromPDF(pdfPath);
    const pdfSummary = await generateSummary(pdfText);
    console.log('Summary:', pdfSummary);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Replace 'your_pdf_file.pdf' with the path to your PDF file
const pdfPath = './uploads/resume.pdf';
getSummary(pdfPath);
