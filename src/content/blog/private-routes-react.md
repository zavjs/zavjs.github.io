---
title: "Private Routes in React"
pubDate: "2018-01-17"
heroImage: ""
description: "First, make sure you have a React project set up. If not, and you don't know how to, it's probably best to install create-react-app, by going to the terminal…"
---

First, make sure you have a React project set up. If not, and you don't know how to, it's probably best to install create-react-app, by going to the terminal and typing npm install -g create-react-app. Then, type create-react-app /path/to/desired/destination, and voilá, you'll have a ready to use React application.

### React Router

React Router is a library that allows us to activate browser routing in React, while still being able to use browser features like moving back and moving further. Inside your main App.js, import BrowserRouter from React Router DOM.

npm install react-router-dom

This:

```js
//App.js
import React from 'react';
import ReactDOM from 'react-dom';

//...
const App = () {}; //...

ReactDOM.render(
  <App />,
  document.getElementById('root')
;)
```

Becomes this:

```js
//App.js
import React from 'react';
import ReactDOM from 'react-dom';
//...
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from 'containers/Home';

const App = () => (
  <div className="app-container">
    <Route to="/" component={Home} />
  </div>
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
;)
```

By instantiating Route components, we're able to specify which component should be evaluated on each specific route inside the application.

However, if we wish to create a private route, we need to do the following logic:

- Is user allowed to access this page? In short, isAunthenticated?

- If yes, go to route; otherwise, redirect or go to a default component

```js
import { isAuthenticated } from "utils/auth";
import LoginPage from "containers/LoginPage";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component /> : <LoginPage {...props} />
    }
  />
);
```

isAuthenticated() simply checks if the current user is validated or not. If that's the case, we create the desired component as child of Route. If not, we render the fallback page, which in my case is the LoginPage component.

```js
//App.js
import React from 'react';
import ReactDOM from 'react-dom';
//...
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from 'containers/Home';
import PrivateComponent from 'containers/PrivateComponent';
import PrivateRoute from './PrivateRoute';

const App = () => (
  <div className="app-container">
    <Route to="/" component={Home} />
    <PrivateRoute to="/private" component={PrivateComponent} >
  </div>
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
```

The private route is effectively created. If validated, we show the PrivateComponent, otherwise we show the login page.
