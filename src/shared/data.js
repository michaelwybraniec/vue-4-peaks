const db = {
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
  ]
};

const getPeople = async function() {
  return new Promise(resolve => {
    setTimeout(() => resolve(db.people), 1500);
  });
};

const getPics = async function() {
  return new Promise(resolve => {
    setTimeout(() => resolve(db.pics), 1000);
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
