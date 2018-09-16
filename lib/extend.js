'use strict';

var ArgumentException = require( '../lib/ArgumentException' );
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Создает дочерний класс наследованный от `__super__` и расширенным `__proto__`.
 * @method module:my_utils.extend
 * @param  {function} __super__             Дочерний класс (функция). Не может быть ES2015 классом,
 *                                          стрелочной функцией, или генератором! Только обычная
 *                                          функция: `function __super__ () {}`.
 * @param  {object}   __proto__             Объект который содержит конструктор дочернего класса и
 *                                          свойства/методы которые надо добавить в прототип нового
 *                                          класса.
 * @param  {function} __proto__.constructor Коструктор не может быть объявлен как ES2015 функция, то
 *                                          есть так: `constructor () {}`. Используйте такой
 *                                          синтаксис: `constructor: function ChildClass () ()`.
 * @return {function}
 * @example
 * // See example in ./README.md or ./test/extend.test.js
 */
function extend ( __super__, __proto__ )
{
  var keys, i, l;

  if ( typeof __super__ !== 'function' ) {
    throw ArgumentException( 'extend(__super__: function, __proto__: object): function', '__super__', __super__ );
  }

  if ( ( typeof __proto__ !== 'object' || __proto__ === null ) && typeof __proto__ !== 'function' ) {
    throw ArgumentException( 'extend(__super__: function, __proto__: object): function', '__proto__', __proto__ );
  }

  if ( ! hasOwnProperty.call( __proto__, 'constructor' ) ) {
    throw Error( '`extend(__super__: function, __proto__: object): function` cannot find `constructor` function in `__proto__`' );
  }

  if ( typeof __proto__.constructor !== 'function' ) {
    throw Error( '`extend(__super__: function, __proto__: object): function` `__proto__.constructor` is not a function' );
  }

  if ( typeof __super__.prototype !== 'object' ) {
    throw Error( '`extend(__super__: function, __proto__: object): function` `__super__.prototype` must be an object or null' );
  }

  __proto__.constructor.prototype = Object.create( __super__.prototype );
  __proto__.constructor.prototype.__super__ = __super__;

  for ( keys = Object.keys( __proto__ ), i = 0, l = keys.length; i < l; ++i ) {
    __proto__.constructor.prototype[ keys[ i ] ] = __proto__[ keys[ i ] ];
  }

  return __proto__.constructor;
}

module.exports = extend;
