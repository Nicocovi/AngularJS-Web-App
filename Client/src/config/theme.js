'use strict';


config.$inject = ['$mdThemingProvider'];
export default function config($mdThemingProvider) {

    $mdThemingProvider.definePalette('myPrimaryColorPalette', {
        '50': 'e3e6e9',
        '100': 'b9c1c9',
        '200': '8b98a5',
        '300': '5d6e81',
        '400': '3a4f66',
        '500': '17304b',
        '600': '142b44',
        '700': '11243b',
        '800': '0d1e33',
        '900': '071323',
        'A100': '6198ff',
        'A200': '2e77ff',
        'A400': '0057fa',
        'A700': '004fe0',
        'contrastDefaultColor': 'light', // whether, by default, text (contrast) on this palette should be dark or light

        'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'], //hues which contrast should be 'dark' by default
        'contrastLightColors': undefined // could also specify this if default was 'dark'
    });

    $mdThemingProvider.definePalette('myAccentColorPalette', {
        '50': 'e3f9f1',
        '100': 'b9efdd',
        '200': '8ae4c6',
        '300': '5bd9af',
        '400': '37d19d',
        '500': '14c98c',
        '600': '12c384',
        '700': '0ebc79',
        '800': '0bb56f',
        '900': '06a95c',
        'A100': '5bd9af',
        'A200': '37d19d',
        'A400': '14c98c',
        'A700': '12c384',
        'contrastDefaultColor': 'dark', // whether, by default, text (contrast) on this palette should be dark or light

        'contrastDarkColors': undefined, // could also specify this if default was 'light'
        'contrastLightColors': ['500', '600', '700', '800', '900', 'A200', 'A400', 'A700'] //hues which contrast should be 'light' by default
    });

    /* overwrite default theme with custom color palette definition */
    /* theme generation here: http://mcg.mbitson.com/#!?myprimarycolorpalette=%23142b44&myaccentcolorpalette=%2314c98c&themename=default#%2F */
    $mdThemingProvider.theme('default')
        .primaryPalette('myPrimaryColorPalette')
        .accentPalette('myAccentColorPalette');
}
