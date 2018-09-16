'use strict';

var ls = require( '../lib/recursive_ls' );

describe( "require('my_utils/lib/recursive_ls')", function ()
{
  it( 'works', function ()
  {
    ls.should.be.a( 'function' );
  } );

  describe( 'ls()', function ()
  {
    it( 'works', function ()
    {
      return ls( '.', 0 )
        .then( function ( paths )
        {
          paths.should.be.deep.equal( [] );
        } );
    } );
  } );
} );
