import './css/style.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.getElementById('load-more-btn');
const loader = document.querySelector('.loader');

let searchQuery = '';
let page = 1;
const perPage = 20;
let totalHits = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = form.elements.searchQuery.value.trim();
  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');

  if (!searchQuery) {
    return iziToast.warning({ message: 'Please enter a search term.', position: 'topRight' });
  }

  await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  await fetchImages();
});

async function fetchImages() {
  try {
    showLoader(true);
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '50752157-0e570532136d69fa984569dbb',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    const { hits, totalHits: total } = response.data;
    totalHits = total;

    if (hits.length === 0 && page === 1) {
      iziToast.error({ message: 'No images found. Try another search.', position: 'topRight' });
      return;
    }

    renderGallery(hits);
    lightbox.refresh();

    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({ message: "We're sorry, but you've reached the end of search results.", position: 'topRight' });
    } else {
      loadMoreBtn.classList.remove('hidden');
    }

    if (page > 1) scrollByCards();

  } catch (error) {
    iziToast.error({ message: 'Failed to fetch images.', position: 'topRight' });
  } finally {
    showLoader(false);
  }
}

function renderGallery(images) {
  const markup = images
    .map(
      image => `
      <div class="photo-card">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views:</b> ${image.views}</p>
          <p><b>Comments:</b> ${image.comments}</p>
          <p><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </div>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function showLoader(isLoading) {
  loader.classList.toggle('hidden', !isLoading);
}

function scrollByCards() {
  const card = document.querySelector('.gallery .photo-card');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
