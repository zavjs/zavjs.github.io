---
title: "Understading Automated Toolkits"
pubDate: "2018-01-10"
heroImage: ""
description: "If you're familiar with toolkits that aim automating repetitive tasks, like compressing css, or ugliflying js files (like Gulp), you might be wondering how…"
---

If you're familiar with toolkits that aim automating repetitive tasks, like compressing css, or ugliflying js files (like Gulp), you might be wondering how does that work. Today, we'll understand these toolkits a little more, while creating a rudimentary copy of one of these tools, that aim to replicate similar functionalities.

This post aims to demonstrate a few Node modules, and a few development patterns that would help us replicate similar functionalities as that of Gulp, for example. It's not intended for actual use or to be taken other than a learning resource.

## Use Case

The way I like to address challenges/issues is by using real world use cases as guiding parameters. For that purpose, I randomly choose "Droll" to be my module's name, and there are a handful of things I wish Droll would do:

- Creating tasks that would allow users to encapsulate functionality and execute it when we they see fit

- Watch for changes in directories or files as a way to execute functionality when it happens

- Target and allocate files/file contents into a temporary place that would allow users to modify it, without changing the original copy

- Enable users the ability to modify these temporary files by applying functions and composing functionality

- The ability to create end files based on composed functionality of temporary data

For example, let's assume a simple task that involves watching for changes on a given directory or file, applying changes to a temporary copy of that file, and creating a new file with the modified contents.

More specifically, a very common development task: having CSS files compressed into a new file. Let's assume two folders, one named src, and another named dist. src will contain the intact original css file whereas dist will hold the newly created minified version:

```text
project
|   droll.js (library)
│   drollfile.js (implementation)
│
└───src
│   │   styles.css
│
└───dist
    │   styles.min.css
```

-

The following would be how I want things to work:

```js
//drollfile.js
const droll = require("droll");

//create a droll task of name 'watch:css'
//assign the task a function to be executed whenever we decide to run it
droll.task("watch:css", () => {
  //watch for changes on a specific file
  droll.watch("./src/styles.css", () => {
    //get file contents
    droll
      .src("./src/styles.css")
      //provide functions to modify the temporary data, composing if needed
      .pipe(doSomething)
      .pipe(doSomethingElse)
      //create a final file with the modified content
      .dist("./dist/styles.min.css");
  });
});

//arbitrarily deciding to run the task
//for now a javascript line, which later
//can be replaced for a command line like `droll watch:css`, for example
droll.execute("watch:css");
```

-

## The Node.js File System Module

The main star for tonight has to be Node's File System Module, as it contains all of the file managing functionalities we need to create Droll.

See, whenever we wish to read from a file (./src/styles.css, for example), we should use fs.readFile, or even fs.readFileSync. To write, we use fs.writeFile, or fs.writeFileSync. The difference between each of the items in both pairs is asynchronicity - that is, whether you want to block runtime while attempting to read the file or not.

Since we don't expect the user (or any other users for that matter) to be doing concurrent operations (like it would happen if we were to create a Node.js Web server, for example), we will explicitly and intentionally be using the synchronous versions of these methods.

Keep in mind however, that using synchronous methods is not recomended when you're expected to serve responsive applications in which the main thread is expected to be shared by multiple concurrent operations. You don't want user A to be blocked waiting for user's B long synchronous operation to finish executing.

See the module example below:

```js
const fs = require("fs");

console.log(fs.readFileSync("myfile.txt", "utf-8")); //file contents
fs.writeFileSync("mynewfile.txt", "my new file is aweseom"); //file written
```

-

Additionally, the FS module has another very important method called 'watch'. Watch will, ehrm, well... watch a given directory or filename and enable users the ability to execute functionality when that file is changed.

```js
fs.watch("myfile.txt", (eventType, filename) => {
  console.log(eventType); // 'rename', if file created or deleted
  console.log(eventType); // 'change', if file changed
});
```

-

## The Fluent Pattern

Another key feature for our library is the ability to chain methods together for a more fluid architecture. This pattern is seen in many JavaScript libraries like jQuery, for example:

```js
// jQuery prefers this:
$(".special-div")
  //assign the color blue to special div
  .css("color", "blue")
  //target special-div's immediate parent
  .parent()
  //hide it
  .hide();

// instead of this:
var div = $(".special-div");
div.css("color", "blue");
var parent = div.parent();
parent.hide();
```

-

It's important to notice however that, when we execute any given object's method, that object doesn't return itself. It returns whatever the method should be returning:

```js
var obj = {
  abc: () => 1;
  def: () => 2,
};

/* not going to working, as it's going to try to execute the def method
for the value 1 (which doesn't exist), instead of the object itself. */
obj.abc().def();
```

-

The way to make Droll provide the ability to chain its methods is simple: we should return the Droll's context upon every method execution.

A little earlier we have already defined a few desired methods for our library, so let's sketch them here. Also, taking in consideration the aforementioned use case, note that the only methods chaining together are src, and pipe, so we'll go with that for now.

