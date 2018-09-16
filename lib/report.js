'use strict';

var messages = {};

/**
 * Будет `console.warn` только один раз на `message` для `method`.
 * @method module:my_utils.report
 * @param  {string} method
 * @param  {string} message
 * @return {void}
 * @example
 * report( 'X(): void', 'something bad' ); // console.warn: '(once) `X(): void` something bad'
 * report( 'X(): void', 'something bad' ); // nothing
 */
function report ( method, message )
{
  if ( ! messages[ method ] ) {
    messages[ method ] = {};
  } else if ( messages[ method ][ message ] ) {
    return;
  }

  console.warn( '(once) `' + method + '` ' + message );
  messages[ method ][ message ] = true;
}

module.exports = report;
