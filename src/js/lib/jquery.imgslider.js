/**
 * Created by fdr08 on 2016/7/3.
 */
(function (root, factory) {
    var core = factory(root);
    if (typeof define === 'function' && define.amd) {
        // AMD
        // define([], factory);
        define('core', function () {
            return core;
        });
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = core;
    } else {
        // Browser globals
        root.core = core;
    }
})(this, function () {
    
});