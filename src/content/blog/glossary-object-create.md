---
title: "Glossary: Object Create"
pubDate: "2019-02-03"
heroImage: ""
---

<p><code class="language-text">Object.create</code> is a method that takes one object as the first parameter and makes it the delegate for the newly created object instances.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> someReferenceObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">"Ragnar Lothbrok"</span><span class="token punctuation">,</span>
  skills<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    powerAttack<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"For oodiiin!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// each viking lives with the spirit of Ragnar</span>
<span class="token keyword">const</span> viking <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>someReferenceObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>viking<span class="token punctuation">.</span>skills<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Object { powerAttack: f }</span></code></pre>
      </div>
<p>When you use a constructor function with the <code class="language-text">new</code> keyword, the object referenced by the constructor's prototype property gets set as the delegate for the objects that get created after.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Cat<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">attack</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"meowow?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> instanceCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
instanceCat<span class="token punctuation">.</span><span class="token function">attack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// meowow?</span></code></pre>
      </div>
<p>So this means we can replicate <code class="language-text">Object.create</code> by having a function that accepts an object, creates a new constructor, attributes the provided object as prototype of the newly created constructor, creates and returns an instance:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js">Object<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">create</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>protoReference<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">Any</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  Any<span class="token punctuation">.</span>prototype <span class="token operator">=</span> protoReference<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<p><strong>Important</strong>: changing properties on the instance should not reflect in changes on the prototype, or other instances that use it.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> peopleProto <span class="token operator">=</span> <span class="token punctuation">{</span>
  someName<span class="token punctuation">:</span> <span class="token string">"eric"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> person <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>peopleProto<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> person2 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>peopleProto<span class="token punctuation">)</span><span class="token punctuation">;</span>

person<span class="token punctuation">.</span>someName <span class="token operator">=</span> <span class="token string">"joanne"</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"1: "</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span>someName<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// joanne</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"2: "</span><span class="token punctuation">,</span> person2<span class="token punctuation">.</span>someName<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// eric</span></code></pre>
      </div>
<p>Here's something tricky! If you change an object or array inside prototype directly, that will cause unexpected errors:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> anotherProto <span class="token operator">=</span> <span class="token punctuation">{</span>
  skills<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    thunderStrike<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"you just got thunder STRUCK!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    meta<span class="token punctuation">:</span> <span class="token string">"skill name: thunder strike"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// creating two instances</span>
<span class="token keyword">const</span> alex <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>anotherProto<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> jack <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>anotherProto<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// changing an object property directly</span>
alex<span class="token punctuation">.</span>skills<span class="token punctuation">.</span><span class="token function-variable function">thunderStrike</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"you just got COMPLIMENTED"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// seeing if it impacted jack</span>
jack<span class="token punctuation">.</span>skills<span class="token punctuation">.</span><span class="token function">thunderStrike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// you just got COMPLIMENTED</span></code></pre>
      </div>
<p><em>Thanks to Alex, Jack is no longer the aggressive warrior he once was and now distributes compliments around.</em></p>
<p>The solution is to reassign the entire object:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> alex <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>anotherProto<span class="token punctuation">)</span><span class="token punctuation">;</span>
alex<span class="token punctuation">.</span>skills <span class="token operator">=</span> <span class="token punctuation">{</span>
  thunderStrike<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">/* */</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

jack<span class="token punctuation">.</span>skills<span class="token punctuation">.</span><span class="token function">thunderStrike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// you just got thunder STRUCK!</span></code></pre>
      </div>
<p>Refer to <a href="/glossary-prototypes">this post</a> for more info on JS prototypes.</p>
