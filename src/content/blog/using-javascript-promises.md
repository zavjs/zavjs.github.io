---
title: "Using JavaScript Promises"
pubDate: "2017-12-29"
heroImage: ""
description: "For many years on the web, the way to make asynchronous requests was by using the XMLHttpRequest API. Built my Microsoft, it soon became the standard way to…"
---

For many years on the web, the way to make asynchronous requests was by using the XMLHttpRequest API. Built my Microsoft, it soon became the standard way to connect client and the server, and remained that way for a long time.

### XMLHttpRequest example

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "api.github.com/users", true);
xhr.addEventListener("load", function(res) {
  console.log("response is here");
});
xhr.send();
```

The XMLHttpRequest way to do things involved callback functions. That is, pieces of code to be executed when the external process is finished and the response is back.

Soon enough - as code bases grew and environments such as Node.js appeared, it became more and more difficult to handle asynchronous requests in a desired order through a series of steps, handling any errors that might come up, and also keeping good readability. The callback hell emerged.

### Callback Hell

As callbacks usage was increased and widely adopted to handle both synchronous and asynchronous operations, a peculiar symptom started to appear: the nesting of these callbacks in a very confusing fashion, leading to poor code readability.

#### Sample Node.js file

Checking if a file exists, reading its content and updating it:

```js
var fs = require("fs");
var myFile = "my-file.js";
var message = process.argv[2];

function editFile(content, additionalContent) {
  return content + additionalContent;
}

fs.exists(myFile, function(exists) {
  if (exists) {
    fs.readFile(fileName, "utf-8", function(err, data) {
      if (err) throw err;

      fs.writeFile(fileName, editFile(data, message), function() {
        //writing finished
      });
    });
  }
});
```

### The Promise Way

Promises had a better proposal on how to structure and order asynchronous calls in a series of steps while maintaining readability and organization. Additionally with Promises when errors occurr it's possible to catch 'em on the spot, without need for checks in every step of the way.

To see how to implement a Promise in a very basic manner, first let's compare it with an old callback-nesting version of it. The scenario is simple, loading an image and handling cases of sucess and error for it:

#### Old callback-nesting way

```js
loadImage('blossom.png', 'wrapper', function (containerId, img) {
    document.findElementById(containerId).appendChild(img);
}, function (err) {
    console.error(`error found while loading image: ${err}`);
});

function loadImage(url, containerId, success, error) {
    var img = new Image();
    img.src = url;

    img.onload = function () {
        success(containerId, img);
    };

    img.onerror = function () {
        error();
    };
});
```

With Promises, we need to wrap our operations (timers, requests, etc) on a new Promise instantiation and either Resolve or Reject with the response of these requests. The same example above, in Promises, would be:

```js
loadImage('blossom.png', 'wrapper');
    .then(function (containerId, img) {
        document.findElementById(containerId).appendChild(img);
    })
    .catch(function (err) {
        console.error(`error found while loading image: ${err}`);
    });

function loadImage(url, containerId) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = url;

        img.onload = function () {
            resolve(containerId, img);
        };

        img.onerror = function () {
            reject(err);
        };
    });
}
```

As you can see, it's possible to chain calls together, with .then, and catch errors with .catch. You can do as many operations as you wish, by resolving promises and having the resolved values as the first argument of the next function:

```js
var users = function() {
  var users = {
    zavjs: {
      id: "zavjs",
      content: "This is my description description "
    }
  };

  return {
    getUser: function(userName) {
      return users[userName];
    },
    editUser: function(userName, content) {
      users[userName] = Object.assign({}, users[userName], content);
      return users[userName];
    }
  };
};

//fetch api uses promises natively
var getUser = function(userName) {
  return fetch(`https://api.github.com/${userName}`);
};

getUser(users().getUser("zavjs").id)
  .then(function(res) {
    //json parse
    return res.json();
  })
  .then(function(data) {
    //returning description
    return users().editUser(data.username, data.description);
  })
  .then(function() {
    //...
  });
```

It's also possible to assign a Promise to a variable and use it progressively, as necessary, instead of chaining:

```js
var promise = promiseFunc();
promise.then(function() {
  doSomething();
});

promise.catch(function() {
  handleSomeError();
});
```

In essence, a Promise is an object that serves as temporary placeholder for a future evaluation, which is usually an asynchronous operation like an async request or a timer. Using the Promise object, you can layout the path the actual value will take for when it's ready to be executed, by registering callbacks to be ran when the operation succeeds or fails.
