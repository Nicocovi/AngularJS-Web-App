'use strict';

import UserService from './../../services/user/user.service';
import TripsService from './../../services/trips/trips.service';

import template from './app-header.template.html';
import './app-header.style.css';

class AppHeaderComponent {
    constructor() {
        this.controller = AppHeaderComponentController;
        this.template = template;
        this.bindings = {
            trip: '<',
        }

    }

    static get name() {
        return 'appHeader';
    }


}

class AppHeaderComponentController {
    constructor($state, UserService) {
        this.$state = $state;
        this.UserService = UserService;

        this.Subtitle = null;
        /*
        this.$scope = $scope;
        var model = this;
        this.$scope.$on('SUBTITLE', function (event, data) {
            model.Subtitle = data;
        });
        */
    }

    openMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }

    getCurrentUser() {
        let user = this.UserService.getCurrentUser();
        return user.email;
    }

    getSubtitle() {
        return this.Subtitle;
    }


    myTrips() {
        this.$state.go('tripoverview', {});
    }

    login() {
        this.$state.go('login', {});
    }

    //TODO
    //change state
    logout() {
        this.UserService.logout();
        this.$state.go('landingpage', {});
    }

    static get $inject() {
        return ['$state', UserService.name];
    }

}


export default AppHeaderComponent;
