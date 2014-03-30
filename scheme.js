module.exports = function () {
  // load in that math eval piece.
  // We will bind it for context later
  var mathEval = require('./matheval');

  if (!Array.prototype.flatten) {
    Array.prototype.flatten = function () {
      var result = [];
      return result.concat.apply(result, this);
    }
  }

  // split off parens
  if (!Array.prototype.splitParens) {
   Array.prototype.splitParens = function (re) {
      return this.map(function (el) {
        return el.split(re);
      }).flatten();
    }
  }

  function tokenize (exp) {
    var tokens = exp.split(' ');
    var leftParen = /(\()/;
    var rightParen = /(\))/;

    // split parens
    tokens = tokens.splitParens(leftParen).splitParens(rightParen);

    // remove spaces
    tokens = tokens.filter(function (token) {
      return (token !== ''
           && token !== "\'"
           && token !== "\\");
    });

    return tokens;
  }

  function parse (tokens) {
    var token = tokens.shift();

    if (token === '(') {
      var list = [];
      while (tokens[0] !== ')') {
        list.push(parse(tokens));
      }

      return list;
    } else if (token === ')') {
      throw "parenError";
    } else {
      return atom(token);
    }
  }

  function atom (token) {
    if (Number(token) == token) {
      return Number(token);
    }

    return token;
  }

  // MAIN
  return function eval(exp) {
    var stack = parse(tokenize(exp));

    if (typeof stack === 'string') {
      stack = Array(stack);
    }

    // eval loop
    return (function rec (stack) {
      // created a mathEval instance that has a bound default
      // argument of the function 'rec', so as to have context when mathEval
      // needs to recur.
      var boundMathEval = mathEval.bind(undefined, rec);

      // truthy/numbery base cases
      if (stack.length === 1) {
        var result = stack[0];

        switch (typeof result) {
          case 'string':
            if (result === '#t') {
              return true;
            } else if (result === '#f') {
              return false;
            }

            break;
          case 'number':
            return result;
            break;
          default:
            return rec(result);
            break;
        }
      }

      // current element
      var current = stack.shift();

      if (Array.isArray(current)) {
        // recurse
        return rec(current);

      } else if (current === '+'
              || current === '-'
              || current === '/'
              || current === '*') {
          return boundMathEval(current, stack);

      } else if (current === 'car') {
        stack = stack[0];
        return rec(stack);

      } else if (typeof current === 'number') {
        return current;
      }
    })(stack);
  }
}
