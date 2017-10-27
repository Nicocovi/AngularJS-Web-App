'use strict';


export default class UserService {

    static get $inject() {
        return ['$http', '$window', 'API_URL', '$state'];
    }

    constructor($http, $window, API_URL, $state) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
        this.$state = $state;
    }

    static get name() {
        return 'UserService';
    }

    register(email, pass) {
        return this.$http.post(`${ this.API_URL }/user/signup`, {
            email: email,
            password: pass
        }).then(response => {
            this.$window.localStorage.setItem('jwtToken', response.data.token);

        })
    }

    login(email, pass) {
        return this.$http.post(`${ this.API_URL }/user/login`, {
            email: email,
            password: pass
        }).then(response => {
            this.$window.localStorage.setItem('jwtToken', response.data.token);

        })
    }

    logout() {
        this.$window.localStorage.removeItem('jwtToken');
        this.$state.go('landingpage', {});
    }

    getCurrentUser() {
        let token = this.$window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(this.$window.atob(base64)).user;
    }

    isAuthenticated() {
        return !!this.$window.localStorage['jwtToken'];
    }

    getToken() {
        return this.$window.localStorage['jwtToken'];
    }


}
