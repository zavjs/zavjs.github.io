---
title: "Glossary: JS prototypes"
pubDate: "2019-02-03"
heroImage: ""
description: "A prototype is an object used to model other objects. It's similar to a class in the sense it allows for the creation of any number of object instances, but…"
---

A prototype is an object used to model other objects. It's similar to a class in the sense it allows for the creation of any number of object instances, but with the exception that a prototype is an object itself.

### Delegation, not Inheritance

Different from the classical model, we don't inherit from prototypes as we would with classes. Instead, we delegate from these objects to the ones after.

### The Chain

When using prototype objects to create new ones, the methods are not replicated in the instance object. Instead, they're referenced. Each instance has a link pointing to the prototype (original object) so when we execute one object's method, JavaScript first tries to see if it finds in the instance, going up the chain until it finds the property, or reaches the end of the chain.

```js
class SuperAnimal {}
SuperAnimal.prototype.name = "some super animal";

class Animal extends SuperAnimal {}
Animal.prototype.name = "some regular animal";

const rabbit = new Animal();
rabbit.name; // 'some regular animal'

// keep in mind the `class` syntax in JS is just a syntactic sugar over the es5 prototype model
```

rabbit.name will evaluate to some regular animal because the next object in the chain is Animal. If we comment the Animal.prototype.name assignment, rabbit.name would then be "some super animal"

Keywords: Object delegation, Prototype chain, Definitely not like old school classes
