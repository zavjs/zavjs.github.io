---
title: "Flattening an Arbitrarily Nested Object"
pubDate: "2017-12-22"
heroImage: ""
---

<p>In this post we'll solve a small challenge: flatten an arbitrarily nested object into an array of values. Our initial goal should be to destructure the object, removing the keys and leaving values only.</p>
<p>To achieve this, recursion. While traversing the object, we'll check if the object's property holds a simple value (like a number) or another object. We apply the function recursively until the returned value is a simple one.</p>
<div class="gatsby-highlight">
      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  b<span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
  c<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    d<span class="token punctuation">:</span> <span class="token string">"2"</span><span class="token punctuation">,</span>
    e<span class="token punctuation">:</span> <span class="token string">"3"</span><span class="token punctuation">,</span>
    f<span class="token punctuation">:</span> <span class="token punctuation">{</span>
      g<span class="token punctuation">:</span> <span class="token string">"4"</span><span class="token punctuation">,</span>
      h<span class="token punctuation">:</span> <span class="token string">"5"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  i<span class="token punctuation">:</span> <span class="token string">"6"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">serialize</span> <span class="token operator">=</span> obj <span class="token operator">=></span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>key <span class="token operator">=></span>
    <span class="token keyword">typeof</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">"object"</span> <span class="token operator">?</span> <span class="token function">serialize</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>If we test this function, we'll see it returns an array, and depending on the level of nesting, internal arrays as values. To make sure we always have a one-level array, our goal now is to flatten it.</p>
<p>To do so, we'll use the example from a previous post <a href="/flattening-arbitrarily-nested-arrays">Flattening Arbitrarily Nested Arrays</a> to recursively flatten the array until the remaining value is not an array.</p>
<div class="gatsby-highlight">
      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> <span class="token function-variable function">flatten</span> <span class="token operator">=</span> arr <span class="token operator">=></span>
  arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>acc<span class="token punctuation">,</span> curr<span class="token punctuation">)</span> <span class="token operator">=></span>
    acc<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">flatten</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span> <span class="token punctuation">:</span> curr<span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>There you go. The flatten function simply verifies if the <code class="language-text">curr</code> value is an array or not. If it is, it will flatten it again by checking if its items are also arrays or not. That will be done until only simple values are returned. When that happens, <code class="language-text">curr</code> will be appended to the original accumulator (identified by the <code class="language-text">acc</code> parameter).</p>
<div class="gatsby-highlight">
      <pre class="language-javascript"><code class="language-javascript">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">flatten</span><span class="token punctuation">(</span><span class="token function">serialize</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1, 2, 3, 4, 5, 6]</span></code></pre>
      </div>
<h3>Composition</h3>
<p>The initial challenge is solved. Now, to make this look better, why not use functional compositional to achieve a clearer, more beautiful execution order?</p>
<p>Composition is about putting together small simple functions to achieve a more complex functionality while still maintaing readability. Remember the DOT and KISS principles, respectively <strong>"DO ONE THING"</strong> and <strong>"KEEP IT SIMPLE, STUPID"</strong>.</p>
<p>Instead of writing one function that does everything, we write multiple functions that are really good at doing one thing only, and compose them together like lego bricks, into higher functionality.</p>
<p>To achieve this, we'll create a composer function that, from an initial value will apply multiple functions in order:</p>
<div class="gatsby-highlight">
      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> <span class="token function-variable function">composer</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> funcs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>slice<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> funcs<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>acc<span class="token punctuation">,</span> curr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">curr</span><span class="token punctuation">(</span>acc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// es6 version</span>
<span class="token keyword">const</span> <span class="token function-variable function">composer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">=></span> funcs<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>acc<span class="token punctuation">,</span> curr<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">curr</span><span class="token punctuation">(</span>acc<span class="token punctuation">)</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>Then, we compose these two functions together and use the composer anytime we wish to do this same operation:</p>
<div class="gatsby-highlight">
      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> objectFlattener <span class="token operator">=</span> <span class="token function">composer</span><span class="token punctuation">(</span>serialize<span class="token punctuation">,</span> flatten<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">objectFlattener</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1, 2, 3, 4, 5, 6]</span></code></pre>
      </div>
