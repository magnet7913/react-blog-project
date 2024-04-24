import API from "./API";

const headerMenuService = {
    getAll() {
        return API.call().get('/menus/v1/menus/main-menu-vi');
    }
}

export default headerMenuService;