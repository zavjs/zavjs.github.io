---
title: "ES6 Arrow Functions"
pubDate: "2019-02-03"
heroImage: ""
description: "There are different ways to call a function, and each one changes what this refers to. ES6 introduced arrow functions to make our lives easier."
---

There are different ways to call a function, and each one changes what `this` refers to. The `this` keyword confuses even seasoned developers. ES6 introduced arrow functions to make our lives easier, and they quickly became one of its most popular features.

### Shorter syntax

```js
const sum2 = function(num) {
  return num + 2;
};

// arrow counterpart

const sum2 = num => num + 2;
```

We dropped the `function` keyword, the `return` statement and, in this case, the curly braces. In nested callbacks or promise chains, this saves us from writing `function` and `return` again and again.

### Consistent this

```js
Animal.prototype.attack = function() {
  get("animal-key").then(key => {
    fetch(`/animals/${this.id}`, { key });
  });
};
```

Inside the arrow function, `this` is the same as in the enclosing `attack` method, so `this.id` is the animal's id. Neither `call`, `apply` nor `bind` can change it.
