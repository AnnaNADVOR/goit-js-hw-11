import axios from "axios";

class SearchService {
    constructor() {
        this.searchQuery = ''; 
        this.page = 1; 
    }

    fectchPhotos() {
        const API_KEY = "39912863-1650dbe31ef88f10e118c8e6a";
        const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orintation=horizontal&safesearch=true&per_page=20&page=${this.page}`;
        return axios.get(URL)
            .then(response => {
                this.page += 1;
                return response.data.hits;
            });   
    }

    resetPage() {
        this.page = 1; 
    }

    get query () {
        return this.searchQuery;
    }

    set query (newQuery) {
        this.searchQuery = newQuery
    }
}

export { SearchService };
    
