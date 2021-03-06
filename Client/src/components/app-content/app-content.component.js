'use strict';

import template from './app-content.template.html';
import './app-content.style.css';

class AppContentComponent {
    constructor() {
        this.controller = AppContentComponentController;
        this.template = template;

    }

    static get name() {
        return 'appContent';
    }


}

class AppContentComponentController {

    constructor($state) {
        this.$state = $state;
    }

    static get $inject() {
        return ['$state'];
    }

}


export default AppContentComponent;
