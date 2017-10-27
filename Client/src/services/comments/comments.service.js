'use strict';

import UserService from './../../services/user/user.service';

export default class CommentsService {

    static get $inject() {
        return ['$http', 'API_URL', 'UserService'];
    }

    constructor($http, API_URL, UserService) {
        this.$http = $http;
        this.API_URL = API_URL;
        this.UserService = UserService;

    }

    setUrlParameters(trip_id, activity_id) {
        this.resourceUrl = `${ this.API_URL }/user/trips/${ trip_id }/activities/${ activity_id }/comments/`;
    }

    static get name() {
        return 'commentsService';
    }

    list() {

        let url = this.resourceUrl;
        return this.$http.get(url, {
            headers: {
                'Authorization': 'JWT ' + this.UserService.getToken()
            }
        }).then(response => {
            //console.log("List in Comments Service: " + response.data);
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

    update(rating) {

        let url = `${ this.resourceUrl }${ rating['_id'] }`;
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
