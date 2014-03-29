module.exports = function (rec, current, stack) {

  if (current === '+') {
    var result = operate(add);

    if (stack.length === 0) {
      return result;
    }

    return result + rec(stack.shift());

  } else if (current === '-') {
    var result = operate(sub);
    if (stack.length === 0) {
      return result;
    }

    return result - rec(stack.shift());

  } else if (current === '*') {
    var result = operate(mult);
    if (stack.length === 0) {
      return result;
    }

    return result * rec(stack.shift());

  } else if (current === '/') {
    var result = operate(div);

    if (stack.length === 0) {
      return result;
    }

    return result / rec(stack.shift());

  } else if (typeof current === 'number') {
    return rec(stack);
    return current;
  }

  // create math substack, eval what can be eval'd
  function operate (opFn) {
    var mathStack = [];
    while (!Array.isArray(stack[0]) && stack.length > 0) {
      mathStack.push(stack.shift());
    }

    return mathStack.reduce(opFn);
  }

  // mathematical operator callbacks for reduce
  function add (a, b) { return a + b; }
  function sub (a, b) { return a - b; }
  function mult (a, b) { return a * b; }
  function div (a, b) { return a / b; }
}
