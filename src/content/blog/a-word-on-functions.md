---
title: "Function context in JavaScript"
pubDate: "2018-01-02"
heroImage: ""
description: "Functions are first class components in JavaScript. That means functions are treated just like any other kind of object, on account that they can be attributed…"
---

Functions are first class components in JavaScript. That means functions are treated just like any other kind of object, on account that they can be attributed to identifiers (var, let, const), be passed as arguments to, and be returned from other functions.

This capacity opens a new world of possibilities, especially when it comes to composing functionality. Check this example in JavaScript:

```js
function encodeURI(str) {
  return encodeURIComponent(str);
}

function removeSpaces(str) {
  return str.split(' ').join('-');
}

function toLowerCase(str) {
  return str.toLowerCase();
}

function toSlug (str) {
  return encodeURIComponent(
    toLowerCase(
      removeSpaces(str)
    )
  );
};

function doSomething(something, with) {
  return something(with);
}

doSomething(toSlug, 'CREATING a @@ $$ UNIFORM url-friendly ** # STRING');

//creating-a-%40%40-%24%24-uniform-url-friendly-**-%23-string
```

Creating reusable functionality in a similar fashion to the code above would be quite a considerable challenge in many other programming languages, but at the same time increase in functionality also means increase in complexity. We need to understand how these functions behave in all possible scenarios.

There are a few different ways to invoke a function: as a function, as a method, and as a constructor. Today we'll be discussing that.

### Functions as functions

Referring a function by saying it is invoked as a function might be too obvious, but it's not. That's because there are different ways to do so, which we'll be discussing later.

To invoke a function as a function, we simply invoke the function as it is, with the execution operator (). Again, it might sound obvious, but we'll see how that evolves:

```js
function sum(a, b) {
  return a + b;
}

//1.
function a() {
  return this;
}
console.log(a()); //Window, if in browser

//2.
function b() {
  (function c() {
    console.log(this);
  })();
}
b(); //Window, again
```

It's safe to say that when we invoke a function as a function its context is always the global object. Window in the case of the browser, or Global Object if we're talking about Node.js for example.

Considering Window is an object, functions invoked as functions are actually invoked as methods, but for Window only. We decide not to treat it as a method invokation because of Window's implicit nature. It's always going to be the global object, so we might as well categorize it differently.

Note that ES6's arrow functions behave differently, and this is a topic for other post.

### Functions as methods

Methods in JavaScript are nothing more than object properties that refer to functions. See the following example:

```js
var cat = {
  sound: "Meow",
  getSound: function() {
    return this.sound;
  }
};

cat.getSound(); //Meow
```

Since the getSound method returns 'meow', which is exactly the cat's object sound we might jump to conclude that this always refers to the cat object, which is not true. See the next example:

```js
var dog = {
  sound: "Woof",
  getSound: cat.getSound
};

dog.getSound(); //Woof
```

The function itself is not in anyway bound to the initial object (cat). So much that we're able to "lend" it to a new one (dog). What happens is this refers to the execution context whichever it is, more specifically, whoever use that method.

If we created a Giraffe object we could lend it one more time, and it would have giraffe's value. We don't need to recreate this here, but remember that for functions invoked as methods what really matters it the execution context, not the definition one.

This behavior might generate unexpected results. Sometimes we want to delegate functionality, but not hand over context. See pitoresque example below:

```js
var people = {
  names: ["Anna", "Allison", "Brandon", "Caroline", "Isabel"],
  getPeople: function() {
    return this.names;
  }
};

//WARNING: Don't do this
var party = {
  party: [],
  addToParty: function() {
    return this.party.concat(this.getPeople());
  },
  getPeople: people.getPeople
};
```

Remember this is a demonstrative example. You probably wouldn't, and if you would you probably shouldn't do as shown above. The idea is to add people names to the party object by concatenating it into the party array. Since people object already has a method that does so, the sloppy developer thought about reusing it this way.

The thing is this is not going to work, because again what really counts is the execution context. party.getPeople will try to find the property called names inside the party object, and it won't find.

The way to solve this is to circumveint the execution context and explicitly setting it with the bind method, providing the context we want to assign as the first argument for the function.

```js
var party = {
    party: [],
    addToParty: () => { /**/ },
    getPeople: people.getPeople.bind(people)
};
```

getPeople when executed will now return people's names and not party's.

Other ways to do it, would be with apply, and call, which are just other ways to execute a function with an explicit context. The difference between these two methods are mainly their parameters. You can invoke call with a list of parameters while apply requires an actual array as the second parameter.

### Functions as constructors

Invoking a function as a constructor refers to the mechanism of inheritance in JavaScript.

The first difference is the fact that invoking a function as a constructor creates a new empty object, and this object is set as the instance's context. Whatever you do inside the function constructor referring this will actually mean the instance object, and not the constructor. The context is bound to the new and recently created instance object.

```js
function Animal() {
  this.getName = function() {
    return this.name;
  };
}

var cat = new Animal();
cat.name = "Purr";
```

Whenever we refer this, the first place to be looked is the instance object. If nothing under that name is found there, JavaScript goes all the way up in the inheritance chain to see if any ancestors possess a property with that given name:

```js
function SuperAnimal() {
  this.grade = "Super Master Animal";
  this.getGrade = function() {
    return this.grade;
  };
}

//creating a prototypal inheritance chain
Animal.prototype = new SuperAnimal();

var cat = new Animal();
console.log(cat.getGrade());
```

As we can see, since no method getGrade or no property grade exists in the cat instance, JavaScript will look all the way up in the inheritance chain. It will look cat, then Animal, then SuperAnimal until there's no more places to look.

Inheritance is another very exciting complex topic to be discussed on a later opportunity, but the overall behavior is this.

### Remember

When it comes to:

- Invoking functions as functions, the context will always be the global context

- Invoking functions as methods, the context will be assigned to the current object executing the method

- Invoking functions as constructors will create a new object and refer to it.

Also:

- It's possible to explicitly set the method context by using bind, call or apply.
