'use strict';

var NetworkError = require( '../lib/NetworkError' );

describe( "require('my_utils/lib/NetworkError')", function ()
{
  it( 'works', function ()
  {
    NetworkError.should.be.a( 'function' );
  } );

  describe( 'NetworkError()', function ()
  {
    it( 'works', function ()
    {
      new NetworkError( 404 ).should
        .instanceOf( Error )
        .be.like( { statusCode: 404, message: 'Not Found' } );
    } );
  } );

  describe( 'NetworkError.from()', function ()
  {
    it( 'works', function ()
    {
      var original = Error( 'Something Bad' );

      NetworkError.from( original ).should
        .instanceOf( Error )
        .be.like( { statusCode: 400, message: 'Something Bad' } )
        .have.property( 'original', original );
    } );
  } );
} );
