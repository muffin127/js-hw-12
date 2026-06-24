import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = form.elements['search-text'].value.trim();

  if (!searchQuery) return;

  page = 1;

  clearGallery();
  loadMoreBtn.classList.add('is-hidden');
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    const { hits, totalHits } = data;

    if (hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(hits);

    const totalPages = Math.ceil(totalHits / 15);

    if (page < totalPages) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Try again!',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    const { hits, totalHits } = data;

    createGallery(hits);

    // SCROLL
    const card = document.querySelector('.gallery-item');

    if (!card) return;

    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(totalHits / 15);

    if (page >= totalPages) {
      loadMoreBtn.classList.add('is-hidden');

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Try again!',
    });
  } finally {
    hideLoader();
  }
});
