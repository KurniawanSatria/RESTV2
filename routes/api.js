const { Router, response } = require('express');
const { ytmp3, ytmp4, search, transcript} = require('./scraper.js');
const axios = require('axios');
//━━━━━━━━━━━━━━━[ ROUTER ]━━━━━━━━━━━━━━━━━//
const router = new Router();

// Fungsi untuk menangani jika parameter query hilang
function miss(res, param) {
return res.status(400).json({ creator : '@krniwnstria', status : false, msg : "[!] Parameter " + param + ' ' + 'required'});
}

// Fungsi untuk mengembalikan respons berhasil
function success(res, data) {
return res.status(200).json({
status: true,
creator: '@krniwnstria',
...data,
});
}
function failed(res) {
return res.status(500).json({
status: false,
creator: '@krniwnstria',
msg: 'An error occurred.'
});
} 
//━━━━━━━━━━━━━━━[ ROUTES ]━━━━━━━━━━━━━━━━━//

// Route untuk ChatGPT
router.get("/ai/satzz", async (req, res) => {
const { SatzzDev } = require('../routes/scraper.js');
let { text } = req.query;
if (!text) return miss(res, 'text');
let russ = await SatzzDev(text);
success(res, russ);
});


// Route untuk mengunduh audio (MP3) dari YouTube
router.get("/instagram", async (req, res) => {
const { url } = req.query;
if (!url) return miss(res, 'url');
try {
let s = await axios.get(`https://api.nasirxml.my.id/download/instagram?url=${url}`)
let re = s.data.data
success(res, re)
} catch (error) {
console.error('Error processing request:', error.message);
failed(res)
}
});

// Route untuk mengunduh audio (MP3) dari YouTube
router.get("/ytsearch", async (req, res) => {
const { query } = req.query;
if (!query) return miss(res, 'query');
try {
let s = await search(text)
success(res, s)
} catch (error) {
console.error('Error processing request:', error.message);
failed(res)
}
});

// Route untuk mengunduh audio (MP3) dari YouTube
router.get("/yttranscript", async (req, res) => {
const { yt_url } = req.query;
if (!yt_url) return miss(res, 'yt_url');
try {
let s = await transcript(yt_url)
success(res, s)
} catch (error) {
console.error('Error processing request:', error.message);
failed(res)
}
});

// Route untuk mengunduh audio (MP3) dari YouTube
router.get("/ytmp3", async (req, res) => {
const { url } = req.query;
if (!url) return miss(res, 'url');
try {
let s = await ytmp3(url)
  success(res, s)
} catch (error) {
console.error('Error processing request:', error.message);
failed(res)
}
});

// Route untuk mengunduh video (MP4) dari YouTube
router.get("/ytmp4", async (req, res) => {
const { url } = req.query;
if (!url) return miss(res, 'url');
try {
let s = await ytmp4(url)
  success(res, s)
} catch (error) {
console.error('Error processing request:', error.message);
   failed(res)
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



router.get('/brat', async (req, res) => {
var text = req.query.text
if(!text) return miss(res, 'text')
try {
const response = await axios.get(`https://lanaxsad-brat.hf.space/brat?q=${encodeURIComponent(text)}`,{responseType:'arraybuffer'});
const buffer = await response.data
res.set('Content-Type', 'image/webp');
res.send(buffer);
} catch (error) {
   failed(res)
}
});


module.exports = router; 