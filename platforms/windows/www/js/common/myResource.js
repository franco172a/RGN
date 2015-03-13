﻿(function () {
    'use strict';

    angular.module('common').factory('myResource', ['$resource', myResource]);

    function myResource($resource) {
        var onlineSource = 'http://devtest.hdsoftware.net/apidev/api/';
        var localSource = 'http://localhost/WebApiPropInspections/api/';
        var pupiloSource = 'http://192.168.0.92/WebApiPropInspections/api/';
        var frankSource = 'http://192.168.0.29/WebApiPropInspections/api/';

        var laptopSource = 'http://Laptop20140506/WebApiPropInspections/api/';

        var urlstorageSource;

        if (urlstorageSource == null) {
            urlstorageSource = localStorage.getItem('urlstorageSource');
        }

        var Token = localStorage.getItem('token');

        var currentSource = urlstorageSource;

        var service = {

            loginResource: $resource(currentSource + 'Login', {}, { login: { method: 'POST'} }),
            propertyList: $resource(currentSource + 'Property', {}, { getProperties: { method: 'GET', headers: { deviceHeaderStorage: Token}}} ),
            propertyInspection: $resource(currentSource + 'PropertyInspections', {}, { getProperties: { method: 'GET', headers: { deviceHeaderStorage: Token}} }),
            newpropertyreview: $resource(currentSource + 'NewPropertyReview', {}, { addPropReview: { method: 'POST' }, getNewPropReview: { method: 'GET', headers: { deviceHeaderStorage: Token}} }),
            mobilepropinspections: $resource(currentSource + 'Mobilepropinspections', {}, { update: { method: 'POST' }, getById: { method: 'GET', headers: { deviceHeaderStorage: Token}}, deletePropInspec: { method: 'POST'} }),
            uploads: $resource(currentSource + 'upload', {}, { upload: { method: 'POST' }, getImages: { method: 'GET', headers: { deviceHeaderStorage: Token}}, deleteImage: { method: 'POST'} }),
            propertyreviewuploads: $resource(currentSource + 'PropertyReviewUpload', {}, { upload: { method: 'POST' }, getImage: { method: 'GET', headers: { deviceHeaderStorage: Token}} }),
            unitreviewuploads: $resource(currentSource + 'UnitReviewUpload', {}, { upload: { method: 'POST' }, getImage: { method: 'GET', headers: { deviceHeaderStorage: Token}} }),
            propertyreviewuploadsURL: currentSource + 'PropertyReviewUpload',
            unitreviewuploadsURL: currentSource + 'UnitReviewUpload',
            editpropinspectionsURL: currentSource + 'Mobilepropinspections',
            getUrl: getUrl
        };

        function getUrl() {
            var urlstorageSource = localStorage.getItem('urlstorageSource');
            var myUrl = {
                loginResource: $resource(urlstorageSource + 'Login', {}, { login: { method: 'POST' }, getConnection: { method: 'GET'} })
            }
            return myUrl;
        }

        return service;

    }

})();

