// Radio stations data with placeholder URLs
// Replace streamUrl with your actual radio stream URLs

export const radioStations = [
  {
    id: 1,
    name: "Play Radio",
    streamUrl: "https://stream.radiojar.com/0zs50dbr274tv",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop",
    category: "Pop",
    country: "Europe",
    playCount: 0
  },
  {
    id: 2,
    name: "Club FM Radio",
    streamUrl: "https://cp1.sednastream.com/proxy/clubfm?mp=/stream",
    logo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&h=200&fit=crop",
    category: "Music",
    country: "Albania",
    playCount: 0
  },
  {
    id: 3,
    name: "Alpo Radio",
    streamUrl: "https://cp1.sednastream.com/proxy/alporadio/stream",
    logo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop",
    category: "News",
    country: "Albania",
    playCount: 0
  },
  {
    id: 4,
    name: "Radio DJ",
    streamUrl: "https://radio.albaniaradiodj.al/stream",
    logo: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop",
    category: "Electro",
    country: "Albania",
    playCount: 0
  },
  {
    id: 5,
    name: "Radio Lushnja",
    streamUrl: "https://stream.radiolushnja.al/listen/radio_lushnja/radio.mp3",
    logo: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=200&h=200&fit=crop",
    category: "Folk",
    country: "Albania",
    playCount: 0
  },
  {
    id: 6,
    name: "Top Albania Radio",
    streamUrl: "https://live.top-media.al/tar",
    logo: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=200&h=200&fit=crop",
    category: "News",
    country: "Albania",
    playCount: 0
  },
  {
    id: 7,
    name: "Radio Perendimi",
    streamUrl: "https://www.rtvpendimi.com:8014/stream",
    logo: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
    category: "Islamic",
    country: "Albania",
    playCount: 0
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
