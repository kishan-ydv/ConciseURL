const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { nanoid } = require('nanoid');
require('dotenv').config();

const Url = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

//Shorten URL route
app.post('/api/shorten', async (req,res) => {
    const { originalUrl } = req.body;

    try {
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlRegex.test(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL' });
        }

        let url = await Url.findOne({ originalUrl });
        if (url) {
        return res.json(url);
        }

        // Generate short code
        const urlCode = nanoid(8);
        const shortUrl = `${req.protocol}://${req.get('host')}/${urlCode}`;

        // Create new URL document
        url = new Url({
        originalUrl,
        shortUrl,
        urlCode
        });

        await url.save();
        res.json(url);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Redirect to original URL
app.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    
    if (url) {
      // Increment click count
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all URLs (for dashboard)
app.get('/api/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(process.env.PORT || 3000);
