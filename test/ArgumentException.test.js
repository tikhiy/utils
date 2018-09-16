'use strict';

var ArgumentException = require( '../lib/ArgumentException' );

describe( "require('my_utils/lib/ArgumentException')", function ()
{
  it( 'works', function ()
  {
    ArgumentException.should.be.a( 'function' );
  } );

  describe( 'ArgumentException()', function ()
  {
    it( 'works', function ()
    {
      var exception = ArgumentException( 'X(Y: number): void', 'Y', 'Z' );
      exception.should
        .instanceOf( TypeError );
      exception.message.should
        .equal( '`X(Y: number): void` got unexpected `Y` argument (string, [object String]) with value: Z' );
    } );
  } );
} );
