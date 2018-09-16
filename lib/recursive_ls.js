'use strict';

var _path = require( 'path' );
var _fs   = require( 'fs' );

/**
 * Рекурсивный, асинхронный `fs.readdir()`.
 * @method module:my_utils.ls
 * @param  {string}            folder    Путь к папке.
 * @param  {number}            depth     Глубина рекурсивного поиска.
 * @param  {string[]}          [ignore]  Имена (не путь) папок которые надо игнорировать.
 * @return {Promise.<string[]>}          Promise с массивом всех найденых путей (абсолютных).
 * @example
 * var ls = require( 'my_utils/lib/recursive_ls' );
 *
 * ls( '.', 2, [ 'node_modules', '.git' ] ).then( ( paths ) =>
 * {
 *   console.log( paths ); // -> [ '/home/developer/package/index.js',
 *                         //      '/home/developer/package/package.json' ]
 * } );
 */
function ls ( folder, depth, ignore )
{
  if ( depth <= 0 ) {
    return Promise.resolve( [] );
  }

  return new Promise( function ( resolve, reject )
  {
    _fs.readdir( folder, function ( error, paths )
    {
      if ( error ) {
        return reject( error );
      }

      /**
       * @type {Array.<Promise.<string[]>>}
       */
      var promises = paths.map( function ( path )
      {
        var absolute = _path.resolve( folder, path );

        return new Promise( function ( resolve, reject )
        {
          _fs.lstat( absolute, function ( error, stats )
          {
            var paths;

            if ( error ) {
              return reject( error );
            }

            if ( stats.isDirectory() && ( ! ignore || ignore.indexOf( /[^\/]+$/.exec( absolute )[ 0 ] ) < 0 ) ) {
              paths = ls( absolute, depth - 1, ignore ).then( function ( /** @type {string[]} */ paths )
              {
                return paths.push( absolute ), paths;
              } );
            } else {
              paths = [ absolute ];
            }

            resolve( paths );
          } );
        } );
      } );

      var promise = Promise.all( promises ).then( function ( /** @type {Array.<string[]>} */ paths )
      {
        var flatten = [];
        var i, l;

        for ( i = 0, l = paths.length; i < l; ++i ) {
          flatten.push.apply( flatten, paths[ i ] );
        }

        return flatten;
      } );

      return resolve( promise );
    } );
  } );
}

module.exports = ls;
