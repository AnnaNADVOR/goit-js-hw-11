import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import { SearchService } from './search-service';

const searchService = new SearchService();
   
const Refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

Refs.searchForm.addEventListener('submit', onSearch);
Refs.loadMoreBtn.addEventListener ('click', onLoadMore)

function onSearch (event) {
    event.preventDefault(); 
        
    searchService.query = event.currentTarget.searchQuery.value;
    searchService.resetPage();
    searchService.fectchPhotos().then(createCard);
}

function onLoadMore() { 
    searchService.fectchPhotos();
}
    
function createCard(photos) {

    const card = photos.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads }) =>
        `<div class="gallery_card">
            <img class = "gallery_img" src="${webformatURL}" alt="${tags}" loading="lazy" width = '300px'/>
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
        </div>`
    ).join(""); 
    
    Refs.galleryContainer.insertAdjacentHTML('beforeend', card);
}