'use strict';

import UserService from './../../services/user/user.service';

export default class ActivitiesService {

    static get $inject() {
        return ['$http', 'API_URL', 'UserService'];
    }

    constructor($http, API_URL, UserService) {
        this.UserService = UserService;
        this.$http = $http;
        this.API_URL = API_URL;
    }

    static get name() {
        return 'activitiesService';
    }

    setUrlParameters(trip_id) {
        this.resourceUrl = `${ this.API_URL }/user/trips/${ trip_id }/activities/`;
    }

    list() {

        let url = this.resourceUrl;
        return this.$http.get(url, {
            headers: {
                'Authorization': 'JWT ' + this.UserService.getToken()
            }
        }).then(response => {
            console.log("List in Activities Service: ")
            console.log(response.data);
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


    create(activities) {
        let url = this.resourceUrl;
        return this.$http.post(url, activities, {
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

    update(activity) {
        var id = activity._id;
        let url = `${ this.resourceUrl }${ id }`;
        console.log("URL: " + JSON.stringify(url));
        return this.$http.put(url, activity, {
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
