const XLSX = require("xlsx");

const writeExcelFile = (jsonData, fileName) => {
  // Convert JSON data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Specify the file path
  const filePath = `./excels/${fileName}.xlsx`;

  // Write the workbook to a file
  XLSX.writeFile(workbook, filePath);

  console.log("Excel File has been saved.");
};

module.exports = writeExcelFile;
