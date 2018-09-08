/* global describe, it */

'use strict';

var tests = require( './tests.internal' );

describe( "require('utils')", function () {
  it( 'works', function () {
    require( '..' ).should.be.an( 'object' );
  } );
} );

[ 'report', 'ArgumentException', 'LogicalError', 'NetworkError' ].forEach( function ( name ) {
  describe( "require('utils/lib/" + name + "')" + "\n  " + "require('utils')." + name, function () {
    it( 'works', function () {
      tests[ name ]( require( '..' )[ name ] );
      tests[ name ]( require( '../lib/' + name ) );
    } );
  } );
} );
