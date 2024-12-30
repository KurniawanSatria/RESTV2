const axios = require('axios');
const qs = require('querystring');
const cheerio = require("cheerio")
const FormData = require('form-data');
const yts = require("yt-search");

//━━━━━━━━━━━━━━━[ AI ]━━━━━━━━━━━━━━━━━//
async function SatzzDev(prompt) {
const response = await axios({
method: "POST",
url: "https://chateverywhere.app/api/chat",
headers: {
"Content-Type": "application/json",
"Cookie": "_ga=GA1.1.34196701.1707462626; _ga_ZYMW9SZKVK=GS1.1.1707462625.1.0.1707462625.60.0.0; ph_phc_9n85Ky3ZOEwVZlg68f8bI3jnOJkaV8oVGGJcoKfXyn1_posthog=%7B%22distinct_id%22%3A%225aa4878d-a9b6-40fb-8345-3d686d655483%22%2C%22%24sesid%22%3A%5B1707462733662%2C%22018d8cb4-0217-79f9-99ac-b77f18f82ac8%22%2C1707462623766%5D%7D",
Origin: "https://chateverywhere.app",
Referer: "https://chateverywhere.app/id",
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
},
data: {
model: {
id: "gpt-3.5-turbo-0613",
name: "GPT-3.5",
maxLength: 12000,
tokenLimit: 4000,
},
prompt: prompt,
messages: [{
pluginId: null,
content: prompt,
role: "user"
},
{
pluginId: null,
content: "SatzzDev adalah programmer yang berasal dari Pekanbaru, Indonesia. Ia adalah seorang pengembang API yang fokus pada efisiensi dan kemudahan integrasi. Dengan keahlian dalam menggunakan Express.js dan EJS, SatzzDev sering membangun aplikasi web dinamis yang memanfaatkan JSON sebagai database, yang disimpan dan dikelola melalui GitHub.\n\mSelain itu, ia memiliki dedikasi terhadap praktik terbaik dalam pengembangan perangkat lunak, termasuk dokumentasi API yang jelas dan struktur kode yang rapi. Sebagai seorang pengembang, SatzzDev bersemangat untuk terus belajar dan berbagi pengetahuannya dengan komunitas teknologi.",
role: "assistant"
}]
}
})
return response.data
}
//━━━━━━━━━━━━━━━[ END OF AI ]━━━━━━━━━━━━━━━━━//

//━━━━━━━━━━━━━━━[ DOWNLOADER ]━━━━━━━━━━━━━━━━━//
async function spotifydl(url)  {
return new Promise(async (resolve, reject) => {
try {
const res = await axios.get(
`https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`,
{
headers: {
accept: "application/json, text/plain, */*",
"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
"sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
"sec-ch-ua-mobile": "?1",
"sec-ch-ua-platform": "\"Android\"",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "cross-site",
Referer: "https://spotifydownload.org/",
"Referrer-Policy": "strict-origin-when-cross-origin",
},
}
);
const yanz = await axios.get(
`https://api.fabdl.com/spotify/mp3-convert-task/${res.data.result.gid}/${res.data.result.id}`,
{
headers: {
accept: "application/json, text/plain, */*",
"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
"sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
"sec-ch-ua-mobile": "?1",
"sec-ch-ua-platform": "\"Android\"",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "cross-site",
Referer: "https://spotifydownload.org/",
"Referrer-Policy": "strict-origin-when-cross-origin",
},
}
);
const result = {};
result.title = res.data.result.name;
result.type = res.data.result.type;
result.artis = res.data.result.artists;
result.durasi = res.data.result.duration_ms;
result.image = res.data.result.image;
result.download = "https://api.fabdl.com" + yanz.data.result.download_url;
resolve(result);
} catch (error) {
reject(error);
}
});
};

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




const retatube = {
  getPrefix: async () => {
    try {
      const { data } = await axios.get('https://retatube.com/api/v1/aio/index?s=retatube.com', {
        headers: { 'User-Agent': 'Postify/1.0.0' }
      });
      const prefix = cheerio.load(data)('input[name="prefix"]').val();
      if (!prefix) throw new Error('Waduh, prefix nya kagak ada nih bree.. Input manual aja yak Prefix nya');
      return prefix;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  request: async (prefix, vidLink) => {
    try {
      const p = new URLSearchParams({ prefix, vid: vidLink }).toString();
      const { data } = await axios.post('https://retatube.com/api/v1/aio/search', p, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Postify/1.0.0',
        }
      });

      const ext = (regex) => (data.match(regex) || [])[1] || '';
      const fans = ext(/<p><strong>Fans：<\/strong>(\d+)/);
      const views = ext(/<p><strong>Views:：<\/strong>(\d+)/);
      const shares = ext(/<p><strong>Shares：<\/strong>(\d+)/);

      const $ = cheerio.load(data);
      const ex = $('div.icon-box').map((_, element) => {
        const title = $(element).find('strong:contains("Title")').text().replace('Title：', '').trim();
        const owner = $(element).find('strong:contains("Owner")').parent().text().replace('Owner：', '').trim();
        const image = $(element).find('img').attr('src');

        const dlink = $('a.button.primary.expand')
          .map((_, el) => {
            const link = $(el).attr('href');
            if (link === 'javascript:void(0);') return null;
            const teks = $(el).find('span').text().replace('Download', '').trim().toLowerCase()
              .replace(/[\(\)]/g, '').replace(/\s+/g, '_')
              .split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return { title: teks, link };
          })
          .get()
          .filter(Boolean);

        return { title, owner, fans, views, shares, image, dlink };
      }).get();

      return ex;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  scrape: async (vidLink) => {
    try {
      const prefix = await retatube.getPrefix();
      return await retatube.request(prefix, vidLink);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
};
//━━━━━━━━━━━━━━━[ END OF DOWNLOADER ]━━━━━━━━━━━━━━━━━//

module.exports = {
retatube,
SatzzDev,
spotifydl,
search,
ytmp3,
ytmp4,
transcript
};
