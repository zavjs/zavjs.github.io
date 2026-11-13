---
title: "Prototype and Clone"
pubDate: "2019-02-03"
heroImage: ""
description: "Sometimes you don't want to delegate from a prototype, like mentioned here and here. Instead, you want to have all properties of the prototype copied into the…"
---

Sometimes you don't want to delegate from a prototype, like mentioned here and here. Instead, you want to have all properties of the prototype copied into the new object. That can be done with Object.assign.

Here's a possible implementation of such a behavior:

```js
const copyFrom = ref =>
  Object.keys(ref).reduce(
    (acc, curr) => (
      {
        ...acc,
        [curr]: ref[curr]
      },
      {}
    )
  );
```

Live Code on Repl.it

The difference between cloning and prototyping is that the latter is more memory efficient. So it's a good idea to use delegation for publicly shared methods, and cloning for properties in order to prevent shared state issues.

Important: just as seen previously, object and array direct assingments are shared between instances whereas replacements are instance-specific:

```js
const somePrototype = { skills: { name: "ray" } };
const inst1 = copyFrom(somePrototype);
const inst2 = copyFrom(somePrototype);

inst1.skills.name = "thunder";

// did it affect 'inst2'?
console.log(inst2.skills.name); // 'thunder' Yes, it did
```
