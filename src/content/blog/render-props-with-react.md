---
title: "Design Patterns: Render Props"
pubDate: "2018-02-28"
heroImage: ""
description: "Render props is a pattern that allows us to delegate rendering away from the component implementation itself, meaning it will do something under the curtains…"
---

Render props is a pattern that allows us to delegate rendering away from the component implementation itself, meaning it will do something under the curtains and simply expose the results in the form of parameters to child components

```js
class MyCounter extends React.Component {
  state = { counter: 0 };
  onClick = () => { this.setState(({ counter }) => ({ counter: counter + 1 })); };

  render() {
    return (
      <div>
        {this.state.counter}
      </div>
    );
  }
}
```

We have a good logic encapsulated within MyCounter, but we have little flexibility in how to use that logic. The state will always render the same thing. What if we provide more flexibility by just exposing logic out of the component, without caring on how this is effectively rendering?

To do so, we take in a props called render that's a function and have arguments provided to it:

```js
class MyCounter extends React.Component {
  state = { counter: 0 };
  onClick = () => { this.setState(({ counter }) => ({ counter: counter + 1 })); };

  render() {
    return this.props.render({
      counter: this.state.counter,
      onClick: this.onClick
    });
  }
}
```

This makes sure our parent component logic and the rendering is decoupled. The function implementation of this component is the one deciding how the passed in props will evaluate to JSX, so we can put a given functionality, like a counter for example, but instead of tiying it to a specific child component, we leave it open to any others.

```js
const ConsumerComp = () => (
  <MyCounter
    render={({ counter, onClick }) => (
      <div className="consumer-comp">
        {counter}
        <button onClick={onClick} />
      </div>
    )}
  />
);
```
