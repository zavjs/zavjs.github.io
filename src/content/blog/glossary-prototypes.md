---
title: "Glossary: JS prototypes"
pubDate: "2019-02-03"
heroImage: ""
---

<p>A prototype is an object used to model other objects. It's similar to a class in the sense it allows for the creation of any number of object instances, but with the exception that a prototype is an object itself.</p>
<h3>Delegation, not Inheritance</h3>
<p>Different from the classical model, we don't inherit from prototypes as we would with classes. Instead, we delegate from these objects to the ones after.</p>
<h3>The Chain</h3>
<p>When using prototype objects to create new ones, the methods are not replicated in the instance object. Instead, they're referenced. Each instance has a link pointing to the prototype (original object) so when we execute one object's method, JavaScript first tries to see if it finds in the instance, going up the chain until it finds if it doesn't.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">SuperAnimal</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
SuperAnimal<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"some super animal"</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token keyword">extends</span> <span class="token class-name">SuperAnimal</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Animal<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"some regular animal"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> rabbit <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
rabbit<span class="token punctuation">.</span>name<span class="token punctuation">;</span> <span class="token comment">// 'some regular animal'</span>

<span class="token comment">// keep in mind the `class` syntax in JS is just a syntactic sugar over the es5 prototype model</span></code></pre>
      </div>
<p><code class="language-text">rabbit.name</code> will evaluate to <code class="language-text">some regular animal</code> because the next object in the chain is Animal. If we comment the <code class="language-text">Animal.prototype.name</code> assignment, <code class="language-text">rabbit.name</code> would then be "some super animal"</p>
<p><strong>Keywords:</strong> Object delegation, Prototype chain, Definitely not like old school classes</p>
