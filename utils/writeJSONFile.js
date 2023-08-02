const fs = require("fs");

const writeJSONFile = (fileName, data) => {
  const filePath = `./scraped_data/${fileName}.json`;

  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log(`JSON data has been written to "${filePath}"`);
    }
  });
};

module.exports = writeJSONFile;
