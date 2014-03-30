var expect = require('chai').expect
var evalScheme = require('./scheme')();

describe('#eval()', function () {
  describe('CHALLENGE 1: BASICS', function () {
    it('should evaluate numbers', function () {
      expect(evalScheme('(1)')).to.equal(1);
    });

    it('should evaluate booleans: true', function () {
      expect(evalScheme('#t')).to.be.true;
    });

    it('should evaluate booleans: false', function () {
      expect(evalScheme('#f')).to.be.false;
    });
  });

  describe('CHALLENGE 2: BASIC MATH', function () {
    it('should evaluate addition', function () {
      expect(evalScheme('(+ 1 2)')).to.equal(3);
    });

    it('should evaluate multiplication', function () {
      expect(evalScheme('(* 4 13 2)')).to.equal(104);
    });

    it('should evaluate division', function () {
      expect(evalScheme('(/ 16 4 2)')).to.equal(2);
    });

    it('should evaluate subtraction', function () {
      expect(evalScheme('(- 25 8 4)')).to.equal(13);
    });
  });

  describe('CHALLENGE 3: NESTING', function () {
    it('evaluates nested arithmetic', function () {
      expect(evalScheme('(+ 1 (* 2 3))')).to.equal(7);
    });

    it('evaluates arbitrarily nested arithmetic', function () {
      expect(evalScheme('(+ 1 (* 2 (- 9 3)))')).to.equal(13);
      expect(evalScheme('(- 11 (* 3 (/ 12 3)))')).to.equal(-1);
      expect(evalScheme('(- 78 (* 5 (- 15 (/ 20 4))))')).to.equal(28);
    });
  });

  describe('CHALLENGE 4: CAR', function () {
    it('evaluates car of lats', function () {
      expect(evalScheme("(car '(7 4 2))")).to.equal(7);
    });

    it('evaluates arbitrarily nested cars', function () {
      expect(
        evalScheme("(car (car (car '(((45 9 18) 1 9492) (car (1 0 99))))))"))
        .to.equal(45);
      expect(evalScheme("(car (car '((8 5) (2 9))))")).to.equal(8);
    });

  });
});
