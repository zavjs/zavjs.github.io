webpackJsonp([0xd11f0e1d4b4e],{376:function(n,s){n.exports={pathContext:{posts:[{html:'<p>For many years on the web, the way to make asynchronous requests was by using the XMLHttpRequest API. Built my Microsoft, it soon became the standard way to connect client and the server, and remained that way for a long time.</p>\n<h3>XMLHttpRequest example</h3>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nxhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"api.github.com/users"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nxhr<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"load"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"response is here"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nxhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>The XMLHttpRequest way to do things involved callback functions. That is, pieces of code to be executed when the external process is finished and the response is back.</p>\n<p>Soon enough - as code bases grew and environments such as Node.js appeared, it became more and more difficult to handle asynchronous requests in a desired order through a series of steps, handling any errors that might come up, and also keeping good readability. The <strong>callback hell</strong> emerged.</p>\n<h3>Callback Hell</h3>\n<p>As callbacks usage was increased and widely adopted to handle both synchronous and asynchronous operations, a peculiar symptom started to appear: the nesting of these callbacks in a very confusing fashion, leading to poor code readability.</p>\n<h4>Sample Node.js file</h4>\n<p>Checking if a file exists, reading its content and updating it:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> myFile <span class="token operator">=</span> <span class="token string">"my-file.js"</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> message <span class="token operator">=</span> process<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">editFile</span><span class="token punctuation">(</span>content<span class="token punctuation">,</span> additionalContent<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> content <span class="token operator">+</span> additionalContent<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\nfs<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span>myFile<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>exists<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>exists<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span>fileName<span class="token punctuation">,</span> <span class="token string">"utf-8"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>\n\n      fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span>fileName<span class="token punctuation">,</span> <span class="token function">editFile</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">//writing finished</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h3>The Promise Way</h3>\n<p>Promises had a better proposal on how to structure and order asynchronous calls in a series of steps while maintaining readability and organization. Additionally with Promises when errors occurr it\'s possible to catch \'em on the spot, without need for checks in every step of the way.</p>\n<p>To see how to implement a Promise in a very basic manner, first let\'s compare it with an old callback-nesting version of it. The scenario is simple, loading an image and handling cases of sucess and error for it:</p>\n<h4>Old callback-nesting way</h4>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">loadImage</span><span class="token punctuation">(</span><span class="token string">\'blossom.png\'</span><span class="token punctuation">,</span> <span class="token string">\'wrapper\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>containerId<span class="token punctuation">,</span> img<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    document<span class="token punctuation">.</span><span class="token function">findElementById</span><span class="token punctuation">(</span>containerId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`error found while loading image: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>err<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">loadImage</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> containerId<span class="token punctuation">,</span> success<span class="token punctuation">,</span> error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    img<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>\n\n    img<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">success</span><span class="token punctuation">(</span>containerId<span class="token punctuation">,</span> img<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    img<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>With Promises, we need to wrap our operations (timers, requests, etc) on a new Promise instantiation and either Resolve or Reject with the response of these requests. The same example above, in Promises, would be:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">loadImage</span><span class="token punctuation">(</span><span class="token string">\'blossom.png\'</span><span class="token punctuation">,</span> <span class="token string">\'wrapper\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>containerId<span class="token punctuation">,</span> img<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        document<span class="token punctuation">.</span><span class="token function">findElementById</span><span class="token punctuation">(</span>containerId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`error found while loading image: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>err<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">loadImage</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> containerId<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">var</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        img<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>\n\n        img<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token function">resolve</span><span class="token punctuation">(</span>containerId<span class="token punctuation">,</span> img<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n        img<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>As you can see, it\'s possible to chain calls together, with <code class="language-text">.then</code>, and catch errors with <code class="language-text">.catch</code>. You can do as many operations as you wish, by resolving promises and having the resolved values as the first argument of the next function:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token function-variable function">users</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> users <span class="token operator">=</span> <span class="token punctuation">{</span>\n    zavjs<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      id<span class="token punctuation">:</span> <span class="token string">"zavjs"</span><span class="token punctuation">,</span>\n      content<span class="token punctuation">:</span> <span class="token string">"This is my description description "</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    getUser<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>userName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> users<span class="token punctuation">[</span>userName<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    editUser<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>userName<span class="token punctuation">,</span> content<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      users<span class="token punctuation">[</span>userName<span class="token punctuation">]</span> <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> users<span class="token punctuation">[</span>userName<span class="token punctuation">]</span><span class="token punctuation">,</span> content<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">return</span> users<span class="token punctuation">[</span>userName<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">//fetch api uses promises natively</span>\n<span class="token keyword">var</span> <span class="token function-variable function">getUser</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>userName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`https://api.github.com/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>userName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token function">getUser</span><span class="token punctuation">(</span><span class="token function">users</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token string">"zavjs"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">//json parse</span>\n    <span class="token keyword">return</span> res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">//returning description</span>\n    <span class="token keyword">return</span> <span class="token function">users</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">editUser</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>username<span class="token punctuation">,</span> data<span class="token punctuation">.</span>description<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">//...</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>It\'s also possible to assign a Promise to a variable and use it progressively, as necessary, instead of chaining:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> promise <span class="token operator">=</span> <span class="token function">promiseFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\npromise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\npromise<span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">handleSomeError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>In essence, a Promise is an object that serves as temporary placeholder for a future evaluation, which is usually an asynchronous operation like an async request or a timer. Using the Promise object, you can layout the path the actual value will take for when it\'s ready to be executed, by registering callbacks to be ran when the operation succeeds or fails.</p>',id:"/Users/zavareze/projects/zavjsblog/src/pages/2017-12-28-handling-javascript-promises/index.md absPath of file >>> MarkdownRemark",frontmatter:{date:"Fr, 12/17",path:"/using-javascript-promises",title:"Using JavaScript Promises",excerpt:"For many years on the web, the way to make asynchronous requests was by using the XMLHttpRequest API. Built my Microsoft, it soon became the standard way to connect client and the server, and remained that way for a long time.",tags:["javascript","promises","ajax"]}}],tagName:"ajax"}}}});
//# sourceMappingURL=path---tags-ajax-e233e67754ab090a84d9.js.map