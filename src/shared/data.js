const db = {
  people: [
    {
      id: 2244998,
      name: "Spider-Man",
      description: "Man with a spider powers.",
      comics: []
    },
    {
      id: 4099090,
      name: "Capitan America",
      description: "Dude with a spartan-like shield.",
      comics: []
    }
  ],
  pics: [
    {
      id: 2244998,
      url:
        "https://i.annihil.us/u/prod/marvel/i/mg/9/30/538cd33e15ab7/standard_xlarge.jpg"
    },
    {
      id: 4099090,
      url:
        "https://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087/standard_xlarge.jpg"
    }
  ],
  comicses: [
    {
      title: "Marvel Age Spider-Man Vol. 2: Everyday Hero (Digest)",
      hero: "Spider-Man"
    },
    {
      title:
        "Friendly Neighborhood Spider-Man Vol. 2: Hostile Takeovers (Trade Paperback)",
      hero: "Spider-Man"
    },
    {
      title: "Spider-Man & Venom: Double Trouble #3",
      hero: "Spider-Man"
    },
    {
      title: "Generations (Hardcover)",
      hero: "Capitan America"
    },
    {
      title: "Secret Empire (Hardcover)",
      hero: "Capitan America"
    },
    {
      title: "Avengers: Standoff (Trade Paperback)",
      hero: "Capitan America"
    },
    {
      title: "Marvel Legacy #1",
      hero: "Capitan America"
    },
    {
      title: "Avengers #11",
      hero: "Capitan America"
    }
  ]
};

const getPeople = async function() {
  return new Promise(resolve => {
    setTimeout(() => resolve(db.people), 1500);
  });
};

const getPics = async function() {
  return new Promise(resolve => {
    setTimeout(() => resolve(db.pics), 2000);
  });
};

const getComics = async function() {
  return new Promise(resolve => {
    setTimeout(() => resolve(db.comicses), 2000);
  });
};

export const data = {
  getPeople,
  getPics,
  getComics
};
