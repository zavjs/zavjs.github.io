---
title: "ES6 Arrow Functions"
pubDate: "2019-02-03"
heroImage: ""
description: "This post showed the different ways a function can be executed and the context implications of each. The keyword this is source of a lot of confusion, even for…"
---

This post showed the different ways a function can be executed and the context implications of each. The keyword this is source of a lot of confusion, even for seasoned developers. The arrow function showed up as a way to make our lives easier and is one of the most appreciated ES6 features.

Shorter syntax:

```js
const sum2 = function(num) {
  return num + 2;
};

// arrow counterpart

const sum2 = num => num + 2;
```

Notice we got rid of a few things: the function identifier, the return statement and in this particular case even the curly braces. Think of nested callbacks or even promises: no need for multiple repetitive function and return statements.

Consistency in context with this:

```js
Animal.prototype.attack = function() {
  get("animal-key").then(key => {
    fetch(`/animals/${this.id}`, { key });
  });
};
```

this.id will always be set to the caller's context (in this case the attack prototype function) and the arrow function cannot be coerced to treat it any differently (apply, bind).
