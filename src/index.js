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

elems.error.classList.add('is-hidden');

function addIdCats(breed) {
    elems.breedSelect.innerHTML = breed.map(breed => `<option value='${breed.id}'>${breed.name}</option>`).join('\n');
}

function fetchBreedsList() {
    fetchBreeds()
        .then(rez => {
            addIdCats(rez);
        })
        .then(() => new SlimSelect({
            select: `.breed-select`
        }))
        .catch(onFetchError)
        .finally(() => { elems.loader.classList.add('is-hidden') });
    
}

elems.breedSelect.addEventListener('change', onSelectBreed);

function onSelectBreed(evt) {
    // console.log(evt);
    const selectBreedId = evt.currentTarget.value;
    elems.catInfo.classList.add('is-hidden');
    fetchCatByBreed(selectBreedId)
        .then(data => {
            createMarkup(data);
            elems.catInfo.classList.remove('is-hidden');
        })
        .catch(onFetchError)
    .finally(() => { elems.loader.classList.add('is-hidden') })
}

function createMarkup(data) {
    const { url, breeds } = data[0];
    elems.catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
}

function onFetchError() {
    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!');
};
fetchBreedsList();


