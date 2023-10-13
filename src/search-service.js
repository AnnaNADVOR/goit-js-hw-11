import axios from "axios";

class SearchService {
    constructor() {
        this.searchQuery = ''; 
        this.page = 0;
        this.total = 0; 
        this.limit = 40; 
    }

    // fectchPhotos() {
    //     const API_KEY = "39912863-1650dbe31ef88f10e118c8e6a";
    //     const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orintation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    //     return axios.get(URL)
    //         .then(response => {
    //             this.page += 1;
    //             this.total = response.data.totalHits; 
    //             return response.data.hits;
    //         });   
    // }

    async fectchPhotos() {
        this.page += 1; 

        const API_KEY = "39912863-1650dbe31ef88f10e118c8e6a";
        const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orintation=horizontal&safesearch=true&per_page=${this.limit}&page=${this.page}`;
        const response = await axios.get(URL);

        this.total = response.data.totalHits;
        
        return response.data.hits;
    }

    resetPage() {
        this.page = 0; 
    }

    get query () {
        return this.searchQuery;
    }

    set query (newQuery) {
        this.searchQuery = newQuery;
    }
}

export { SearchService };
    
