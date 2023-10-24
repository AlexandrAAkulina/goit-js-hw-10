import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
// import axios from "axios";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const elems = {
    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector
}