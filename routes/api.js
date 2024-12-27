const { Router } = require('express');
const { ytmp3, ytmp4} = require('./scraper.js');
//━━━━━━━━━━━━━━━[ ROUTER ]━━━━━━━━━━━━━━━━━//
const router = new Router();

// Fungsi untuk menangani jika parameter query hilang
function miss(res, param) {
  return res.status(400).json({
    success: false,
    message: 'Missing query parameter: ' + param,
  });
}

// Fungsi untuk mengembalikan respons berhasil
function success(res, data) {
  return res.status(200).json({
    success: true,
    creator: 'SatzzDev',
    sosmed:{
      instagram: 'https://instagram.com/krniwnstria',
      telegram: 'https://t.me/satzzdev',
      github: 'https://github.com/satzzdev'
    },
    data: data,
  });
}

//━━━━━━━━━━━━━━━[ ROUTES ]━━━━━━━━━━━━━━━━━//

// Route untuk ChatGPT
router.get("/chatgpt", async (req, res) => {
  const { chatGPT } = require('../routes/scraper.js');
  let { text } = req.query;
  if (!text) return miss(res, 'text');
  let russ = await chatGPT(text);
  success(res, russ);
});

// Route untuk mengunduh audio (MP3) dari YouTube
router.get("/ytmp3", async (req, res) => {
  const { url } = req.query;
  if (!url) return miss(res, 'url');
  try {
    let s = await ytmp3(url)
    res.json(s)
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch video or download audio. Please check the URL and try again.',
    });
  }
});

// Route untuk mengunduh video (MP4) dari YouTube
router.get("/ytmp4", async (req, res) => {
  const { url } = req.query;
  if (!url) return miss(res, 'url');
  try {
    let s = await ytmp4(url)
    res.json(s)
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch video or download MP4. Please check the URL and try again.',
    });
  }
});

// Route untuk mengunduh dari Spotify
router.get("/spotifydl", async (req, res) => {
  const { spotifydl } = require('../routes/scraper.js');
  let { url } = req.query;
  if (!url) return miss(res, 'url');
  let russ = await spotifydl(url);
  success(res, russ);
});

module.exports = router; 