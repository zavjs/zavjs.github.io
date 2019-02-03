webpackJsonp([84586273293571],{373:function(n,s){n.exports={pathContext:{posts:[{html:'<p>Render props is a pattern that allows us to <strong>delegate rendering away from the component implementation itself</strong>, meaning it will do something under the curtains and simply expose the results in the form of parameters to child components</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">MyCounter</span> <span class="token operator">...</span> <span class="token punctuation">{</span>\n  state <span class="token operator">=</span> <span class="token punctuation">{</span> counter<span class="token punctuation">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  onClick <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span>counter<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> counter<span class="token punctuation">:</span> counter <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>div<span class="token operator">></span>\n      <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>counter<span class="token punctuation">}</span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>We have a good logic encapsulated within MyCounter, but we have little flexibility in how to use that logic. The state will always render the same thing. What if we provide more flexibility by just exposing logic out of the component, <strong>without caring</strong> on how this is effectively rendering?</p>\n<p>To do so, we take in a props called render that\'s a function and have arguments provided to it:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">MyCounter</span> <span class="token operator">...</span> <span class="token punctuation">{</span>\n  state <span class="token operator">=</span> <span class="token punctuation">{</span> counter<span class="token punctuation">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  onClick <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span>counter<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> counter<span class="token punctuation">:</span> counter <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    counter<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>counter<span class="token punctuation">,</span>\n    onClick<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>onClick\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>This makes sure our parent component logic and the rendering is decoupled. The function implementation of this component is the one deciding how the passed in props will evaluate to JSX, so we can put a given functionality, like a counter for example, but instead of tiying it to a specific child component, we leave it open to any others.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">ConsumerComp</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token operator">&lt;</span>MyCounter\n    render<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">{</span> counter<span class="token punctuation">,</span> onClick <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"consumer-comp"</span><span class="token operator">></span>\n        <span class="token punctuation">{</span>counter<span class="token punctuation">}</span>\n       <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>onClick<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n    <span class="token punctuation">)</span> <span class="token operator">/</span><span class="token operator">></span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>',id:"/Users/zavareze/projects/zavjsblog/src/pages/2018-02-28-render-props-with-react/index.md absPath of file >>> MarkdownRemark",frontmatter:{date:"We, 02/18",path:"/render-props-with-react",title:"Design Patterns: Render Props",excerpt:"A very good technique to add flexibility in our rendering logic is using the render props pattern, which is a prop we define as a function that allows us to delegate rendering away from the component implementation itself, meaning it simply expose function parameters to child components...",tags:["react","javascript"]}},{html:'<p>First, make sure you have a React project set up. If not, and you don\'t know how to, it\'s probably best to install <code class="language-text">create-react-app</code>, by going to the terminal and typing <code class="language-text">npm install -g create-react-app</code>. Then, type <code class="language-text">create-react-app /path/to/desired/destination</code>, and voilá, you\'ll have a ready to use React application.</p>\n<h3>React Router</h3>\n<p>React Router is a library that allows us to activate browser routing in React, while still being able to use browser features like moving back and moving further. Inside your main App.js, import BrowserRouter from React Router DOM.</p>\n<p><code class="language-text">npm install react-router-dom</code></p>\n<p>This:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">//App.js</span>\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">//...</span>\n<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">//...</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span>\n  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">;</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Becomes this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">//App.js</span>\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n<span class="token comment">//...</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> BrowserRouter <span class="token keyword">as</span> Router<span class="token punctuation">,</span> Route <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-router-dom\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">\'containers/Home\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"app-container"</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span>Route to<span class="token operator">=</span><span class="token string">"/"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Home<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>Router<span class="token operator">></span>\n    <span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>Router<span class="token operator">></span><span class="token punctuation">,</span>\n  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">;</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>By instantiating Route components, we\'re able to specify which component should be evaluated on each specific route inside the application.</p>\n<p>However, if we wish to create a private route, we need to do the following logic:</p>\n<ol>\n<li>Is user allowed to access this page? In short, <code class="language-text">isAunthenticated</code>?</li>\n<li>If yes, go to route; otherwise, redirect or go to a default component</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> isAuthenticated <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"utils/auth"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> LoginPage <span class="token keyword">from</span> <span class="token string">"containers/LoginPage"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Route <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-router-dom"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">PrivateRoute</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> component<span class="token punctuation">:</span> Component<span class="token punctuation">,</span> <span class="token operator">...</span>rest <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>Route\n    <span class="token punctuation">{</span><span class="token operator">...</span>rest<span class="token punctuation">}</span>\n    render<span class="token operator">=</span><span class="token punctuation">{</span>props <span class="token operator">=></span>\n      <span class="token function">isAuthenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token operator">&lt;</span>Component <span class="token operator">/</span><span class="token operator">></span> <span class="token punctuation">:</span> <span class="token operator">&lt;</span>LoginPage <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">}</span>\n  <span class="token operator">/</span><span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><code class="language-text">isAuthenticated()</code> simply checks if the current user is validated or not. If that\'s the case, we create the desired component as child of Route. If not, we render the fallback page, which in my case is the LoginPage component.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">//App.js</span>\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n<span class="token comment">//...</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> BrowserRouter <span class="token keyword">as</span> Router<span class="token punctuation">,</span> Route <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-router-dom\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Home <span class="token keyword">from</span> <span class="token string">\'containers/Home\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> PrivateComponent <span class="token keyword">from</span> <span class="token string">\'containers/PrivateComponent\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> PrivateRoute <span class="token keyword">from</span> <span class="token string">\'./PrivateRoute\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"app-container"</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span>Route to<span class="token operator">=</span><span class="token string">"/"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>Home<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span>PrivateRoute to<span class="token operator">=</span><span class="token string">"/private"</span> component<span class="token operator">=</span><span class="token punctuation">{</span>PrivateComponent<span class="token punctuation">}</span> <span class="token operator">></span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>Router<span class="token operator">></span>\n    <span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>Router<span class="token operator">></span><span class="token punctuation">,</span>\n  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>The private route is effectively created. If validated, we show the PrivateComponent, otherwise we show the login page.</p>',id:"/Users/zavareze/projects/zavjsblog/src/pages/2018-01-17-private-routes-react/index.md absPath of file >>> MarkdownRemark",frontmatter:{date:"We, 01/18",path:"/private-routes-react",title:"Private Routes in React",excerpt:"As soon as someone starts to build complex React application, they will often have to deal with a considerable challenge: creating private routes. That is, routes accessible only by authorized people. In this article we'll see one way to achieve this",tags:["react","react-router",""]}}],tagName:"react"}}}});
//# sourceMappingURL=path---tags-react-9e745159f1a68d13c198.js.map