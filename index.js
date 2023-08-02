const dotenv = require("dotenv");
const scrape = require("./scrapers/ticketing.js");
const writeJSONFile = require("./utils/writeJSONFile.js");
const writeExcelFile = require("./utils/writeExcelFile.js");

dotenv.config();

// Initialize URL and File Name
const url = process.env.Url;
const fileName = process.env.FileName;

scrape(url).then((data) => {
  // Convert the array to a JSON string
  const jsonData = JSON.stringify(data, null, 2); // The third argument (2) specifies the number of spaces for indentation

  writeJSONFile(fileName, jsonData); // create a json file
  writeExcelFile(data, fileName); // create a excel file
});
