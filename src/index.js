import axios from 'axios';
import refs from './js/ref';
import { fetchCatByBreed } from './js/cat-api';
import { fetchBreeds } from './js/cat-api';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import '/node_modules/slim-select/dist/slimselect.css';
const imgCat = document.querySelector('.js-cat-img');
const info = document.querySelector('.js-cat-info')

fetchBreeds()
  .then(data => {
    const option = data.map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    });
    refs.selectEl.insertAdjacentHTML('beforeend', option);
    new SlimSelect({
      select: '#single',
    });
    refs.loaderEl.hidden = true;
  })
  .catch(() => {
    refs.loaderEl.hidden = true;
  });

refs.selectEl.addEventListener('change', chooseCat);

function chooseCat(event) {
  event.preventDefault();
  let idCat = event.target.value;
  console.log(idCat);
  fetchCatByBreed(idCat)
    .then(data => {
const imgElement = document.createElement('img');
           refs.catInfo.innerHTML =  `<img src='${data[0].url}' width='600' alt="${data[0].breeds[0].name}">
      <div class="cat-box">
          <h2>${data[0].breeds[0].name}</h2>
          <p>${data[0].breeds[0].description}</p>
      <h2>Temperament</h2>
      <p>${data[0].breeds[0].temperament}</p>
      </div>`;
    })
    .catch(error => {
      console.log(error);
      errorEl.classList.add('error-none');
    });
}
