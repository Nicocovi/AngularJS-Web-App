'use strict';

import UserService from './../../services/user/user.service';

import template from './view-login.template.html';
import './view-login.style.css';

class ViewLoginComponent {
    constructor() {
        this.controller = ViewLoginComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewLogin';
    }


}

class ViewLoginComponentController {
    constructor($state, UserService) {
        this.$state = $state;
        this.UserService = UserService;

        if (this.isAuthenticated()) {
            this.$state.go('tripoverview');
        }
    }

    $onInit() {
        this.login = {};
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }

    submit() {
        let email = this.login.email;
        let password = this.login.password;

        console.log("submitted login form");

        //TODO
        //if invalid credentials: Show error
        this.UserService.login(email, password).then(() => {
            this.$state.go('tripoverview', {});
        });
    }

    register() {
        this.$state.go('register', {});
    }

    static get $inject() {
        return ['$state', UserService.name];
    }

}


export default ViewLoginComponent;
