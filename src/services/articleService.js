import API from "./API"

const articleService = {
    getLatest() {
        return API.call().get('wp/v2/posts?per_page=3&page=1&orderby=date&lang=vi');
    },
    getPopular() {
        return API.call().get('wp/v2/posts?per_page=3&page=1&orderby=post_views&lang=vi');
    },
    getRandom(page) {
        return API.call().get(`wp/v2/posts?page=${page}&per_page=4&lang=vi`);
    },
    getBySlug(slug) {
        return API.call().get(`/wp/v2/posts?slug=${slug}`)
    },
    getByAuthor(authorID) {
        return API.call().get(`wp/v2/posts?per_page=3&page=1&author=${authorID}&lang=vi&exclude=18`)
    },
    getByCategory(both) {
        return API.call().get(`/wp/v2/posts?per_page=5&page=${both[1]}&categories=${both[0]}&lang=vi`)
    },
    getByKeyword(both) {
        return API.call().get(`/wp/v2/posts?per_page=5&page=${both[1]}&search=${both[0]}&lang=vi`)
    },
}

export default articleService;