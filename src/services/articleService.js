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
    getPostList(page) {
        return API.call().get(`/wp/v2/posts?per_page=10&page=${page}`)
    },
    addNewPost(payload) {
        return API.callWithToken(payload.token).post('/wp/v2/posts?lang=vi',payload.content)
    },
    delete(payload) {
        return API.callWithToken(payload.token).delete(`wp/v2/posts/${payload.id}?force=true`)
    },
    edit(payload) {
        return API.callWithToken(payload.token).put(`wp/v2/categories/${payload.id}?force=true`, payload.content)
    }
}

export default articleService;