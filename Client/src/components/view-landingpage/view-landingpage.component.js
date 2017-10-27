'use strict';

import UserService from './../../services/user/user.service';

import template from './view-landingpage.template.html';
import './view-landingpage.style.css';


class ViewLandingpageComponent {

    constructor() {
        this.controller = ViewLandingpageComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewLandingpage';
    }
}

class ViewLandingpageComponentController {

    constructor($state, $scope, $timeout, $window, UserService) {
        var me = this;

        me.$state = $state;
        me.$scope = $scope;
        me.$timeout = $timeout;
        me.$window = $window;
        me.UserService = UserService;

        me.$scope.slides = [
            {
                image: '../../images/landingpage_home.jpg',
                description: 'Image 01'
            },
            {
                image: '../../images/landingpage_laptop.jpg',
                description: 'Image 02'
            },
            {
                image: '../../images/landingpage_road.jpg',
                description: 'Image 03'
            },
            {
                image: '../../images/landingpage_city.jpg',
                description: 'Image 04'
            },
            {
                image: '../../images/landingpage_marker.jpg',
                description: 'Image 05'
            }
        ];

        me.$scope.currentIndex = 0;
        me.doAnimation = false; // no animation on first load
        me.autoNext(7000);

        var header = document.getElementById("my-header-toolbar");
        if (header) {
            header.classList.remove('my-solidheader');
        }

    }

    setCurrentSlideIndex(index) {
        this.animationType = 0;
        this.$scope.currentIndex = index;
        this.autoNext(10000);
    }

    isCurrentSlideIndex(index) {
        return this.$scope.currentIndex === index;
    }

    autoNext(waitTime) {
        var me = this;
        me.$timeout.cancel(me.timer);
        me.timer = me.$timeout(function () {
            me.nextSlide();
        }, waitTime);
    }

    nextSlide() {
        this.doAnimation = true;
        this.animationType = 1;
        this.$scope.currentIndex = (this.$scope.currentIndex < this.$scope.slides.length - 1) ? ++this.$scope.currentIndex : 0;
        this.autoNext(7000);
    }

    prevSlide() {
        this.doAnimation = true;
        this.animationType = 2;
        this.$scope.currentIndex = (this.$scope.currentIndex > 0) ? --this.$scope.currentIndex : this.$scope.slides.length - 1;
        this.autoNext(12000);
    }

    gotoCreateTrip() {
        this.$state.go('tripAdd', {});
    }

    gotoSignUp() {
        this.$state.go('register', {});
    }

    gotoLogin() {
        this.$state.go('login', {});
    }

    gotoMyTrips() {
        this.$state.go('tripoverview', {});
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }


    static get $inject() {
        return ['$state', '$scope', '$timeout', '$window', UserService.name];
    }

}

export default ViewLandingpageComponent;
