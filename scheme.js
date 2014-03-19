module.exports = function () {
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
      return token !== '';
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

      // truthy/numbery base cases
      if (stack.length === 1) {
        var result = stack[0];
        switch (typeof result) {
          case 'string':
            if (result === '#t') {
              return true;
            } else if (result === '#f') {
              return false;
            } else {
              return result;
            }
            break;
          case 'number':
            return result;
            break;
          default:
            return result;
            break;
        }
      }

      // current element
      var current = stack.shift();

      if (Array.isArray(current)) {
        // recurse
        return rec(current);

        // MATH
      } else if (current === '+') {
        var result = mathEval(addRed);

        if (stack.length === 0) {
          return result;
        }

        return result + rec(stack.shift());

      } else if (current === '-') {
        var result = mathEval(subRed);
        if (stack.length === 0) {
          return result;
        }

        return result - rec(stack.shift());

      } else if (current === '*') {
        var result = mathEval(multRed);
        if (stack.length === 0) {
          return result;
        }

        return result * rec(stack.shift());

      } else if (current === '/') {
        var result = mathEval(divRed);

        if (stack.length === 0) {
          return result;
        }

        return result / rec(stack.shift());

      } else if (typeof current === 'number') {
        return rec(stack);
        return current;
      }

      // create math substack, eval what can be eval'd
      function mathEval (opFn) {
        var mathStack = [];
        while (!Array.isArray(stack[0]) && stack.length > 0) {
          mathStack.push(stack.shift());
        }

        return mathStack.reduce(opFn);
      }

      // mathematical operator callbacks for reduce
      function addRed (a, b) { return a + b; }
      function subRed (a, b) { return a - b; }
      function multRed (a, b) { return a * b; }
      function divRed (a, b) { return a / b; }
    })(stack);
  }
}
