export const ERROR_FLASH = 'redux-flash-message/ERROR_FLASH';
export const SUCCESS_FLASH = 'redux-flash-message/SUCCESS_FLASH';
export const CLEAR_FLASH = 'redux-flash-message/CLEAR_FLASH';
export const SHOW_FLASH = 'redux-flash-message/SHOW_FLASH';

/**
 * Action to trigger a success/error flash message.
 *
 * @param {String} type
 * @param {String} message
 * @param {Boolean} isDelayed
 */
export const triggerFlashMessage = (type, message, isDelayed = false) => ({
  type,
  message,
  isDelayed
});

/**
 * Action to trigger a success/error delayed flash message.
 * Dispatch the showFlashMessage action to show a delayed flash message.
 * @param {String} type
 * @param {String} message
 */
export const triggerDelayedFlashMessage = (type, message) => triggerFlashMessage(type, message, true);

/**
 * Action to show a the flash message.
 */
export const showFlashMessage = () => ({
  type: SHOW_FLASH
});

/**
 * Action to clear the flash message.
 */
export const clearFlashMessage = () => ({
  type: CLEAR_FLASH
});
