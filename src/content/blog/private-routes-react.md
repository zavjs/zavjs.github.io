---
title: "Private Routes in React"
pubDate: "2018-01-17"
heroImage: ""
---

<p>First, make sure you have a React project set up. If not, and you don't know how to, it's probably best to install <code class="language-text">create-react-app</code>, by going to the terminal and typing <code class="language-text">npm install -g create-react-app</code>. Then, type <code class="language-text">create-react-app /path/to/desired/destination</code>, and voilá, you'll have a ready to use React application.</p>
<h3>React Router</h3>
<p>React Router is a library that allows us to activate browser routing in React, while still being able to use browser features like moving back and moving further. Inside your main App.js, import BrowserRouter from React Router DOM.</p>
<p><code class="language-text">npm install react-router-dom</code></p>
<p>This:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">//App.js</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">'react-dom'</span><span class="token punctuation">;</span>

<span class="token comment">//...</span>
<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">//...</span>

ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator"><</span>App <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span>
<span class="token punctuation">;</span><span class="token punctuation">)</span></code></pre>
      </div>
<p>Becomes this:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">//App.js</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">'react-dom'</span><span class="token punctuation">;</span>
<span class="token comment">//...</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> BrowserRouter <span class="token keyword">as</span> Router<span class="token punctuation">,</span> Route <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-router-dom'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">'containers/Home'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token operator"><</span>div className<span class="token operator">=</span><span class="token string">"app-container"</span><span class="token operator">></span>
    <span class="token operator"><</span>Route to<span class="token operator">=</span><span class="token string">"/"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Home<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator"><</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator"><</span>Router<span class="token operator">></span>
    <span class="token operator"><</span>App <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator"><</span><span class="token operator">/</span>Router<span class="token operator">></span><span class="token punctuation">,</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span>
<span class="token punctuation">;</span><span class="token punctuation">)</span></code></pre>
      </div>
<p>By instantiating Route components, we're able to specify which component should be evaluated on each specific route inside the application.</p>
<p>However, if we wish to create a private route, we need to do the following logic:</p>
<ol>
<li>Is user allowed to access this page? In short, <code class="language-text">isAunthenticated</code>?</li>
<li>If yes, go to route; otherwise, redirect or go to a default component</li>
</ol>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> isAuthenticated <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"utils/auth"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> LoginPage <span class="token keyword">from</span> <span class="token string">"containers/LoginPage"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Route <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-router-dom"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">PrivateRoute</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> component<span class="token punctuation">:</span> Component<span class="token punctuation">,</span> <span class="token operator">...</span>rest <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token operator"><</span>Route
    <span class="token punctuation">{</span><span class="token operator">...</span>rest<span class="token punctuation">}</span>
    render<span class="token operator">=</span><span class="token punctuation">{</span>props <span class="token operator">=></span>
      <span class="token function">isAuthenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token operator"><</span>Component <span class="token operator">/</span><span class="token operator">></span> <span class="token punctuation">:</span> <span class="token operator"><</span>LoginPage <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
    <span class="token punctuation">}</span>
  <span class="token operator">/</span><span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p><code class="language-text">isAuthenticated()</code> simply checks if the current user is validated or not. If that's the case, we create the desired component as child of Route. If not, we render the fallback page, which in my case is the LoginPage component.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">//App.js</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">'react-dom'</span><span class="token punctuation">;</span>
<span class="token comment">//...</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> BrowserRouter <span class="token keyword">as</span> Router<span class="token punctuation">,</span> Route <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-router-dom'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">'containers/Home'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PrivateComponent <span class="token keyword">from</span> <span class="token string">'containers/PrivateComponent'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PrivateRoute <span class="token keyword">from</span> <span class="token string">'./PrivateRoute'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token operator"><</span>div className<span class="token operator">=</span><span class="token string">"app-container"</span><span class="token operator">></span>
    <span class="token operator"><</span>Route to<span class="token operator">=</span><span class="token string">"/"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Home<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator"><</span>PrivateRoute to<span class="token operator">=</span><span class="token string">"/private"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>PrivateComponent<span class="token punctuation">}</span> <span class="token operator">></span>
  <span class="token operator"><</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator"><</span>Router<span class="token operator">></span>
    <span class="token operator"><</span>App <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator"><</span><span class="token operator">/</span>Router<span class="token operator">></span><span class="token punctuation">,</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>The private route is effectively created. If validated, we show the PrivateComponent, otherwise we show the login page.</p>
