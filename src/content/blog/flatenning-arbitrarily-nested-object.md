---
title: "Flattening an Arbitrarily Nested Object"
pubDate: "2017-12-22"
heroImage: ""
description: "In this post, we'll flatten an arbitrarily nested object into an array of its values, discarding the keys."
---

In this post, we'll flatten an arbitrarily nested object into an array of its values, discarding the keys.

The solution is recursion. As we traverse the object, we check whether each property holds a primitive value, such as a number, or another object. When we find an object, we call the function on it again, and we repeat until only primitives remain.

```javascript
var a = {
  b: "1",
  c: {
    d: "2",
    e: "3",
    f: {
      g: "4",
      h: "5"
    }
  },
  i: "6"
};

const serialize = obj =>
  Object.keys(obj).map(key =>
    typeof obj[key] === "object" ? serialize(obj[key]) : obj[key]
  );
```

If we test this function, we'll see that it returns an array, but any nested objects come back as inner arrays. To always get a flat array, we need to flatten the result.

For this, we'll reuse the approach from an earlier post, Flattening Arbitrarily Nested Arrays, and flatten the array recursively until no inner arrays remain.

```javascript
const flatten = arr =>
  arr.reduce((acc, curr) =>
    acc.concat(Array.isArray(curr) ? flatten(curr) : curr)
  );
```

The `flatten` function checks whether `curr` is an array. If it is, `flatten` calls itself on `curr` and checks each of its items the same way. If it isn't, `curr` is a primitive, and it goes straight into the accumulator, `acc`.

```javascript
console.log(flatten(serialize(a))); // [1, 2, 3, 4, 5, 6]
```

### Composition

That solves the initial challenge. Now let's make the code cleaner with function composition, which makes the order of execution easier to follow.

Composition means building complex behavior out of small, simple functions without losing readability. It follows two familiar principles: DOT ("Do One Thing") and KISS ("Keep It Simple, Stupid").

Instead of one function that does everything, we write several functions that each do one thing well, then snap them together like LEGO bricks.

For this, we'll write a `compose` function that takes an initial value and applies a series of functions to it in order:

```javascript
var composer = function() {
  var funcs = [].slice.call(arguments);

  return function(x) {
    return funcs.reduce(function(acc, curr) {
      return curr(acc);
    }, x);
  };
};

// es6 version
const composer = (...args) => x => funcs.reduce((acc, curr) => curr(acc), x);
```

Then, we compose `serialize` and `flatten` together and use `objectFlattener` anytime we need this operation:

```javascript
var objectFlattener = composer(serialize, flatten);

objectFlattener(a); // [1, 2, 3, 4, 5, 6]
```
