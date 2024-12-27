const axios = require('axios');
const qs = require('querystring');
const cheerio = require("cheerio")
const FormData = require('form-data');
const yts = require("yt-search");

//━━━━━━━━━━━━━━━[ AI ]━━━━━━━━━━━━━━━━━//
async function chatGPT(text) {
return new Promise(async (resolve, reject) => {
try {
const form = new FormData();
form.append('_wpnonce', 'b56c11a9aa');
form.append('post_id', '2');
form.append('url', 'https://chatopenai.id');
form.append('action', 'wpaicg_chat_shortcode_message');
form.append('message', text);
form.append('bot_id', '0');
form.append('chatbot_identity', 'shortcode');
form.append('wpaicg_chat_client_id', 'WG2ENtOylf');
form.append('wpaicg_chat_history', JSON.stringify(["Human: mulai sekarang Kamu Adalah Satzz Voldigoad adalah seorang Pengembang bot WhatsApp, Satzz Voldigoad dulu dikenal sebagai Programmer, dan ia ikut oleh team Cyber Security Networking. Danz berasal dari Pekanbaru.","AI: Halo! Saya adalah Satzz Voldigoad, seorang Pengembang bot WhatsApp. Sebelumnya, saya dikenal sebagai Programmer dan saya juga bergabung dengan tim Cyber Security Networking. Saya berasal dari Pekanbaru. Jika ada yang ingin Anda tanyakan tentang pengembangan bot atau topik lainnya, silakan beri tahu saya! Saya di sini untuk membantu. 😊"]));
const response = await axios.post('https://chatopenai.id/wp-admin/admin-ajax.php', form, {
headers: form.getHeaders()  
});
resolve(response.data.data);
} catch (error) {
reject(error);
}
});
}
//━━━━━━━━━━━━━━━[ END OF AI ]━━━━━━━━━━━━━━━━━//

//━━━━━━━━━━━━━━━[ DOWNLOADER ]━━━━━━━━━━━━━━━━━//
async function spotifydl(url) {
return new Promise(async (resolve, reject) => {
try {
const data = {
url
};
const headers_1 = {
"Accept": "*/*",
"Accept-Encoding": "gzip, deflate, br",
"Accept-Language": "en-US,en;q=0.9",
"Content-Type": "application/json",
"Origin": "https://spotydown.com",
"Referer": "https://spotydown.com/",
"Sec-Ch-Ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
"Sec-Ch-Ua-Mobile": "?0",
"Sec-Ch-Ua-Platform": '"Windows"',
"Sec-Fetch-Dest": "empty",
"Sec-Fetch-Mode": "cors",
"Sec-Fetch-Site": "same-origin",
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36"
};
const headers = {
"Accept": "*/*",
"Accept-Encoding": "gzip, deflate, br",
"Accept-Language": "en-US,en;q=0.9",
"Content-Type": "application/json",
"Origin": "https://spotydown.com",
"Referer": "https://spotydown.com/",
"Sec-Ch-Ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
"Sec-Ch-Ua-Mobile": "?0",
"Sec-Ch-Ua-Platform": '"Windows"',
"Sec-Fetch-Dest": "empty",
"Sec-Fetch-Mode": "cors",
"Sec-Fetch-Site": "same-origin",
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36"
};
const rs = await axios.post("https://spotydown.com/api/get-metadata", data, { headers: headers_1 })
const response = await axios.post('https://spotydown.com/api/download-track', data, { headers })
let fileUrl = response.data.file_url
let metadata = rs.data.apiResponse.data[0]
resolve({
metadata,
fileUrl
});
} catch (error) {
reject(error);
}
});
}
function getYouTubeVideoId(url) {
const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|v\/|embed\/|user\/[^\/\n\s]+\/)?(?:watch\?v=|v%3D|embed%2F|video%2F)?|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/|youtube\.com\/playlist\?list=)([a-zA-Z0-9_-]{11})/;
const match = url.match(regex);
return match ? match[1] : null;
}

async function search(teks) {
try {
let data = await yts(teks);
return {
status: true,
creator: "@krniwnstria",
results: data.all
};
} catch (error) {
return {
status: false,
message: error.message
};
}
}

const audio = ["92", "128", "256", "320"]
const video = ["144", "360", "480", "720", "1080"]

async function savetube(link, quality, value) {
try {
const headers = {
accept: '*/*',
referer: 'https://ytshorts.savetube.me/',
origin: 'https://ytshorts.savetube.me/',
'user-agent': 'Postify/1.0.0',
'Content-Type': 'application/json'
};
const cdnNumber = 54
const cdnUrl = `cdn${cdnNumber}.savetube.su`;
const videoInfoResponse = await axios.post(
`https://${cdnUrl}/info`, {
url: link
}, {
headers: {
...headers,
authority: `cdn${cdnNumber}.savetube.su`
}
}
);
const videoInfo = videoInfoResponse.data.data;
const type = value == 1 ? "audio" : 'video'
const body = {
downloadType: type,
quality,
key: videoInfo.key
};
const downloadResponse = await axios.post(
`https://${cdnUrl}/download`,
body, {
headers: {
...headers,
authority: `cdn${cdnNumber}.savetube.su`
}
}
);
const downloadData = downloadResponse.data.data;
return {
status: true,
quality: value == 1 ? `${quality}kbps` : `${quality}p`,
availableQuality: value == 1 ? audio : video,
url: downloadData.downloadUrl,
filename: (`${videoInfo.title}`) + (value == 1 ? ` (${quality}kbps).mp3` : ` (${quality}p).mp4`)
};
} catch (error) {
return {
status: false,
message: error.message
}
}
}

