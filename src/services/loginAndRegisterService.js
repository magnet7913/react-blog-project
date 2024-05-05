import API from "./API";

const loginAndRegisterService = {
    getToken(userCredentials) {
        return API.call().post(`jwt-auth/v1/token`,userCredentials);
    },

    newRegister(userCredentials) {
        return API.call().post(`wp/v2/users/register`,userCredentials);
    }
}

export default loginAndRegisterService;