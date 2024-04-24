import API from "./API";

const categoryService = {
    getAll() {
        return API.call().get('wp/v2/categories?per_page=100&page=1&lang=vi');
    }
}

export default categoryService;