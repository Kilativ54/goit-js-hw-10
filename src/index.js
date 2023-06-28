import axios from 'axios';
import refs from './js/ref';
import { fetchCatByBreed } from './js/cat-api';
import { fetchBreeds } from './js/cat-api';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import '/node_modules/slim-select/dist/slimselect.css';


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
    refs.errorEl.hidden = true;
  })
  .catch(() => {
    refs.loaderEl.hidden = true;
    refs.errorEl.hidden = true;
  });

refs.selectEl.addEventListener('change', chooseCat);

function chooseCat(event) {
    refs.loaderEl.hidden = false;
    refs.errorEl.hidden = true;
  event.preventDefault();
  let idCat = event.target.value;
    fetchCatByBreed(idCat)
    .then(data => {
             let marcup =  `<img src='${data[0].url}' width='500' alt="${data[0].breeds[0].name}">
      <div class="container-text">
          <h2>${data[0].breeds[0].name}</h2>
          <p>${data[0].breeds[0].description}</p>
      <h2>Temperament</h2>
      <p>${data[0].breeds[0].temperament}</p>
      </div>`;
      refs.catInfo.insertAdjacentHTML('beforeend', marcup);
      refs.loaderEl.hidden = true;
      refs.errorEl.hidden = true;
      
        })
    .catch(() => {
        refs.loaderEl.hidden = true;
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    })}

