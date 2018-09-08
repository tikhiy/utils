'use strict';

var tests = {
  report: function report ( report ) {
    report.should.be.a( 'function' );

    var warn  = console.warn;
    var count = 0;

    console.warn = function ( string ) {
      if ( count++ ) {
        throw Error( 'warn called more than once' );
      }

      string.should.equal( '`method` message' );
    };

    report( 'method', 'message' );
    report( 'method', 'message' );

    console.warn = warn;
  },

  ArgumentException: function ArgumentException ( ArgumentException ) {
    ArgumentException( 'method', 'argument', 'value' ).should
      .instanceof( TypeError )
      .property( 'message', '`method` got unexpected `argument` argument (string, [object String]) with value: value' );
  },

  LogicalError: function LogicalError ( LogicalError ) {
    LogicalError( 'method', 'message' ).should
      .instanceof( Error )
      .property( 'message', '`method` message' );
  },

  NetworkError: function NetworkError () {}
};

module.exports = tests;
