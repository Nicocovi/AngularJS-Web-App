'use strict';

import angular from 'angular';

import CommentsService from './comments.service';


export default angular.module('CommentsServiceDefinition', [])
    .service(CommentsService.name, CommentsService)