```js
//node module, module.exports automatically exports the desired object
module.exports = {
  task: () => {},
  watch: () => {},
  src: () => {
    //1. does something
    //...

    //2. return itself
    return this;
  },
  pipe: () => {
    //1. does something
    //...

    //2. return itself
    return this;
  },
  dist: () => {},
  execute: () => {}
};
```

-

### Task

In order for us to control when a specific functionality will be executed, we should hold that functionality encapsulated while naming it for later reference. We'll just create an internal property within Droll to associate a given task name to a given function:

```js
const fs = require("fs");

module.exports = {
  _tasks: {},
  task: function(taskname, cb) {
    //this._tasks['watch:js']
    this._tasks[taskname] = cb;
  }
};
```

-

### Execute

We must specify a method to explicitly execute a given task when desired. It's simple, let's just receive a name, and go inside the internal _tasks property to execute the associated function:

```js
module.exports = {
  _tasks: {},
  execute: function(taskName) {
    this._tasks[taskName]();
  },
  task: function() {
    /* collapsed */
  }
};
```

-

So, for example, we can specify when a task will be executed like this:

```js
// this is just a simple registering
droll.task("mytask", function anon() {
  console.log("when executed, please log this");
});

// here is where the 'anon' function will be executed effectively
droll.execute("mytask");
```

-

### Watch

To watch for a specific file or directory, let's make our Droll's watch method receive a path to be watched as the first parameter, and also a callback function to be executed when changes happen, as a second parameter. Let's use Node's File System module to handle the dirty work:

```js
const fs = require("fs");

module.exports = {
  _tasks: {},
  execute: function() {
    /**/
  },
  task: function() {
    /**/
  },
  watch: (path, cb) => {
    fs.watch(path, eventType => {
      if (eventType === "change") {
        cb();
      }
    });
  }
};
```

-

### Source

The source method is ideal for getting file contents. With it, we'll specify a file and get it's contents with fs.readFileSync. We'll create a property inside Droll to hold the file contents:

```js
const fs = require("fs");

module.exports = {
  _curVal: null,
  _tasks: {},
  execute: function() {
    /**/
  },
  task: function() {
    /**/
  },
  watch: function() {
    /**/
  },
  src: function(filename) {
    this._curVal = fs.readFileSync(filename);
  }
};
```

Since we're not specifying encoding, Node.js will create a Buffer object and assign it to the _curVal property.

### Pipe

Pipe is a good way to compose functionality. Since we're trying to minify a css file, let's agree that pipe should accept a function, and execute that function over the temporary value allocated inside Droll's object. We'll mutate the previously created value to become something new:

```js
const fs = require("fs");

module.exports = {
  _tasks: {},
  _curVal: null,
  execute: function() {
    /**/
  },
  task: function() {
    /**/
  },
  watch: function() {
    /**/
  },
  pipe: function(func) {
    this._curVal = func(this._curVal);
    return this;
  }
};
```

Since _curVal is being stored as a Buffer object, our goal is to apply the function to a stringified version of that Buffer, and not the Buffer instance itself. After applying mutations, we'll transform it back to a Buffer object with Buffer.from().

```js
{
  pipe: function (func) {
      this._curVal = Buffer.from(func(this._curVal.toString()));
      return this;
  }
}
```

-

### Dist

Dist will simply create a file with the previously set temporary values inside of it. The dist function will only receive one argument, the file name. The file content will be automatically inferred from Droll's property.

```js
{
  dist: function (filename) {
    fs.writeFileSync(filename, this._curVal);
  }
}
```

-

## Final Product

The final product will look like this:

```js
//droll.js
const fs = require("fs");

module.exports = {
  _tasks: {},
  _curVal: null,
  src: function(file) {
    this._curVal = fs.readFileSync(file);
    return this;
  },
  dist: function(path) {
    fs.writeFileSync(path, this._curVal);
  },
  task: function(taskName, cb) {
    this._tasks[taskName] = cb;
  },
  execute: function(taskName) {
    this._tasks[taskName]();
  },
  pipe: function(func) {
    this._curVal = Buffer.from(func(this._curVal.toString()));
    return this;
  },
  watch: function(location, cb) {
    fs.watch(location, (eventType, filename) => {
      if (eventType === "change") {
        cb();
      }
    });
  }
};
```

-

The intended functionality designed at the beginning should work properly, now.
For educational purposes let's use an actual function inside the pipe method, that would simulate minifying a css file.

```js
const droll = require("./droll");
const path = require("path");

// use path module to specify the appropriate file location
const toPath = filepath => path.join(__dirname, filepath);

// simply remove spaces to simulate minifying
const minify = content => content.replace(/\s/g, "");

droll.task("watch:css", () => {
  droll.watch(toPath("./src/styles.css"), () => {
    droll
      .src(toPath("./src/styles.css"))
      .pipe(minify)
      .dist(toPath("./dist/styles.min.css"));
  });
});
```

The final minified css file will be created inside the destination folder. Be sure to test with an actual uncompressed css file and see it being converted into minified css.

## Improvements

This toolkit can be improved in a variety of ways, for example:

- Targeting multiple files, instead of only one, by providing an array of files, instead of a string

- Targeting files by extension, by providing wildcard values such as 'src/*/.js', in case we wish to target all js or css files inside a given folder

Checkout the github repository.
