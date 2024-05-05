import API from "./API"

const articleService = {
    getAll(inputParams = {}) {
        return API.call().get('wp/v2/posts', {
            params: {
                per_page: 3,
                page: 1,
                lang: 'vi',
                ...inputParams
            }
        });
    },

    getLatest() {
        return this.getAll()
    },
    getPopular() {
        return this.getAll({orderby: 'post_views'});
    },
    getRandom(page) {
        return this.getAll({page, per_page: 2});
    },
    getBySlug(slug) {
        // return API.call().get(`/wp/v2/posts?slug=${slug}`)
        return this.getAll({slug})
    },
    getByAuthor(params = {}) {
        // return API.call().get(`wp/v2/posts?per_page=3&page=1&author=${authorID}&lang=vi&exclude=18`)
        return this.getAll(params)
    },
    getByCategory(both) {
        return API.call().get(`/wp/v2/posts?per_page=2&page=${both[1]}&categories=${both[0]}&lang=vi`)
    },
    getByKeyword(both) {
        return API.call().get(`/wp/v2/posts?per_page=2&page=${both[1]}&search=${both[0]}&lang=vi`)
    },
}

export default articleService;