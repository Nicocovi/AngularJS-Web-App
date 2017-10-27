'use strict';

import UserService from './../../services/user/user.service';

export default class RatingsService {

    static get $inject() {
        return ['$http', 'API_URL', 'UserService'];
    }

    constructor($http, API_URL, UserService) {
        this.$http = $http;
        this.API_URL = API_URL;
        this.UserService = UserService;

    }

    setUrlParameters(trip_id, activity_id) {
        this.resourceUrl = `${ this.API_URL }/user/trips/${ trip_id }/activities/${ activity_id }/ratings/`;
    }

    static get name() {
        return 'ratingsService';
    }

    list() {

        let url = this.resourceUrl;
        return this.$http.get(url, {
            headers: {
                'Authorization': 'JWT ' + this.UserService.getToken()
            }
        }).then(response => {
            //console.log("List in Ratings Service: ")
            //console.log( response.data);
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        });

    }

    getMy() {
        let url = `${ this.resourceUrl }/my`;
        return this.$http.get(url, {
            headers: {
                'Authorization': 'JWT ' + this.UserService.getToken()
            }
        }).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
                reject(console.log("Rating not available"));
            });

        })
    }


    create(rating) {
        let url = this.resourceUrl;
        return this.$http.post(url, rating, {
            headers: {
                'Authorization': 'JWT ' + this.UserService.getToken()
            }
        }).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        });
    }

    deleteMy() {
        let url = `${ this.resourceUrl }/my`;
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

    updateMy(rating) {

        let url = `${ this.resourceUrl }/my`;
        return this.$http.put(url, rating, {
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
