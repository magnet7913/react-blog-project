import ChangeUserDetail from "../pages/AdminPage/ChangeUserDetail";
import API from "./API";

const loginAndRegisterService = {
    getToken(userCredentials) {
        return API.call().post(`jwt-auth/v1/token`,userCredentials);
    },

    currentUser(token) {
        return API.callWithToken(token).get("wp/v2/users/me?token")
    },

    changePassword(token,userCredentials) {
        return API.callWithToken(token).put("wp/v2/users/password",userCredentials)
    },

    newRegister(userCredentials) {
        return API.call().post(`wp/v2/users/register`,userCredentials);
    },

    changeUserDetail(token,userCredentials) {
        return API.callWithToken(token).put("wp/v2/users/me",userCredentials)
    },

}

export default loginAndRegisterService;