var should = require('should');
var S = require('./scheme')();

describe('#schemeEval()', function () {

  describe('CHALLENGE 1: BASICS', function () {
    it('should evaluate numbers', function () {
      S.schemeEval('(1)').should.eql(1);
    });

    it('should evaluate booleans: true', function () {
      S.schemeEval('#t').should.be.true
    });

    it('should evaluate booleans: false', function () {
      S.schemeEval('#f').should.be.false
    });
  });

  describe('CHALLENGE 2: BASIC MATH', function () {
    it('should evaluate addition', function () {
      S.schemeEval('(+ 1 2)').should.eql(3);
    });

    it('should evaluate multiplication', function () {
      S.schemeEval('(* 4 13 2)').should.eql(104);
    });

    it('should evaluate division', function () {
      S.schemeEval('(/ 16 4)').should.eql(4);
    });

    it('should evaluate subtraction', function () {
      S.schemeEval('(- 25 8 4)').should.eql(13);
    });
  });

  describe('CHALLENGE 3: NESTING', function () {
    it('evaluates nested arithmetic', function () {
      S.schemeEval('(+ 1 (* 2 3))').should.eql(7);
    });

    it('evaluates arbitrarily nested arithmetic', function () {
      S.schemeEval('(+ 1 (* 2 (- 9 3)))').should.eql(13);
    });
  });
});
