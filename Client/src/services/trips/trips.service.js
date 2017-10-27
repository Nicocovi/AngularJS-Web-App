'use strict';

import UserService from './../../services/user/user.service';

export default class TripsService {

    static get $inject() {
        return ['$http', 'API_URL', 'UserService'];
    }

    constructor($http, API_URL, UserService) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/user/trips/`;
        this.UserService = UserService;
    }

    static get name() {
        return 'tripsService';
    }

    list() {

        let url = this.resourceUrl;
        return this.$http.get(url, {
            headers: {
                'Authorization': 'JWT ' + this.UserService.getToken()
            }
        }).then(response => {
            console.log("List in Trips Service: " + response.data);
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        });

    }

    get(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.get(url, {
            headers: {
                'Authorization': 'JWT ' + this.UserService.getToken()
            }
        }).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        })
    }


    create(trip) {
        let url = this.resourceUrl;
        return this.$http.post(url, trip, {
            headers: {
                'Authorization': 'JWT ' + this.UserService.getToken()
            }
        }).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        });
    }

    delete(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.delete(url, {
            headers: {
                'Authorization': 'JWT ' + this.UserService.getToken()
            }
        }).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.status);
            });

        });
    };

    update(trip) {

        let url = `${ this.resourceUrl }${ trip['_id'] }`;
        return this.$http.put(url, trip, {
            headers: {
                'Authorization': 'JWT ' + this.UserService.getToken()
            }
        }).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        });
    };
}
