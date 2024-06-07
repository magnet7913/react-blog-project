import API from "./API";

const commentService = {
    getComment(postId,page,parent,exclude) {
        return API.call().get(`wp/v2/comments?per_page=3&page=${page}&post=${postId}&parent=${parent}}&order=desc&exclude=${exclude}`);
    },

    postComment(token,payload) {
        return API.callWithToken(token).post("/wp/v2/comments",payload)
    }
}



export default commentService;