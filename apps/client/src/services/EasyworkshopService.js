import { matchSorter } from 'match-sorter';

class EasyworkshopService {
  _apiBase = 'http://localhost:3000/';
  // _apiBase = 'http://192.168.51.55:3000/';
  // _apiBase = 'http://10.10.16.181:3000/';
  // _apiBase = 'http://172.20.10.2:3000/';
  

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCards = async () => {
    return await this.getResource(`${this._apiBase}cards`);
  };

  getCard = async (id) => {
    const res = await this.getResource(`${this._apiBase}cards`);
    return res.filter((card) => card.id == id)[0];
  };

  getProfile = async (id) => {
    const res = await this.getResource(`${this._apiBase}profiles`);
    const profile = res.filter((profile) => profile.id == id);
    return await this._transformProfile(profile[0]);
  };

  getProfileByName = async (name) => {
    const res = await this.getResource(`${this._apiBase}cards`);
    return res.filter((card) => {
      console.log(matchSorter(card.title, name));
      return matchSorter(card.title, name);
    });
  };

  _transformProfile = async ({
    itemsId,
    firstName,
    lastName,
    id,
    background,
    img,
    about,
    nickname,
    favorites,
  }) => {
    const cardList = await Promise.all(
      itemsId.map(async (id) => {
        return await this.getCard(id);
      }),
    );
    const favoritesList = favorites
      ? await Promise.all(
          favorites.map(async (id) => {
            return await this.getCard(id);
          }),
        )
      : null;
    return {
      firstName: firstName,
      lastName: lastName,
      id: id,
      background: background,
      img: img,
      about: about,
      nickname: nickname,
      favorites: favoritesList,
      cardList: cardList,
    };
  };
}

export default EasyworkshopService;
