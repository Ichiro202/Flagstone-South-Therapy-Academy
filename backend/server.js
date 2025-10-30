const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'sections.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read data from JSON file
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    throw error;
  }
}

// Helper function to write data to JSON file
async function writeData(data) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data file:', error);
    throw error;
  }
}

// GET /api/sections - List all sections with their URLs
app.get('/api/sections', async (req, res) => {
  try {
    const sections = await readData();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sections' });
  }
});

// POST /api/sections/:sectionId/urls - Add a URL to a section
app.post('/api/sections/:sectionId/urls', async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { title, description, link } = req.body;

    // Validate input
    if (!title || !description || !link) {
      return res.status(400).json({ error: 'Title, description, and link are required' });
    }

    const sections = await readData();

    // Check if section exists
    if (!sections[sectionId]) {
      return res.status(404).json({ error: 'Section not found' });
    }

    // Add new URL
    const newUrl = { title, description, link };
    sections[sectionId].urls.push(newUrl);

    await writeData(sections);
    res.status(201).json({ message: 'URL added successfully', url: newUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add URL' });
  }
});

// DELETE /api/sections/:sectionId/urls/:urlIndex - Remove a URL from a section
app.delete('/api/sections/:sectionId/urls/:urlIndex', async (req, res) => {
  try {
    const { sectionId, urlIndex } = req.params;
    const index = parseInt(urlIndex, 10);

    const sections = await readData();

    // Check if section exists
    if (!sections[sectionId]) {
      return res.status(404).json({ error: 'Section not found' });
    }

    // Check if URL index is valid
    if (isNaN(index) || index < 0 || index >= sections[sectionId].urls.length) {
      return res.status(400).json({ error: 'Invalid URL index' });
    }

    // Remove URL
    const removedUrl = sections[sectionId].urls.splice(index, 1)[0];

    await writeData(sections);
    res.json({ message: 'URL removed successfully', url: removedUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove URL' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
