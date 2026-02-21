export const radioStations = [
  {
    id: 1,
    name: "Play Radio",
    streamUrl: "https://stream.radiojar.com/0zs50dbr274tv",
    logo: "/logos/play-radio.png",
    category: "Pop",
    country: "Europe",
  },
  {
    id: 2,
    name: "Club FM Radio",
    streamUrl: "https://cp1.sednastream.com/proxy/clubfm?mp=/stream",
    logo: "/logos/club-fm.png",
    category: "Music",
    country: "Albania",
  },
  {
    id: 3,
    name: "Alpo Radio",
    streamUrl: "https://cp1.sednastream.com/proxy/alporadio/stream",
    logo: "/logos/alpo-radiopng.png",
    category: "News",
    country: "Albania",
  },
  {
    id: 4,
    name: "Radio DJ",
    streamUrl: "https://radio.albaniaradiodj.al/stream",
    logo: "/logos/radio-dj.png",
    category: "Electro",
    country: "Albania",
  },
  {
    id: 5,
    name: "Radio Lushnja",
    streamUrl: "https://stream.radiolushnja.al/listen/radio_lushnja/radio.mp3",
    logo: "/logos/radio-lushnja.png",
    category: "Folk",
    country: "Albania",
    metadataUrl: "https://stream.radiolushnja.al/api/nowplaying/radio_lushnja",
    metadataType: "azuracast",
  },
  {
    id: 6,
    name: "Top Albania Radio",
    streamUrl: "https://live.top-media.al/tar",
    logo: "/logos/top-albania.png",
    category: "News",
    country: "Albania",
  },
  {
    id: 7,
    name: "Radio Perendimi",
    streamUrl: "https://www.rtvpendimi.com:8014/stream",
    logo: "/logos/perendimi.png",
    category: "Islamic",
    country: "Albania",
  },
  {
    id: 8,
    name: "Radio Emigranti",
    streamUrl: "http://host.psyradio.fm:8010/;listen.mp3",
    logo: "/logos/radio-emigranti.png",
    category: "Folk",
    country: "Albania",
  },
  {
    id: 9,
    name: "Klan Radio",
    streamUrl: "https://klanradio.tvklan.al/live/klanmusicradio1/playlist.m3u8",
    logo: "/logos/klan-radio.png",
    category: "Pop",
    country: "Albania",
  },
  {
    id: 10,
    name: "Radio Marimanga",
    streamUrl: "https://live2.tensila.com/ch1-a-1.philbro/hls/live/mystream.m3u8",
    logo: "/logos/radio-marimanga.png",
    category: "Folk",
    country: "Albania",
  },
];

// Get unique categories
export const getCategories = () => {
  return [...new Set(radioStations.map(station => station.category))];
};

// Get unique countries
export const getCountries = () => {
  return [...new Set(radioStations.map(station => station.country))];
};
