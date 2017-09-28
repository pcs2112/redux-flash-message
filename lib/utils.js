'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Checks the specified value is empty.
 *
 * @param {String|undefined|null} value
 * @returns {Boolean}
 */
var isEmpty = exports.isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};