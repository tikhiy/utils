'use strict';

var messages = {};

/**
 * @method module:utils.report
 * @param  {string} method
 * @param  {string} message
 * @return {void}
 */
function report ( method, message )
{
  if ( ! messages[ method ] ) {
    messages[ method ] = {};
  } else if ( messages[ method ][ message ] ) {
    return;
  }

  console.warn( '`' + method + '` ' + message );
  messages[ method ][ message ] = true;
}

module.exports = report;
