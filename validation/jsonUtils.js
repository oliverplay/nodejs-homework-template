const fs = require('fs').promises;

async function readJsonFile(filePath) {
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}

async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log('JSON file updated successfully');
  } catch (error) {
    console.error('Error writing JSON file:', error);
    throw error;
  }
}

module.exports = { readJsonFile, writeJsonFile };
