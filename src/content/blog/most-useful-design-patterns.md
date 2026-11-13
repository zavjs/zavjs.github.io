---
title: "Design Patterns: JavaScript"
pubDate: "2018-09-29"
heroImage: ""
---

<p>Design patterns are proven reusable solutions to a recurrent problem. To be considered a pattern, the solution must not be obvious. Most of the times, patterns describe a relationship between structures.</p>
<p>One major benefit of design patterns is the creation of jargons for common vocabulary. Instead of explaining complex structures we just say "why not do a module here, my good sir?". So, tighten your seatbealts and let's delve into some of my favorite.</p>
<blockquote>
<p>Did you know the concept of Design Patterns is original from construction? Coined by Christopher Alexander in his book "A Pattern Language", he wrote it to outline common patterns or solutions he came across when building stuff out in the physical world.</p>
</blockquote>
<blockquote>
<p><em>For example, the Cloverleaf interchanges are a common proven solution to help drivers transition between highways without the need of turns or even traffic lights.</em></p>
</blockquote>
<h3>Design Patterns in JavaScript</h3>
<hr>
<p>The first pattern is categorized under the creational type of patterns. A module is simply a containarized toolbox of related functionalities that is commonly created as a list of methods within an object literal:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> SongBox <span class="token operator">=</span> <span class="token punctuation">{</span>
  songs<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  singSong<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>song<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// check if the song already exist in the list</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>songs<span class="token punctuation">[</span>song<span class="token punctuation">.</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// adds if it doesn't</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>songs <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>songs<span class="token punctuation">,</span>
        <span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">:</span> song
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"\u266a"</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>songs<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  getSongById<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>songs<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<h2>The Module Pattern</h2>
<hr>
<p><strong>The Module Pattern</strong> became more recurrent with modern browser JavaScript in the moment which it started being possible to create files as modules in the browsers, and have them imported by other files. The popularization of this approach is due to tools like Browserify, Webpack, and others.</p>
<p>We can even make a module to be a function so it accepts arguments, and does calculations, or delays execution before returning the methods. Another common use for modules as functions is to create private vaiables.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">// accepting arguments that will enhance functionality</span>
<span class="token keyword">var</span> <span class="token function-variable function">SongBox</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>limit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// songs is a private variable and cannot be retrieved from outside</span>
  <span class="token comment">// SongBox.songs doesn't exist outside</span>
  <span class="token keyword">var</span> songs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> <span class="token function-variable function">addSong</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>song<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    songs <span class="token operator">=</span> songs<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>song<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> <span class="token function-variable function">getSongs</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> limit <span class="token operator">?</span> songs<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> limit<span class="token punctuation">)</span> <span class="token punctuation">:</span> songs<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    addSong<span class="token punctuation">,</span>
    getSongs
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>What do you think is the benefit for creating modules? My take is that it becomes much better to reason, discern and organize our code if we manage to logically separate all differing structures of our software apart. Each component is very well delimited and we know exactly when one ends and another begins.</p>
<p>Additionally, if we are able to separate our components we get to be able to test them separately as well. And isn't that much better when we need to work on new functionality, or to alter existing ones? Isn't separation of concerns a much more efficient tactic when we need to find a pesky bug in the code? I know for a fact it is, because if there's a clearer distinction of <em>what's what</em>, specific tests will fail, and specific functions will accuse the error more prominently.</p>
<p>Software developers already know the importance of decomposing big problems in multiple small specialized functions that solve small units (the divide and conquer tactic). With the module pattern, we can take this to another level to group similar functionality.</p>
<h2>The Facade Pattern</h2>
<hr>
<p>Simplicity. Simplicity is key to software development. Not because of machines, but because of those that operate the machines - we, humans. The Facade Pattern is aimed to enhance software construction by providing a simplified interface to a complicated sub-system.</p>
<p>Like most web developers, my early days of hacking in the web started with jQuery. Oh, and how powerful I felt using jQuery. A few lines of code and BAM! I'm making an element slide into view, almost like a Ninja. Another line and SHAZAM! this div is fading out from view.</p>
<p>This apparent simplicity of the few <code class="language-text">$(el).slideDown()</code> and <code class="language-text">$(el).fadeOut()</code> methods hide quite a lot of complexity. For starters, the actual animation within those functions usually took way more than a couple of lines. Then, there's the problem of browser compatibility. How are you making sure that everything you do in JavaScript is compatible with the latest Chrome browser, and IE8 altogether?</p>
<p>Something as simple as creating an event listener had different syntaxes in different browsers:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">// webkit:</span>
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'clicked!'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
div<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span>

