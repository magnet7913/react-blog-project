import ChangePassword from "../pages/ChangePassword";
import API from "./API";

const loginAndRegisterService = {
    getToken(userCredentials) {
        return API.call().post(`jwt-auth/v1/token`,userCredentials);
    },

    currentUser(token) {
        return API.callWithToken(token).get("wp/v2/users/me?token")
    },

    changePassword(token) {

    },

    newRegister(userCredentials) {
        return API.call().post(`wp/v2/users/register`,userCredentials);
    }
}

export default loginAndRegisterService;