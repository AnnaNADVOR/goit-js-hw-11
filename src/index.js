// допрацювати сімпл лайтбокс





import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { SearchService } from './search-service';

const searchService = new SearchService();
   
const Refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

Refs.searchForm.addEventListener('submit', onSearch);
Refs.loadMoreBtn.addEventListener ('click', onLoadMore)

async function onSearch (event) {
    event.preventDefault(); 
    clearGallery();    
    searchService.query = event.currentTarget.searchQuery.value;

    if (searchService.query === '') {
        Notify.failure('Enter a word to search for!');
        return;
    } 
    
    searchService.resetPage();
    Refs.loadMoreBtn.classList.add('is-hidden');

    const photos = await searchService.fectchPhotos();
    Notify.info(`Found ${searchService.total} photos.`);
    renderCards(photos);
}


async function onLoadMore() { 
    const photos = await searchService.fectchPhotos();
    renderCards(photos);
    
}
    
function renderCards(photos) {
 
    if (photos.length === 0 ) {
        Notify.failure('Sorry! No photos available upon request. Try again.');
        return;
    } 

    const cards = createCards(photos); 
    Refs.galleryContainer.insertAdjacentHTML('beforeend', cards);

    new SimpleLightbox('.gallery_card a');
      
    if (searchService.page * searchService.limit >= searchService.total) {
        Refs.loadMoreBtn.classList.add('is-hidden');
        Notify.success('Sol lucet omnibus');
    } else {
        Refs.loadMoreBtn.classList.remove('is-hidden'); 
    }
 }

function clearGallery() {
    Refs.galleryContainer.innerHTML = "";
}
 

function createCards(photos) {

    return photos.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads}) =>
        `<div class="gallery_card">
            <a href = "${largeImageURL}">
                <img class = "gallery_img" src="${webformatURL}" alt="${tags}" loading="lazy" width = '300px'/>
            </a>
            <div class="info">
                <p class="info_item">
                    <b>Likes</b>
                    ${likes}
                </p>
                <p class="info_item">
                    <b>Vievs</b>
                    ${views}
                </p>
                <p class="info_item">
                    <b>Comments</b>
                    ${comments}
                </p>
                <p class="info_item">
                    <b>Downloads</b>
                    ${downloads}
                </p>
            </div>
          
        </div>`).join(""); 
    
}