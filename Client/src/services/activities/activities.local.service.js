'use strict';

import AcivitiesAPISimulator from './activities.api.simulator';


export default class ActivitiesLocalService {

    constructor() {

    }

    static get name() {
        return 'activitiesService';
    }


    list() {
        return ActivitiesAPISimulator.getActivitiesAsync().then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        })
    }


    get(id) {
        return ActivitiesAPISimulator.getActivityByIdAsync(id).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        })

    }

    create(trip) {
        return TripsAPISimulator.createActivity(trip).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        });

    }

    delete(id) {
        return TripsAPISimulator.deleteActivity(id).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.status);
            });

        });

    }

    update(trip) {
        return TripsAPISimulator.updateActivity(trip).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        });
    }

}
