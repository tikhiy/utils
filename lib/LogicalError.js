'use strict';

/**
 * @method module:utils.LogicalError
 * @param  {string} method
 * @param  {string} message
 * @return {Error}
 */
function LogicalError ( method, message )
{
  return Error( '`' + method + '` ' + message );
}

module.exports = LogicalError;
