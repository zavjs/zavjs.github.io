---
title: "ES6 Arrow Functions"
pubDate: "2019-02-03"
heroImage: ""
---

<p><a href="/a-word-on-functions">This post</a> showed the different ways a function can be executed and the context implications of each. The keyword <code class="language-text">this</code> is source of a lot of confusion, even for seasoned developers. The arrow function showed up as a way to make our lives easier and is one of the most appreciated ES6 features.</p>
<p>Shorter syntax:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">sum2</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> num <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// arrow counterpart</span>

<span class="token keyword">const</span> <span class="token function-variable function">sum2</span> <span class="token operator">=</span> num <span class="token operator">=></span> num <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>Notice we got rid of a few things: the function identifier, the return statement and in this particular case even the curly braces. Think of nested callbacks or even promises: no need for multiple repetitive function and return statements.</p>
<p>Consistency in context with <code class="language-text">this</code>:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js">Animal<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">attack</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">"animal-key"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>key <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`/animals/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span> key <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<p><code class="language-text">this.id</code> will always be set to the caller's context (in this case the attack prototype function) and the arrow function cannot be coerced to treat it any differently (apply, bind).</p>
