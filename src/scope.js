'use strict';

var _ = require('lodash');

function Scope() {
    this.$$watchers = [];

    // set up a $watch function that binds a watchFn and listenerFn to the array of items in the scope
    Scope.prototype.$watch = function (watchFn, listenerFn) {
        var watcher = {
            watchFn: watchFn,
            listenerFn: listenerFn
        };
        this.$$watchers.push(watcher);
    };

    // set up a $digest function that calls every items listenerFn
    Scope.prototype.$digest = function() {
        var self = this;
        _.forEach(this.$$watchers, function(watcher) {
            watcher.watchFn(self);
            watcher.listenerFn();
        });
    };
}

module.exports = Scope;