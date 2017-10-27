'use strict';

import TripsAPISimulator from './trips.api.simulator';


export default class TripsLocalService {

    constructor() {

    }

    static get name(){
        return 'tripsService';
    }


    list(){
       return TripsAPISimulator.getTripsAsync().then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        })
    }


    get(id){
        return TripsAPISimulator.getTripByIdAsync(id).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        })

    }

    create(trip){
        return TripsAPISimulator.createTrips(trip).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        });

    }

    delete(id){
        return TripsAPISimulator.deleteTrip(id).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.status);
            });

        });

    }

    update(trip){
        return TripsAPISimulator.updateTrip(trip).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        });
    }

}