class EasyworkshopService {
    _apiBase = 'http://localhost:3000/';

     getResource = async (url) => {
         let res = await fetch(url);

         if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
         }

         return await res.json();
     }

     getAllCards = async () => {
        return await this.getResource(`${this._apiBase}cards`);
     }

    getCard = async (id) => {
        return await this.getResource(`${this._apiBase}cards/${id}`);
    }
}

export default EasyworkshopService;