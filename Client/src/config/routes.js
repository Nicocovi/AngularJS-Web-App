'use strict';

import LandingpageComponent from './../components/view-landingpage/view-landingpage.component';

import TripOverviewComponent from './../components/view-trip-overview/view-trip-overview.component';
import TripEditComponent from './../components/view-trip-edit/view-trip-edit.component';
import TripCreateComponent from './../components/view-trip-create/view-trip-create.component';
import TripCommentingScreenComponent from './../components/view-trip-commenting-screen/view-trip-commenting-screen.component';
import LoginComponent from './../components/view-login/view-login.component';
import RegisterComponent from './../components/view-register/view-register.component';
import FinishOverviewComponent from './../components/view-finish-overview/view-finish-overview.component';
import AddActivitiesComponent from './../components/view-add-activities/view-add-activities.component';
import TripScheduleEditComponent from './../components/view-trip-schedule-edit/view-trip-scheduleEdit.component';


import TripsService from './../services/trips/trips.service';


resolveTrip.$inject = ['$stateParams', TripsService.name];

function resolveTrip($stateParams, tripsService) {
    return tripsService.get($stateParams.tripId);
}

resolveTrips.$inject = [TripsService.name];

function resolveTrips(tripsService) {
    return tripsService.list();
}


config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
export default function config($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('landingpage', {
            url: '/',
            component: LandingpageComponent.name
        })
        .state('tripAdd', {
            url: '/trips/new',
            component: TripCreateComponent.name
        })
        .state('tripoverview', {
            url: '/trips',
            component: TripOverviewComponent.name,
            resolve: {
                trip: resolveTrips
            }
        })
        .state('tripEdit', {
            url: '/trips/:tripId/edit',
            component: TripEditComponent.name,
            resolve: {
                trip: resolveTrip
            }
        })
        .state('tripCommentingScreen', {
            url: '/trips/:tripId/prioritize',
            component: TripCommentingScreenComponent.name,
            resolve: {
                trip: resolveTrip
            }
        })
        .state('login', {
            url: '/login',
            component: LoginComponent.name,
        })
        .state('addactivities', {
            url: '/trips/:tripId/addactivities',
            component: AddActivitiesComponent.name,
            resolve: {
                trip: resolveTrip
            }
        })
        .state('tripScheduleEdit', {
        url: '/trips/:tripId/schedule/edit',
        component: TripScheduleEditComponent.name,
            resolve: {
                trip: resolveTrip
            }
        })
        .state('register', {
            url: '/register',
            component: RegisterComponent.name,
        })
        .state('finish', {
            url: '/trips/:tripId/finish',
            component: FinishOverviewComponent.name,
            resolve: {
                trip: resolveTrip
            }
        });

    // if browser is capable, use pretty html5 linking without #, would be nice but also requires .htaccess rewrite
    //$locationProvider.html5Mode(true);

}
