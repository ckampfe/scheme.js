scheme.js
=========

Let's learn a Scheme by implementing one in JavaScript!

With inspiration and ideas from:
- The Little Schemer
- Peter Norvig's [lis.py](http://norvig.com/lispy.html)
- Mark Grant's [Let's make a lisp](https://github.com/mg50/lisp)

###tests:

```
npm install mocha chai
mocha -R spec scheme_test.js
```

###things you can do so far:
```
> evalScheme("(+ 4 5)")
9

> evalScheme("(- 78 (* 5 (- 15 (/ 20 4))))")
28

> evalScheme("(car '(55 1 88 12))")
55
```
