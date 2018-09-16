'use strict';

var report = require( '../lib/report' );

describe( "require('my_utils/lib/report')", function ()
{
  it( 'works', function ()
  {
    report.should.be.a( 'function' );
  } );

  describe( 'report()', function ()
  {
    it( 'works', function ()
    {
      var warn  = console.warn;
      var count = 0;

      console.warn = function ( string ) {
        if ( count++ ) {
          throw Error( '`console.warn` called more than once' );
        }

        string.should.equal( '(once) `X(): void` something bad' );
      };

      report( 'X(): void', 'something bad' );
      report( 'X(): void', 'something bad' );

      console.warn = warn;
    } );
  } );
} );
