'use strict';

var _ = require('lodash');

function Scope() {
    this.$$watchers = [];   // $$ makes the property private to angular

    // set up a $watch function that binds a watchFn and listenerFn to the array of items in the scope
    Scope.prototype.$watch = function (watchFn, listenerFn) {
        var watcher = {
            watchFn: watchFn,
            listenerFn: listenerFn || function() {},
            last: initWatchVal  // set an undefined function to the initial 'last' value. this is then reset by the
                                // $digest function to either equal the old or new value appropriately
        };
        this.$$watchers.push(watcher);
    };

    // set up a $digest function that calls every items listenerFn
    Scope.prototype.$digest = function() {
        var self = this;
        var newValue, oldValue;
        _.forEach(this.$$watchers, function (watcher) {
            newValue = watcher.watchFn(self);
            oldValue = watcher.last;
            if (newValue !== oldValue) {
                watcher.last = newValue;

                watcher.listenerFn(newValue, (oldValue === initWatchVal ? newValue : oldValue), self);  // the ternary
                        // operator resets watch.last IFF if the first time digest() has been called
            }
        });
    };
}

function initWatchVal() { }

module.exports = Scope;