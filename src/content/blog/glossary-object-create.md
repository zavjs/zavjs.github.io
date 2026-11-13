---
title: "Glossary: Object Create"
pubDate: "2019-02-03"
heroImage: ""
description: "Object.create is a method that takes one object as the first parameter and makes it the delegate for the newly created object instances."
---

Object.create is a method that takes one object as the first parameter and makes it the delegate for the newly created object instances.

```js
const someReferenceObject = {
  name: "Ragnar Lothbrok",
  skills: {
    powerAttack: function() {
      console.log("For oodiiin!");
    }
  }
};

// each viking lives with the spirit of Ragnar
const viking = Object.create(someReferenceObject);
console.log(viking.skills); // Object { powerAttack: f }
```

When you use a constructor function with the new keyword, the object referenced by the constructor's prototype property gets set as the delegate for the objects that get created after.

```js
function Cat() {}
Cat.prototype.attack = () => {
  console.log("meowow?");
};

const instanceCat = new Cat();
instanceCat.attack(); // meowow?
```

So this means we can replicate Object.create by having a function that accepts an object, creates a new constructor, attributes the provided object as prototype of the newly created constructor, creates and returns an instance:

```js
Object.prototype.create = function(protoReference) {
  function Any() {}
  Any.prototype = protoReference;
  return new Any();
};
```

Important: changing properties on the instance should not reflect in changes on the prototype, or other instances that use it.

```js
const peopleProto = {
  someName: "eric"
};

const person = Object.create(peopleProto);
const person2 = Object.create(peopleProto);

person.someName = "joanne";

console.log("1: ", person.someName); // joanne
console.log("2: ", person2.someName); // eric
```

Here's something tricky! If you change an object or array inside prototype directly, that will cause unexpected errors:

```js
const anotherProto = {
  skills: {
    thunderStrike: function() {
      console.log("you just got thunder STRUCK!");
    },
    meta: "skill name: thunder strike"
  }
};

// creating two instances
const alex = Object.create(anotherProto);
const jack = Object.create(anotherProto);

// changing an object property directly
alex.skills.thunderStrike = function() {
  console.log("you just got COMPLIMENTED");
};

// seeing if it impacted jack
jack.skills.thunderStrike(); // you just got COMPLIMENTED
```

Thanks to Alex, Jack is no longer the aggressive warrior he once was and now distributes compliments around.

The solution is to reassign the entire object:

```js
const alex = Object.create(anotherProto);
alex.skills = {
  thunderStrike: () => {
    /* */
  }
};

jack.skills.thunderStrike(); // you just got thunder STRUCK!
```

Refer to this post for more info on JS prototypes.
