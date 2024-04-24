import API from "./API";

const commentService = {
    getComment(postId) {
        return API.call().get(`wp/v2/comments?per_page=7&page=1&post=${postId}}&parent=0&order=asc`);
    }
}

export default commentService;