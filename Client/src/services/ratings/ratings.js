'use strict';

import angular from 'angular';

import RatingsService from './ratings.service';


export default angular.module('RatingsServiceDefinition', [])
    .service(RatingsService.name, RatingsService)
