import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const elems = {
    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

elems.catInfo.classList.add('is-hidden');
elems.loader.classList.replace('loader', 'is-hidden');
elems.error.classList.add('is-hidden');

let arrBreedsId = [];
fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: elems.breedSelect,
        data: arrBreedsId
    });
    })
.catch(onFetchError);

elems.breedSelect.addEventListener('change', onSelectBreed);

function onSelectBreed(evt) {
    elems.breedSelect.classList.add('is-hidden');
    elems.loader.classList.replace('is-hidden', 'loader');
    elems.catInfo.classList.add('is-hidden');
    const breedId = evt.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        elems.loader.classList.replace('loader', 'is-hidden');
        elems.breedSelect.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        elems.catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        elems.catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};

function onFetchError() {
    elems.breedSelect.classList.remove('is-hidden');
    elems.loader.classList.replace('loader', 'is-hidden');
    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!');
};