---
title: "Design Patterns: Render Props"
pubDate: "2018-02-28"
heroImage: ""
---

<p>Render props is a pattern that allows us to <strong>delegate rendering away from the component implementation itself</strong>, meaning it will do something under the curtains and simply expose the results in the form of parameters to child components</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">MyCounter</span> <span class="token operator">...</span> <span class="token punctuation">{</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span> counter<span class="token punctuation">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  onClick <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span>counter<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> counter<span class="token punctuation">:</span> counter <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator"><</span>div<span class="token operator">></span>
      <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>counter<span class="token punctuation">}</span>
    <span class="token operator"><</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
      </div>
<p>We have a good logic encapsulated within MyCounter, but we have little flexibility in how to use that logic. The state will always render the same thing. What if we provide more flexibility by just exposing logic out of the component, <strong>without caring</strong> on how this is effectively rendering?</p>
<p>To do so, we take in a props called render that's a function and have arguments provided to it:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">MyCounter</span> <span class="token operator">...</span> <span class="token punctuation">{</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span> counter<span class="token punctuation">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  onClick <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span>counter<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> counter<span class="token punctuation">:</span> counter <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    counter<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>counter<span class="token punctuation">,</span>
    onClick<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>onClick
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
      </div>
<p>This makes sure our parent component logic and the rendering is decoupled. The function implementation of this component is the one deciding how the passed in props will evaluate to JSX, so we can put a given functionality, like a counter for example, but instead of tiying it to a specific child component, we leave it open to any others.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">ConsumerComp</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token operator"><</span>MyCounter
    render<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">{</span> counter<span class="token punctuation">,</span> onClick <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
      <span class="token operator"><</span>div className<span class="token operator">=</span><span class="token string">"consumer-comp"</span><span class="token operator">></span>
        <span class="token punctuation">{</span>counter<span class="token punctuation">}</span>
       <span class="token operator"><</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>onClick<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator"><</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token punctuation">)</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
