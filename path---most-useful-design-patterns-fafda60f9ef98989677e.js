webpackJsonp([0x974203ae6c91],{366:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Design patterns are proven reusable solutions to a recurrent problem. To be considered a pattern, the solution must not be obvious. Most of the times, patterns describe a relationship between structures.</p>\n<p>One major benefit of design patterns is the creation of jargons for common vocabulary. Instead of explaining complex structures we just say "why not do a module here, my good sir?". So, tighten your seatbealts and let\'s delve into some of my favorite.</p>\n<blockquote>\n<p>Did you know the concept of Design Patterns is original from construction? Coined by Christopher Alexander in his book "A Pattern Language", he wrote it to outline common patterns or solutions he came across when building stuff out in the physical world.</p>\n</blockquote>\n<blockquote>\n<p><em>For example, the Cloverleaf interchanges are a common proven solution to help drivers transition between highways without the need of turns or even traffic lights.</em></p>\n</blockquote>\n<h3>Design Patterns in JavaScript</h3>\n<hr>\n<p>The first pattern is categorized under the creational type of patterns. A module is simply a containarized toolbox of related functionalities that is commonly created as a list of methods within an object literal:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> SongBox <span class="token operator">=</span> <span class="token punctuation">{</span>\n  songs<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  singSong<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>song<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// check if the song already exist in the list</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>songs<span class="token punctuation">[</span>song<span class="token punctuation">.</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// adds if it doesn\'t</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>songs <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>songs<span class="token punctuation">,</span>\n        <span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">:</span> song\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\\u266a"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>songs<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  getSongById<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>songs<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2>The Module Pattern</h2>\n<hr>\n<p><strong>The Module Pattern</strong> became more recurrent with modern browser JavaScript in the moment which it started being possible to create files as modules in the browsers, and have them imported by other files. The popularization of this approach is due to tools like Browserify, Webpack, and others.</p>\n<p>We can even make a module to be a function so it accepts arguments, and does calculations, or delays execution before returning the methods. Another common use for modules as functions is to create private vaiables.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// accepting arguments that will enhance functionality</span>\n<span class="token keyword">var</span> <span class="token function-variable function">SongBox</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>limit<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// songs is a private variable and cannot be retrieved from outside</span>\n  <span class="token comment">// SongBox.songs doesn\'t exist outside</span>\n  <span class="token keyword">var</span> songs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">var</span> <span class="token function-variable function">addSong</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>song<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    songs <span class="token operator">=</span> songs<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>song<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">var</span> <span class="token function-variable function">getSongs</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> limit <span class="token operator">?</span> songs<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> limit<span class="token punctuation">)</span> <span class="token punctuation">:</span> songs<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    addSong<span class="token punctuation">,</span>\n    getSongs\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>What do you think is the benefit for creating modules? My take is that it becomes much better to reason, discern and organize our code if we manage to logically separate all differing structures of our software apart. Each component is very well delimited and we know exactly when one ends and another begins.</p>\n<p>Additionally, if we are able to separate our components we get to be able to test them separately as well. And isn\'t that much better when we need to work on new functionality, or to alter existing ones? Isn\'t separation of concerns a much more efficient tactic when we need to find a pesky bug in the code? I know for a fact it is, because if there\'s a clearer distinction of <em>what\'s what</em>, specific tests will fail, and specific functions will accuse the error more prominently.</p>\n<p>Software developers already know the importance of decomposing big problems in multiple small specialized functions that solve small units (the divide and conquer tactic). With the module pattern, we can take this to another level to group similar functionality.</p>\n<h2>The Facade Pattern</h2>\n<hr>\n<p>Simplicity. Simplicity is key to software development. Not because of machines, but because of those that operate the machines - we, humans. The Facade Pattern is aimed to enhance software construction by providing a simplified interface to a complicated sub-system.</p>\n<p>Like most web developers, my early days of hacking in the web started with jQuery. Oh, and how powerful I felt using jQuery. A few lines of code and BAM! I\'m making an element slide into view, almost like a Ninja. Another line and SHAZAM! this div is fading out from view.</p>\n<p>This apparent simplicity of the few <code class="language-text">$(el).slideDown()</code> and <code class="language-text">$(el).fadeOut()</code> methods hide quite a lot of complexity. For starters, the actual animation within those functions usually took way more than a couple of lines. Then, there\'s the problem of browser compatibility. How are you making sure that everything you do in JavaScript is compatible with the latest Chrome browser, and IE8 altogether?</p>\n<p>Something as simple as creating an event listener had different syntaxes in different browsers:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// webkit:</span>\ndiv<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">\'click\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'clicked!\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\ndiv<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">\'click\'</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span>\n\n<span class="token comment">// ie 8/opera</span>\ndiv<span class="token punctuation">.</span><span class="token function">attachEvent</span><span class="token punctuation">(</span><span class="token string">\'onclick\'</span><span class="token punctuation">,</span> div<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'click\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\ndiv<span class="token punctuation">.</span><span class="token function">detachEvent</span><span class="token punctuation">(</span><span class="token string">\'onclick\'</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Now imagine something a little more complicated, like JS animations. So when it comes to actually supporting all browsers, developers would have to be mindful of quite a few different possibilities for compatibility. jQuery took that away,by taking care of common complexities found in web development, so that the final developer doesn\'t have to.</p>\n<p><code class="language-text">$(el).css()</code>, <code class="language-text">$(el).animate()</code> are just a few other examples on why a beginner would feel so competent writing JavaScript.</p>\n<h3>Creating a Facade ourselves</h3>\n<hr>\n<p>A Facade is just a simplified interface for a complex sub-system. Just as the seemingly nice neighbour who smiles and greets, but deep inside despises and envies you.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Immediately-invoked function expression for</span>\n<span class="token comment">// separate scope</span>\n<span class="token keyword">var</span> myBankingModule <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> _private <span class="token operator">=</span> <span class="token punctuation">{</span>\n    deposit<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>cash<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>cash <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cash <span class="token operator">+</span> cash<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    transfer<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>amount<span class="token punctuation">,</span> destination<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"transfering"</span> <span class="token operator">+</span> <span class="token string">"$"</span> <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> amount <span class="token operator">+</span> <span class="token string">" to: "</span> <span class="token operator">+</span> destination<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    getBalance<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>cash<span class="token punctuation">,</span> <span class="token string">"is how much you have now"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    depositTransferAndLog<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>opts<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      _private<span class="token punctuation">.</span><span class="token function">deposit</span><span class="token punctuation">(</span>opts<span class="token punctuation">.</span>depositAmount<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      _private<span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span>opts<span class="token punctuation">.</span>transferAmount<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>transferDestinationId<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      _private<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> account <span class="token operator">=</span> <span class="token function">myBankingModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\naccount<span class="token punctuation">.</span><span class="token function">depositTransferAndLog</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  depositAmount<span class="token punctuation">:</span> <span class="token number">1500</span><span class="token punctuation">,</span>\n  transferAmount<span class="token punctuation">:</span> <span class="token number">500</span><span class="token punctuation">,</span>\n  transferDestinationId<span class="token punctuation">:</span> <span class="token string">"af043748399930948d9"</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Notice that when calling <code class="language-text">.depositTransferAndLog()</code> we are triggering a set of private behavior within the module, that the consuming part doesn\'t even have to be aware of. We made it much easier to consume a feature without needing to worry about implementation-level details. Think of all APIs you have consumed. They usually expose a few methods that are very intuitive and simple to use while the hardwork is done at the server level.</p>\n<h2>Conclusion</h2>\n<hr>\n<p>Design patterns are proven solutions to recurrent software problems. They can\'t be obvious and they offer good standards on how we create, structure and extend functionality.</p>\n<p><strong>The Module Pattern</strong>: the grouping of similar functions together. Separation of concerns, enhanced testability and debuggability.</p>\n<p><strong>The Facade Pattern</strong>: the simplification of a complex sub-system. Creating abstractions that hide potential complexities or obscurities from the original code.</p>',frontmatter:{title:"Design Patterns: JavaScript",date:"September 29, 2018",path:"/most-useful-design-patterns",tags:["javascript"],excerpt:"Design patterns are proven solutions to a recurrent problem. Most of the times they describe a relationship between more than one structures"}}},pathContext:{prev:{html:'<p>In this post we\'ll solve a small challenge: flatten an arbitrarily nested object into an array of values. Our initial goal should be to destructure the object, removing the keys and leaving values only.</p>\n<p>To achieve this, recursion. While traversing the object, we\'ll check if the object\'s property holds a simple value (like a number) or another object. We apply the function recursively until the returned value is a simple one.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>\n  b<span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>\n  c<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    d<span class="token punctuation">:</span> <span class="token string">"2"</span><span class="token punctuation">,</span>\n    e<span class="token punctuation">:</span> <span class="token string">"3"</span><span class="token punctuation">,</span>\n    f<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      g<span class="token punctuation">:</span> <span class="token string">"4"</span><span class="token punctuation">,</span>\n      h<span class="token punctuation">:</span> <span class="token string">"5"</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  i<span class="token punctuation">:</span> <span class="token string">"6"</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> <span class="token function-variable function">serialize</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">typeof</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">"object"</span> <span class="token operator">?</span> <span class="token function">serialize</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>If we test this function, we\'ll see it returns an array, and depending on the level of nesting, internal arrays as values. To make sure we always have a one-level array, our goal now is to flatten it.</p>\n<p>To do so, we\'ll use the example from a previous post <a href="/flattening-arbitrarily-nested-arrays">Flattening Arbitrarily Nested Arrays</a> to recursively flatten the array until the remaining value is not an array.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> <span class="token function-variable function">flatten</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">flatten</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>acc<span class="token punctuation">,</span> curr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> acc<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">flatten</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span> <span class="token punctuation">:</span> curr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>There you go. The flatten function simply verifies if the <code class="language-text">curr</code> value is an array or not. If it is, it will flatten it again by checking if its items are also arrays or not. That will be done until only simple values are returned. When that happens, <code class="language-text">curr</code> will be appended to the original accumulator (identified by the <code class="language-text">acc</code> parameter).</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">flatten</span><span class="token punctuation">(</span><span class="token function">serialize</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1, 2, 3, 4, 5, 6]</span></code></pre>\n      </div>\n<h3>Composition</h3>\n<p>The initial challenge is solved. Now, to make this look better, why not use functional compositional to achieve a clearer, more beautiful execution order?</p>\n<p>Composition is about putting together small simple functions to achieve a more complex functionality while still maintaing readability. Remember the DOT and KISS principles, respectively <strong>"DO ONE THING"</strong> and <strong>"KEEP IT SIMPLE, STUPID"</strong>.</p>\n<p>Instead of writing one function that does everything, we write multiple functions that are really good at doing one thing only, and compose them together like lego bricks, into higher functionality.</p>\n<p>To achieve this, we\'ll create a composer function that, from an initial value will apply multiple functions in order:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> <span class="token function-variable function">composer</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> funcs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>slice<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> funcs<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>acc<span class="token punctuation">,</span> curr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token function">curr</span><span class="token punctuation">(</span>acc<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Then, we compose these two functions together and use the composer anytime we wish to do this same operation:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> objectFlattener <span class="token operator">=</span> <span class="token function">composer</span><span class="token punctuation">(</span>serialize<span class="token punctuation">,</span> flatten<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">objectFlattener</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1, 2, 3, 4, 5, 6]</span></code></pre>\n      </div>',id:"/Users/zavareze/projects/zavjsblog/src/pages/2017-12-22-flattening-arbitrarily-nested-object/index.md absPath of file >>> MarkdownRemark",frontmatter:{date:"Fr, 12/17",path:"/flatenning-arbitrarily-nested-object",title:"Flattening an Arbitrarily Nested Object",excerpt:"In this post, we'll solve a small challenge: flatten an arbitrarily nested object into an array of values. Our initial goal should be to deestructure the object, removing the keys and leaving values only; then, we should be able to transform the nested array into a single-level array.",tags:["javascript"]}},next:null}}}});
//# sourceMappingURL=path---most-useful-design-patterns-fafda60f9ef98989677e.js.map