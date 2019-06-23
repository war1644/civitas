'use strict';

/**
 * Find index by handle into an array.
 *
 * @function findIndexM
 * @param {String} value
 * @returns {Object|Boolean}
 */
Array.prototype.findIndexM = function (value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].handle === value) {
            return i;
        }
    }
    return false;
};

/**
 * Capitalize first letter of a string.
 *
 * @function capitalize
 * @returns {String}
 */
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
