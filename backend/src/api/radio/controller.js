const db = require("../../config/db");

const STATIONS_FALLBACK = [
  { id:1, name:"Radio Nepal",    frequency:"100 MHz",  genre:"National",    stream_url:"https://stream1.radionepal.gov.np/live/",                    website:"https://radionepalonline.com",  description:"Official national broadcaster" },
  { id:2, name:"Kantipur FM",    frequency:"96.1 MHz", genre:"News/Music",  stream_url:"https://radio-broadcast.ekantipur.com/stream/",              website:"https://radiokantipur.com",     description:"Nepal's most popular FM" },
  { id:3, name:"Image FM",       frequency:"97.9 MHz", genre:"Music",       stream_url:"https://stream.zeno.fm/fvrx47wpg0quv",                       website:"https://imagefm.com.np",        description:"Hit music and entertainment" },
  { id:4, name:"Hits FM",        frequency:"91.2 MHz", genre:"Pop/Hits",    stream_url:"https://usa15.fastcast4u.com/proxy/hitsfm912?mp=/1",          website:"https://hitsfm.com.np",         description:"Top hits and Nepali pop" },
  { id:5, name:"Ujyaalo FM",     frequency:"90 MHz",   genre:"News",        stream_url:"https://stream.zeno.fm/h527zwd11uquv",                       website:"https://ujyaaloonline.com",     description:"News and current affairs" },
  { id:6, name:"Sagarmatha FM",  frequency:"102.4 MHz",genre:"Cultural",    stream_url:"https://stream.zeno.fm/60tx8fw9dd0uv",                       website:"https://sagarmatharadio.com",   description:"Cultural and folk music" },
  { id:7, name:"Annapurna FM",   frequency:"93.4 MHz", genre:"Regional",    stream_url:"https://shoutcast.prixa.live/annapurna",                     website:"https://annapurnafm.com",       description:"Regional news and music" },
  { id:8, name:"Kalika FM",      frequency:"88.0 MHz", genre:"Bhajan",      stream_url:"https://stream.hamropatro.com/8783",                         website:"https://kalikafm.com",          description:"Devotional and bhajan music" },
];

const BHAJANS_FALLBACK = [
  {
    id:1, title:"Om Namah Shivaya",   artist:"Traditional Chanting", duration:"8:24", icon:"🕉",  category:"shiva",
    stream_url:"https://archive.org/download/OmNamahShivaya_125/OmNamaShivayaChanting.mp3"
  },
  {
    id:2, title:"Aum Namah Shivaya",  artist:"Mantra Chants 432Hz",  duration:"10:12",icon:"🔱",  category:"shiva",
    stream_url:"https://archive.org/download/BestShivaMantras/Aum%20Namah%20Shivaya.mp3"
  },
  {
    id:3, title:"Hanuman Chalisa",    artist:"Devotional",           duration:"7:30", icon:"🙏",  category:"hanuman",
    stream_url:"https://archive.org/download/HindiBhajanmp3-HanumanChalisaAartiyaan/1-ShreeHanumanChalisashreeHanumanChalisaSinger-Har.mp3"
  },
  {
    id:4, title:"Bajrang Baan",       artist:"Traditional",          duration:"6:45", icon:"🐒",  category:"hanuman",
    stream_url:"https://archive.org/download/ShreeHanumanChalisa_201510/01%20Bajrang%20Baan.mp3"
  },
  {
    id:5, title:"Jai Santoshi Mata",  artist:"Aarti",                duration:"5:20", icon:"🪔",  category:"devi",
    stream_url:"https://archive.org/download/HindiBhajanmp3-HanumanChalisaAartiyaan/10-jaiSantoshiMataaarti-Vol-3.mp3"
  },
  {
    id:6, title:"Om Jai Jagdish Hare",artist:"Vishnu Aarti",         duration:"4:55", icon:"🌸",  category:"vishnu",
    stream_url:"https://archive.org/download/HindiBhajanmp3-HanumanChalisaAartiyaan/11-omJaiJagdishHareaarti-Vol-3.mp3"
  },
  {
    id:7, title:"Om Jai Laxmi Mata",  artist:"Laxmi Aarti",          duration:"5:10", icon:"💛",  category:"laxmi",
    stream_url:"https://archive.org/download/HindiBhajanmp3-HanumanChalisaAartiyaan/12-omJaiLaxmiMataaarti-Vol-3.mp3"
  },
  {
    id:8, title:"Jai Gange Mata",     artist:"Ganga Aarti",          duration:"4:30", icon:"🌊",  category:"ganga",
    stream_url:"https://archive.org/download/HindiBhajanmp3-HanumanChalisaAartiyaan/13-jaiGangeMataaarti-Vol-3.mp3"
  },
];

const getStations = async (req, res) => {
  try {
    const r = await db.query("SELECT * FROM radio_stations WHERE is_active = true ORDER BY id");
    res.json(r.rows.length ? r.rows : STATIONS_FALLBACK);
  } catch { res.json(STATIONS_FALLBACK); }
};

const getBhajans = (req, res) => res.json(BHAJANS_FALLBACK);

module.exports = { getStations, getBhajans };
