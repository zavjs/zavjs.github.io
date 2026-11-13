---
title: "Prototype and Clone"
pubDate: "2019-02-03"
heroImage: ""
---

<p>Sometimes you don't want to delegate from a prototype, like mentioned <a href="/glossary-object-create">here</a> and <a href="/glossary-prototypes">here</a>. Instead, you want to have all properties of the prototype copied into the new object. That can be done with <code class="language-text">Object.assign</code>.</p>
<p>Here's a possible implementation of such a behavior:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">copyFrom</span> <span class="token operator">=</span> ref <span class="token operator">=></span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>ref<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span>acc<span class="token punctuation">,</span> curr<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
      <span class="token punctuation">{</span>
        <span class="token operator">...</span>acc<span class="token punctuation">,</span>
        <span class="token punctuation">[</span>curr<span class="token punctuation">]</span><span class="token punctuation">:</span> ref<span class="token punctuation">[</span>curr<span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p><a href="https://repl.it/@zavareze/Objectextend-Assign-Cloning">Live Code on Repl.it</a></p>
<p>The difference between cloning and prototyping is that the latter is more memory efficient. So it's a good idea to use delegation for publicly shared methods, and cloning for properties in order to prevent shared state issues.</p>
<p><strong>Important</strong>: just as seen previously, object and array direct assingments are shared between instances whereas replacements are instance-specific:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> somePrototype <span class="token operator">=</span> <span class="token punctuation">{</span> skills<span class="token punctuation">:</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">"ray"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> inst1 <span class="token operator">=</span> <span class="token function">copyFrom</span><span class="token punctuation">(</span>somePrototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> inst2 <span class="token operator">=</span> <span class="token function">copyFrom</span><span class="token punctuation">(</span>somePrototype<span class="token punctuation">)</span><span class="token punctuation">;</span>

inst1<span class="token punctuation">.</span>skills<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"thunder"</span><span class="token punctuation">;</span>

<span class="token comment">// did it affect 'inst2'?</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>inst2<span class="token punctuation">.</span>skills<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'thunder' Yes, it did</span></code></pre>
      </div>