<span class="token comment">// ie 8/opera</span>
div<span class="token punctuation">.</span><span class="token function">attachEvent</span><span class="token punctuation">(</span><span class="token string">'onclick'</span><span class="token punctuation">,</span> div<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
div<span class="token punctuation">.</span><span class="token function">detachEvent</span><span class="token punctuation">(</span><span class="token string">'onclick'</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span></code></pre>
      </div>
<p>Now imagine something a little more complicated, like JS animations. So when it comes to actually supporting all browsers, developers would have to be mindful of quite a few different possibilities for compatibility. jQuery took that away,by taking care of common complexities found in web development, so that the final developer doesn't have to.</p>
<p><code class="language-text">$(el).css()</code>, <code class="language-text">$(el).animate()</code> are just a few other examples on why a beginner would feel so competent writing JavaScript.</p>
<h3>Creating a Facade ourselves</h3>
<hr>
<p>A Facade is just a simplified interface for a complex sub-system. Just as the seemingly nice neighbour who smiles and greets, but deep inside despises and envies you.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">// Immediately-invoked function expression for</span>
<span class="token comment">// separate scope</span>
<span class="token keyword">var</span> myBankingModule <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> _private <span class="token operator">=</span> <span class="token punctuation">{</span>
    deposit<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>cash<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>cash <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cash <span class="token operator">+</span> cash<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    transfer<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>amount<span class="token punctuation">,</span> destination<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"transfering"</span> <span class="token operator">+</span> <span class="token string">"$"</span> <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> amount <span class="token operator">+</span> <span class="token string">" to: "</span> <span class="token operator">+</span> destination<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    getBalance<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>cash<span class="token punctuation">,</span> <span class="token string">"is how much you have now"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    depositTransferAndLog<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>opts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      _private<span class="token punctuation">.</span><span class="token function">deposit</span><span class="token punctuation">(</span>opts<span class="token punctuation">.</span>depositAmount<span class="token punctuation">)</span><span class="token punctuation">;</span>
      _private<span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span>opts<span class="token punctuation">.</span>transferAmount<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>transferDestinationId<span class="token punctuation">)</span><span class="token punctuation">;</span>
      _private<span class="token punctuation">.</span><span class="token function">getBalance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> account <span class="token operator">=</span> <span class="token function">myBankingModule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

account<span class="token punctuation">.</span><span class="token function">depositTransferAndLog</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  depositAmount<span class="token punctuation">:</span> <span class="token number">1500</span><span class="token punctuation">,</span>
  transferAmount<span class="token punctuation">:</span> <span class="token number">500</span><span class="token punctuation">,</span>
  transferDestinationId<span class="token punctuation">:</span> <span class="token string">"af043748399930948d9"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>Notice that when calling <code class="language-text">.depositTransferAndLog()</code> we are triggering a set of private behavior within the module, that the consuming part doesn't even have to be aware of. We made it much easier to consume a feature without needing to worry about implementation-level details. Think of all APIs you have consumed. They usually expose a few methods that are very intuitive and simple to use while the hardwork is done at the server level.</p>
<h2>Conclusion</h2>
<hr>
<p>Design patterns are proven solutions to recurrent software problems. They can't be obvious and they offer good standards on how we create, structure and extend functionality.</p>
<p><strong>The Module Pattern</strong>: the grouping of similar functions together. Separation of concerns, enhanced testability and debuggability.</p>
<p><strong>The Facade Pattern</strong>: the simplification of a complex sub-system. Creating abstractions that hide potential complexities or obscurities from the original code.</p></div>🏠<a href="/" data-reactid="20">Home</a> </div></div></div></div>
