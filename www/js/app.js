// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//var AV = require('avoscloud-sdk');
angular.module('starter', ['ionic','ngResource','ngCordova', 'starter.services','starter.controllers', 'starter.directives'])

    .run(function($ionicPlatform) {
    AV.initialize('p9y5fh0mjtunp9hf77excmgc046kmwvx70rqplh5gmrw7gr4', 'djf0wfrsvdv2z2lxqbvpwrlivml83281q8b4gkj8w9z226rp');
        $ionicPlatform.ready(function() {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.shouye', {
                url: '/shouye',
                views: {
                    'tab-shouye': {
                        templateUrl: 'templates/tab-shouye.html',
                        controller: 'ShouyeCtrl'
                    }
                }
            })
            .state('tab.news-detail', {
                url: '/shouye/news/:newId',
                views: {
                    'tab-shouye': {
                        templateUrl: 'templates/news-detail.html',
                        controller: 'NewDetailCtrl'
                    }
                }
            })
            .state('tab.zhuanqu', {
                url: '/zhuanqu',
                views: {
                    'tab-zhuanqu': {
                        templateUrl: 'templates/tab-zhuanqu.html',
                        controller: 'ZhuanquCtrl'
                    }
                }
            })
            .state('tab.fenlei-detail', {
                url: '/zhuanqu/fenlei',
                views: {
                    'tab-zhuanqu': {
                        templateUrl: 'templates/zhuanqu-fenlei-detail.html',
                        controller: 'FenLeiDetailCtrl'
                    }
                }
            })
            .state('tab.aucPro-detail', {
                url: '/aucPro/:aucId',
                views: {
                    'tab-zhuanqu': {
                        templateUrl: 'templates/aucProDetail.html',
                        controller: 'aucProDetailCtrl'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-mySpace.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.uploadPro', {
                url: '/uploadPro',
                views: {
                    'tab-uploadPro': {
                        templateUrl: 'templates/tab-upLoadPro.html',
                        controller: 'UploadProCtrl'
                    }
                }
            })
        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/shouye');

    });


//angular.module('starter.controllers', ['starter.services']);
//
//angular.module('starter.services', ['ngResource']);
//
//angular.module('starter.filters', ['starter.services']);
//
//angular.module('starter.directives', []);
