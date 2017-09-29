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

/**
 * Returns the display name of a React components.
 * @param {Object} WrappedComponent
 * @returns {String}
 */
var getDisplayName = exports.getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};