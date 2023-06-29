import axios from 'axios';
import { fetchCatByBreed } from './js/cat-api';
import { fetchBreeds } from './js/cat-api';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import '/node_modules/slim-select/dist/slimselect.css';
const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loaderEl.classList.add('invisible');
fetchBreeds()
  .then(data => {
    const option = data.map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    });
    selectEl.insertAdjacentHTML('beforeend', option);
    new SlimSelect({
      select: '#single',
    });

    errorEl.hidden = true;
  })
  .catch(() => {
    errorEl.hidden = true;
  });

selectEl.addEventListener('change', chooseCat);

function chooseCat(event) {
  catInfo.innerHTML = '';
  loaderEl.classList.remove('invisible');
  errorEl.hidden = true;
  event.preventDefault();
  let idCat = event.target.value;
  fetchCatByBreed(idCat)
    .then(data => {
      let marcup = `<img src='${data[0].url}' width='500' heigh alt="${data[0].breeds[0].name}">
      <div class="container-text">
          <h2>${data[0].breeds[0].name}</h2>
          <p>${data[0].breeds[0].description}</p>
      <h2>Temperament</h2>
      <p>${data[0].breeds[0].temperament}</p>
      </div>`;
      catInfo.insertAdjacentHTML('beforeend', marcup);
      loaderEl.classList.add('invisible');
      errorEl.hidden = true;
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
