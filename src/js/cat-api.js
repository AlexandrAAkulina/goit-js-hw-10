// axios.defaults.headers.common["x-api-key"] = "live_aqGn0sP4yhYYK1NbT5HhLP2rLSG7wibrGzoTxoIhjK584UPeuEEgXmsBAa7H9QIX";
// axios.defaults.baseURL = 'https://api.thecatapi.com/v1/breeds';



export function fetchBreeds() {
    const BASE_URL = 'https://api.thecatapi.com/v1';
    const API_KEY = 'live_aqGn0sP4yhYYK1NbT5HhLP2rLSG7wibrGzoTxoIhjK584UPeuEEgXmsBAa7H9QIX';
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
        .then(resp => {
            // console.log(resp);
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json();
    })
}

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}$breed_ids=${breedId}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json();
    })
}