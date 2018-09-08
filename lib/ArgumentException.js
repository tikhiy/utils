'use strict';

var toString = Object.prototype.toString;

/**
 * @method module:utils.ArgumentException
 * @param  {string}    method
 * @param  {string}    argument
 * @param  {any}       value
 * @return {TypeError}
 */
function ArgumentException ( method, argument, value )
{
  return TypeError( '`' + method + '` got unexpected `' + argument + '` argument (' + typeof value + ', ' + toString.call( value ) + ') with value: ' + value );
}

module.exports = ArgumentException;
