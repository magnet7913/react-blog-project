import API from "./API";

const commentService = {
    getComment(postId,page,parent) {
        return API.call().get(`wp/v2/comments?per_page=3&page=${page}&post=${postId}}&parent=${parent}&order=asc`);
    }
}

export default commentService;