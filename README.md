### Documentation

See documentation at https://silent-tempest.github.io/utils/.

### `require( 'my_utils/lib/extend' )`

#### Example #1

```javascript
var extend = require( 'my_utils/lib/extend' );
var cat;

/**
 * Родительский класс Animal.
 * @constructor Animal
 * @param {string} name
 */
function Animal ( name )
{
  this.name = name;
}

/**
 * @method Animal#eat
 * @param  {string} food
 * @return {string}
 * @example
 * new Animal( 'the dog' ).eat( 'a bone' ); // -> 'the dog eats a bone'
 */
Animal.prototype.eat = function eat ( food )
{
  return this.name + ' eats ' + food;
};

var Cat = extend( Animal, {
  /**
   * Дочерний класс Cat.
   * @constructor Cat
   * @extends Animal
   * @param {string} name
   */
  constructor: function Cat ( name )
  {
    this.__super__.call( this, name );
  },

  /**
   * @method Cat#eat
   * @override
   * @param  {string} food Кот может кушать только рыбу ('a fish').
   * @return {string}
   */
  eat: function eat ( food )
  {
    if ( food !== 'a fish' ) {
      return this.name + ' cannot eat ' + food;
    }

    return this.__super__.prototype.eat.call( this, food );
  }
} );

cat = new Cat( 'kitty' ); // Cat { name: 'kitty' }
cat.eat( 'a fish' ); // -> 'kitty eats a fish'
cat.eat( 'a dog' );  // -> 'kitty cannot eat a dog'
```
