'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import rzslider from 'angularjs-slider';
import './components/view-trip-create/rzslider.css';
import './components/view-trip-create/view-trip-create.style.css';

import ngMdIcons from 'angular-material-icons';
import angularMaterialExpansionPanel from 'angular-material-expansion-panel';
import '../node_modules/angular-material-expansion-panel/dist/md-expansion-panel.min.css';

import UserService from './services/user/user';

import AppContent from './components/app-content/app-content';
import ViewLandingpage from './components/view-landingpage/view-landingpage';

import Theme from './config/theme';
import Routes from './config/routes';
import Middlewares from './config/middlewares';

import Resizeable from './directives/resizeable';
import ScrollBottom from './directives/scroll-bottom';
import ChangeHeaderClassOnScroll from './directives/change-header-class-on-scroll';
import angularDragAndDropLists from 'angular-drag-and-drop-lists';

let app = angular.module('app', [
    uiRouter,
    angularMaterial,
    'dndLists',
    ngMdIcons,
    'material.components.expansionPanels',
    UserService.name,
    AppContent.name,
	ViewLandingpage.name,
    rzslider
]);


app.constant('API_URL', 'http://localhost:3000/api'); // local backend server
app.config(Theme);
app.config(Routes);
app.config(Middlewares);

app.directive('resizeable', Resizeable);
app.directive('scrollBottom', ScrollBottom);
app.directive('changeHeaderClassOnScroll', ChangeHeaderClassOnScroll);

angular.element(document).ready(function () {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;
