---
title: "Design Patterns: JavaScript"
pubDate: "2018-09-29"
heroImage: ""
description: "Design patterns are proven reusable solutions to a recurrent problem. To be considered a pattern, the solution must not be obvious. Most of the times, patterns…"
---

Design patterns are proven reusable solutions to a recurrent problem. To be considered a pattern, the solution must not be obvious. Most of the times, patterns describe a relationship between structures.

One major benefit of design patterns is the creation of jargons for common vocabulary. Instead of explaining complex structures we just say "why not do a module here, my good sir?". So, tighten your seatbealts and let's delve into some of my favorite.

Did you know the concept of Design Patterns is original from construction? Coined by Christopher Alexander in his book "A Pattern Language", he wrote it to outline common patterns or solutions he came across when building stuff out in the physical world.

For example, the Cloverleaf interchanges are a common proven solution to help drivers transition between highways without the need of turns or even traffic lights.

### Design Patterns in JavaScript

The first pattern is categorized under the creational type of patterns. A module is simply a containarized toolbox of related functionalities that is commonly created as a list of methods within an object literal:

```js
var SongBox = {
  songs: [],
  singSong: function(song) {
    // check if the song already exist in the list
    if (!this.songs[song.id]) {
      // adds if it doesn't
      this.songs = {
        ...this.songs,
        [id]: song
      };
    }

    console.log("\u266a", this.songs[id]);
  },
  getSongById: function(id) {
    return this.songs[id];
  }
};
```

## The Module Pattern

The Module Pattern became more recurrent with modern browser JavaScript in the moment which it started being possible to create files as modules in the browsers, and have them imported by other files. The popularization of this approach is due to tools like Browserify, Webpack, and others.

We can even make a module to be a function so it accepts arguments, and does calculations, or delays execution before returning the methods. Another common use for modules as functions is to create private vaiables.

```js
// accepting arguments that will enhance functionality
var SongBox = function(limit) {
  // songs is a private variable and cannot be retrieved from outside
  // SongBox.songs doesn't exist outside
  var songs = [];

  var addSong = function(song) {
    songs = songs.concat(song);
  };

  var getSongs = function() {
    return limit ? songs.slice(0, limit) : songs;
  };

  return {
    addSong,
    getSongs
  };
};
```

What do you think is the benefit for creating modules? My take is that it becomes much better to reason, discern and organize our code if we manage to logically separate all differing structures of our software apart. Each component is very well delimited and we know exactly when one ends and another begins.

Additionally, if we are able to separate our components we get to be able to test them separately as well. And isn't that much better when we need to work on new functionality, or to alter existing ones? Isn't separation of concerns a much more efficient tactic when we need to find a pesky bug in the code? I know for a fact it is, because if there's a clearer distinction of what's what, specific tests will fail, and specific functions will accuse the error more prominently.

Software developers already know the importance of decomposing big problems in multiple small specialized functions that solve small units (the divide and conquer tactic). With the module pattern, we can take this to another level to group similar functionality.

## The Facade Pattern

Simplicity. Simplicity is key to software development. Not because of machines, but because of those that operate the machines - we, humans. The Facade Pattern is aimed to enhance software construction by providing a simplified interface to a complicated sub-system.

Like most web developers, my early days of hacking in the web started with jQuery. Oh, and how powerful I felt using jQuery. A few lines of code and BAM! I'm making an element slide into view, almost like a Ninja. Another line and SHAZAM! this div is fading out from view.

This apparent simplicity of the few $(el).slideDown() and $(el).fadeOut() methods hide quite a lot of complexity. For starters, the actual animation within those functions usually took way more than a couple of lines. Then, there's the problem of browser compatibility. How are you making sure that everything you do in JavaScript is compatible with the latest Chrome browser, and IE8 altogether?

Something as simple as creating an event listener had different syntaxes in different browsers:

```js
// webkit:
div.addEventListener('click', function () {
  console.log('clicked!')
})
div.removeEventListener('click', ...)

// ie 8/opera
div.attachEvent('onclick', div, function () {
  console.log('click')
})
div.detachEvent('onclick', ...)
```

Now imagine something a little more complicated, like JS animations. So when it comes to actually supporting all browsers, developers would have to be mindful of quite a few different possibilities for compatibility. jQuery took that away,by taking care of common complexities found in web development, so that the final developer doesn't have to.

$(el).css(), $(el).animate() are just a few other examples on why a beginner would feel so competent writing JavaScript.

### Creating a Facade ourselves

A Facade is just a simplified interface for a complex sub-system. Just as the seemingly nice neighbour who smiles and greets, but deep inside despises and envies you.

```js
// Immediately-invoked function expression for
// separate scope
var myBankingModule = (function() {
  var _private = {
    deposit: function(cash) {
      this.cash = this.cash + cash;
    },
    transfer: function(amount, destination) {
      console.log("transfering" + "$" + " " + amount + " to: " + destination);
    },
    getBalance: function() {
      console.log(this.cash, "is how much you have now");
    }
  };

  return {
    depositTransferAndLog: function(opts) {
      _private.deposit(opts.depositAmount);
      _private.transfer(opts.transferAmount, opts.transferDestinationId);
      _private.getBalance();
    }
  };
})();

var account = myBankingModule();

account.depositTransferAndLog({
  depositAmount: 1500,
  transferAmount: 500,
  transferDestinationId: "af043748399930948d9"
});
```

Notice that when calling .depositTransferAndLog() we are triggering a set of private behavior within the module, that the consuming part doesn't even have to be aware of. We made it much easier to consume a feature without needing to worry about implementation-level details. Think of all APIs you have consumed. They usually expose a few methods that are very intuitive and simple to use while the hardwork is done at the server level.

## Conclusion

Design patterns are proven solutions to recurrent software problems. They can't be obvious and they offer good standards on how we create, structure and extend functionality.

The Module Pattern: the grouping of similar functions together. Separation of concerns, enhanced testability and debuggability.

The Facade Pattern: the simplification of a complex sub-system. Creating abstractions that hide potential complexities or obscurities from the original code.
