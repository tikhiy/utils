'use strict';

var STATUS_CODES = require( 'http' ).STATUS_CODES;

/**
 * @constructor module:my_utils.NetworkError
 * @param {number} statusCode
 * @param {string} [message]
 * @param {Error}  [original]
 */
function NetworkError ( statusCode, message, original )
{
  if ( ! message ) {
    message = original && original.message || STATUS_CODES[ statusCode ];
  }

  Error.call( this, message );

  this.message    = message;
  this.statusCode = statusCode;

  if ( original ) {
    this.original = original;
  }
}

NetworkError.prototype = Object.create( Error.prototype );
NetworkError.prototype.constructor = NetworkError;

/**
 * @method module:my_utils.NetworkError.from
 * @param  {Error}        original
 * @return {NetworkError}
 */
NetworkError.from = function from ( original )
{
  return new NetworkError( 400, null, original );
};

module.exports = NetworkError;
