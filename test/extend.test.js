'use strict';

var extend = require( '../lib/extend' );

describe( "require('my_utils/lib/extend')", function ()
{
  it( 'works', function ()
  {
    extend.should.be.a( 'function' );
  } );

  describe( 'example #1', function ()
  {
    it( 'works', function ()
    {
      var cat;

      function Animal ( name )
      {
        this.name = name;
      }

      Animal.prototype.eat = function eat ( food )
      {
        return this.name + ' eats ' + food;
      };

      var Cat = extend( Animal, {
        constructor: function Cat ( name )
        {
          this.__super__.call( this, name );
        },

        eat: function eat ( food )
        {
          if ( food !== 'a fish' ) {
            return this.name + ' cannot eat ' + food;
          }

          return this.__super__.prototype.eat.call( this, food );
        }
      } );

      cat = new Cat( 'kitty' );
      cat.should
        .instanceOf( Animal )
        .instanceOf( Cat )
        .be.like( { name: 'kitty' } );
      cat.eat( 'a fish' ).should.equal( 'kitty eats a fish' );
      cat.eat( 'a dog' ).should.equal( 'kitty cannot eat a dog' );
    } );
  } );

  describe( 'test case #1', function ()
  {
    it( 'works', function ()
    {
      var B;
      var b;

      function A ( name )
      {
        this._name = name;
      }

      B = extend( A, {
        constructor: function B ( name )
        {
          this.__super__.call( this, '"' + name + '"' );
        },

        name: function name ()
        {
          return this._name;
        }
      } );

      b = new B( 'John' );

      b.should
        .instanceOf( A )
        .instanceOf( B );

      b.name().should.equal( '"John"' );
    } );
  } );

  describe( 'test case #2', function ()
  {
    it( 'works', function ()
    {
      var B, C;

      function A () {}

      B = extend( A, {
        constructor: function B ()
        {
          this.__super__.should.equal( A );
        }
      } );

      C = extend( B, {
        constructor: function C ()
        {
          this.__super__.should.equal( B );
          this.__super__.prototype.__super__.should.equal( A );
        }
      } );

      // jshint -W031
        new C();
        new B();
        new C();
        new B();
      // jshint +W031
    } );
  } );

  describe( 'bad use', function ()
  {
    it( 'throws', function ( done )
    {
      try {
        extend();
      } catch ( error ) {
        done();
      }
    } );
  } );
} );
