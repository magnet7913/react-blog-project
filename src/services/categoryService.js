import API from "./API";

const categoryService = {
    getAll() {
        return API.call().get('wp/v2/categories?per_page=100&page=1&lang=vi');
    },
    postNew(token,newCategory) {
        return API.callWithToken(token).post("wp/v2/categories?lang=vi",newCategory)
    },
    delete(token,id) {
        return API.callWithToken(token).delete(`wp/v2/categories?id=${id}`)
    }
}

export default categoryService;