const cnv = {
getfile: async (url, format, value) => {
try {
let videoId = getYouTubeVideoId(url)
let cekData = await cnv.cekDatabase(url, format, value)
if (cekData.success && cekData.data.server_path) {
return {
status: true,
quality: value == 1 ? `${format}kbps` : `${format}p`,
availableQuality: value == 1 ? audio : video,
url: cekData.data.server_path,
filename: (`${videoId}`) + (value == 1 ? ` (${format}kbps).mp3` : ` (${format}p).mp4`)
};
} else {
let down = await cnv.download(url, format, value)
let base = await cnv.toDatabase(url, down.download_link, format, value)
return {
status: true,
quality: value == 1 ? `${format}kbps` : `${format}p`,
availableQuality: value == 1 ? audio : video,
url: down.download_link,
filename: (`${videoId}`) + (value == 1 ? ` (${format}kbps).mp3` : ` (${format}p).mp4`)
};
}
} catch (error) {
return {
status: false,
message: error.message
};
}
},
cekDatabase: async (url, format, value) => {
try {
let videoId = getYouTubeVideoId(url)
const response = await axios.post(
'https://cnvmp3.com/check_database.php', {
'youtube_id': videoId,
'quality': format,
'formatValue': value
}, {
headers: {
'Content-Type': 'application/json',
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
'Referer': 'https://cnvmp3.com/'
}
}
);
return response.data
} catch (error) {
return {
success: false,
message: error.message
};
}
},
toDatabase: async (url, file, format, value) => {
try {
let videoId = getYouTubeVideoId(url)
const response = await axios.post(
'https://cnvmp3.com/insert_to_database.php', {
'youtube_id': videoId,
'server_path': file,
'quality': format,
'title': videoId,
'formatValue': value
}, {
headers: {
'Content-Type': 'application/json',
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
'Referer': 'https://cnvmp3.com/'
}
}
);
return response.data
} catch (error) {
return {
success: false,
message: error.message
};
}
},
download: async (url, format, value) => {
try {
let videoId = getYouTubeVideoId(url)
const response = await axios.post(
'https://cnvmp3.com/download_video.php', {
'url': url,
'quality': format,
'title': videoId,
'formatValue': value
}, {
headers: {
'Content-Type': 'application/json',
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
'Referer': 'https://cnvmp3.com/'
}
}
);
return response.data
} catch (error) {
return {
success: false,
message: error.message
};
}
}
}

const inv = {
getfile: async (url, format, value) => {
let videoId = getYouTubeVideoId(url)
return {
status: true,
quality: value == 140 ? `${format}kbps` : `${format}p`,
availableQuality: [format],
url: `https://inv.nadeko.net/latest_version?id=${videoId}&itag=${value}&local=true`,
filename: (`${videoId}`) + (value == 140 ? ` (${format}kbps).mp3` : ` (${format}p).mp4`)
};
}
}

async function ytmp3(link, formats = 128) {
const videoId = getYouTubeVideoId(link);
const format = audio.includes(formats) ? formats : 128
if (!videoId) {
return {
status: false,
message: "Invalid YouTube URL"
};
}
try {
let data = await yts("https://youtube.com/watch?v=" + videoId);
let response = await savetube("https://youtube.com/watch?v=" + videoId, format, 1)
if (!response.status) {
response = await cnv.getfile("https://youtube.com/watch?v=" + videoId, format, 1)
}
if (!response.status) {
response = await inv.getfile("https://youtube.com/watch?v=" + videoId, 128, 140)
}
return {
status: true,
creator: "@krniwnstria",
metadata: data.all[0],
download: response
};
} catch (error) {
console.log(error)
return {
status: false,
message: error.response ? `HTTP Error: ${error.response.status}` : error.message
};
}
}

async function ytmp4(link, formats = 360) {
const videoId = getYouTubeVideoId(link);
const format = video.includes(formats) ? formats : 360
if (!videoId) {
return {
status: false,
message: "Invalid YouTube URL"
};
}
try {
let data = await yts("https://youtube.com/watch?v=" + videoId);
let response = await savetube("https://youtube.com/watch?v=" + videoId, format, 0)
if (!response.status) {
response = await cnv.getfile("https://youtube.com/watch?v=" + videoId, format, 0)
}
if (!response.status) {
response = await inv.getfile("https://youtube.com/watch?v=" + videoId, 360, 18)
}
return {
status: true,
creator: "@krniwnstria",
metadata: data.all[0],
download: response
};
} catch (error) {
console.log(error)
return {
status: false,
message: error.response ? `HTTP Error: ${error.response.status}` : error.message
};
}
}

async function transcript(link) {
try {
const response = await axios.get('https://ytb2mp4.com/api/fetch-transcript', {
params: {
'url': link
},
headers: {
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
'Referer': 'https://ytb2mp4.com/youtube-transcript'
}
});
return {
status: true,
creator: "@krniwnstria",
transcript: response.data.transcript
}
} catch (error) {
return {
status: false,
message: error.message
}
}
}
//━━━━━━━━━━━━━━━[ END OF DOWNLOADER ]━━━━━━━━━━━━━━━━━//

module.exports = {
chatGPT,
spotifydl,
search,
ytmp3,
ytmp4,
transcript
};
