'use strict';

// '`%s` got unexpected `%s` argument (%s, %s) with value: %s'

var toString = Object.prototype.toString;

/**
 * @method module:my_utils.ArgumentException
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
