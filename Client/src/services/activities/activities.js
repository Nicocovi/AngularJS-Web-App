'use strict';

import angular from 'angular';

//import ActivitiesService from './activities.local.service';
import ActivitiesService from './activities.service';


export default angular.module('ActivitiesServiceDefinition', [])
    .service(ActivitiesService.name, ActivitiesService)
