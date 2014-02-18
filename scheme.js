module.exports = function () {
  return {
    schemeEval: function (exp) {


      return loop_run(exp, []);

      function loop_run(exp, stack) {
        // console.log(exp, stack);
        // REMOVE OUTER PARENS

        // RETURN A SINGLE NUMBER, LIKE (3341)
        if (Number(exp)) {
          return Number(exp);
        }

        // RETURN A BOOLEAN
        switch (exp) {
          case '#t':
            return true;
            break;
          case '#f':
            return false;
            break;
        }

        // try to get the innermost list
        try {
          var innerMostRe = /^\(.*(\(.*\))\)$/,
            innerMostExp = exp.match(innerMostRe)[1],
            nextExp = prep(innerMostExp),
            value = inject(nextExp.exp, nextExp.operator);

          console.dir(exp);
          var newExp = exp.replace(innerMostExp, value.toString());

          console.dir(newExp);
          return loop_run(newExp, stack);

        // else...
        } catch(error) {
          console.dir(error);
          // if it's a single list item, return it
          if (exp.match(/^\(\S+\)$/)) {
            return trimParens(exp);
          }

          var injectables = prep(exp);

          return loop_run(inject(injectables.exp, injectables.operator), stack);
        }

        // HELPERS
        function prep (exp) {
          exp = trimParens(exp).split(' ');
          var operator = exp.shift();
          exp = exp.map(function (item) {
            return Number(item);
          });

          return {
            exp: exp,
            operator: operator
          }
        }

        function trimParens (exp) {
          return exp.slice(1, -1);
        }

        // there has got to be a way to do this more elegantly
        function inject (list, operator) {
          switch (operator) {
            case '+':
              return list.reduce(function (x, y) {
                return x + y;
              });

              break;
            case '-':
              return list.reduce(function (x, y) {
                return x - y;
              });

              break;
            case '*':
              return list.reduce(function (x, y) {
                return x * y;
              });

              break;
            case '/':
              return list.reduce(function (x, y) {
                return x / y;
              });

              break;
          }
        }
      }
    }
  }
}
