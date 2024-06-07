import API from "./API"

const mediaService = {
    uploadImage(payload) {
        return API.callWithToken().post("/wp/v2/media",payload)
    }
}

export default mediaService