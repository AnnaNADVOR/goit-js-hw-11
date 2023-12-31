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

async function onSearch(event) {
    try {
        event.preventDefault();     
        clearGallery();    
        searchService.query = event.currentTarget.searchQuery.value;

        if (searchService.query === '') {
        return  Notify.failure('Enter a word to search for!');
        } 
    
        searchService.resetPage();
        Refs.loadMoreBtn.classList.add('is-hidden');

        const photos = await searchService.fectchPhotos();
        Notify.info(`Found ${searchService.total} photos.`);
        renderCards(photos);   
    } catch (error) {
        Notify.failure('Oops! Something went wrong. Try again.');
    }       
}

async function onLoadMore() { 
    try {
        const photos = await searchService.fectchPhotos();
        renderCards(photos);   
    } catch (error) {
        Notify.failure('Oops! Something went wrong. Try again.');
    }      
}
    
function renderCards(photos) {
 
    if (photos.length === 0 ) {
        return  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        
    } 

    const cards = createCards(photos); 
    Refs.galleryContainer.insertAdjacentHTML('beforeend', cards);

    new SimpleLightbox('.gallery_card a').refresh(); 
    
    if (searchService.page * searchService.limit >= searchService.total) {
        Refs.loadMoreBtn.classList.add('is-hidden');
        Notify.success(`We're sorry, but you've reached the end of search results.`);
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

