webpackJsonp([0x9f677518baa8],{381:function(n,s){n.exports={pathContext:{posts:[{html:'<p>A prototype is an object used to model other objects. It\'s similar to a class in the sense it allows for the creation of any number of object instances, but with the exception that a prototype is an object itself.</p>\n<h3>Delegation, not Inheritance</h3>\n<p>Different from the classical model, we don\'t inherit from prototypes as we would with classes. Instead, we delegate from these objects to the ones after.</p>\n<h3>The Chain</h3>\n<p>When using prototype objects to create new ones, the methods are not replicated in the instance object. Instead, they\'re referenced. Each instance has a link pointing to the prototype (original object) so when we execute one object\'s method, JavaScript first tries to see if it finds in the instance, going up the chain until it finds if it doesn\'t.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">SuperAnimal</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\nSuperAnimal<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"some super animal"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token keyword">extends</span> <span class="token class-name">SuperAnimal</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\nAnimal<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"some regular animal"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> rabbit <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nrabbit<span class="token punctuation">.</span>name<span class="token punctuation">;</span> <span class="token comment">// \'some regular animal\'</span>\n\n<span class="token comment">// keep in mind the `class` syntax in JS is just a syntactic sugar over the es5 prototype model</span></code></pre>\n      </div>\n<p><code class="language-text">rabbit.name</code> will evaluate to <code class="language-text">some regular animal</code> because the next object in the chain is Animal. If we comment the <code class="language-text">Animal.prototype.name</code> assignment, <code class="language-text">rabbit.name</code> would then be "some super animal"</p>\n<p><strong>Keywords:</strong> Object delegation, Prototype chain, Definitely not like old school classes</p>',id:"/Users/zavareze/projects/zavjsblog/src/pages/2018-02-03-glossary-prototypes/index.md absPath of file >>> MarkdownRemark",frontmatter:{date:"Su, 02/19",path:"/glossary-prototypes",title:"Glossary: JS prototypes",excerpt:"",tags:["prototypes","javascript","glossary"]}},{html:'<p><code class="language-text">Object.create</code> is a method that takes one object as the first parameter and makes it the delegate for the newly created object instances.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> someReferenceObject <span class="token operator">=</span> <span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">"Ragnar Lothbrok"</span><span class="token punctuation">,</span>\n  skills<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    powerAttack<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"For oodiiin!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// each viking lives with the spirit of Ragnar</span>\n<span class="token keyword">const</span> viking <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>someReferenceObject<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>viking<span class="token punctuation">.</span>skills<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Object { powerAttack: f }</span></code></pre>\n      </div>\n<p>When you use a constructor function with the <code class="language-text">new</code> keyword, the object referenced by the constructor\'s prototype property gets set as the delegate for the objects that get created after.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\nCat<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">attack</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"meowow?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> instanceCat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ninstanceCat<span class="token punctuation">.</span><span class="token function">attack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// meowow?</span></code></pre>\n      </div>\n<p>So this means we can replicate <code class="language-text">Object.create</code> by having a function that accepts an object, creates a new constructor, attributes the provided object as prototype of the newly created constructor, creates and returns an instance:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">Object<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">create</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>protoReference<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">function</span> <span class="token function">Any</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n  Any<span class="token punctuation">.</span>prototype <span class="token operator">=</span> protoReference<span class="token punctuation">;</span>\n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><strong>Important</strong>: changing properties on the instance should not reflect in changes on the prototype, or other instances that use it.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> peopleProto <span class="token operator">=</span> <span class="token punctuation">{</span>\n  someName<span class="token punctuation">:</span> <span class="token string">"eric"</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> person <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>peopleProto<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> person2 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>peopleProto<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nperson<span class="token punctuation">.</span>someName <span class="token operator">=</span> <span class="token string">"joanne"</span><span class="token punctuation">;</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"1: "</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span>someName<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// joanne</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"2: "</span><span class="token punctuation">,</span> person2<span class="token punctuation">.</span>someName<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// eric</span></code></pre>\n      </div>\n<p>Here\'s something tricky! If you change an object or array inside prototype directly, that will cause unexpected errors:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> anotherProto <span class="token operator">=</span> <span class="token punctuation">{</span>\n  skills<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    thunderStrike<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"you just got thunder STRUCK!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    meta<span class="token punctuation">:</span> <span class="token string">"skill name: thunder strike"</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// creating two instances</span>\n<span class="token keyword">const</span> alex <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>anotherProto<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> jack <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>anotherProto<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// changing an object property directly</span>\nalex<span class="token punctuation">.</span>skills<span class="token punctuation">.</span><span class="token function-variable function">thunderStrike</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"you just got COMPLIMENTED"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// seeing if it impacted jack</span>\njack<span class="token punctuation">.</span>skills<span class="token punctuation">.</span><span class="token function">thunderStrike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// you just got COMPLIMENTED</span></code></pre>\n      </div>\n<p><em>Thanks to Alex, Jack is no longer the aggressive warrior he once was and now distributes compliments around.</em></p>\n<p>The solution is to reassign the entire object:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> alex <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>anotherProto<span class="token punctuation">)</span><span class="token punctuation">;</span>\nalex<span class="token punctuation">.</span>skills <span class="token operator">=</span> <span class="token punctuation">{</span>\n  thunderStrike<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">/* */</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\njack<span class="token punctuation">.</span>skills<span class="token punctuation">.</span><span class="token function">thunderStrike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// you just got thunder STRUCK!</span></code></pre>\n      </div>\n<p>Refer to <a href="/glossary-prototypes">this post</a> for more info on JS prototypes.</p>',id:"/Users/zavareze/projects/zavjsblog/src/pages/2019-02-03-glossary-object-create/index.md absPath of file >>> MarkdownRemark",frontmatter:{date:"Su, 02/19",path:"/glossary-object-create",title:"Glossary: Object Create",excerpt:"",tags:["prototypes","javascript","glossary"]}},{html:'<p>A container is a set of one or more applications isolated from the rest of a system. It\'s a mechanism originated from the necesity of sharing server resources like memory and CPU amongst different apps.</p>\n<p>The previously used model of Hypervisors, popularly known as virtual machines would require each application to have its own operational system, which is suboptimal as it incurs in monetary and operational costs such as licensing and hardware upgrades, as operational systems require the consumption of resources for its own sustaining.</p>\n<p>Instead, containers sit on top of and share the same operational system as all others in the machine.</p>\n<img style="max-width: 75%; margin: 0 auto; padding: 20px; display: block;" src="https://www.docker.com/sites/default/files/d8/2018-11/docker-containerized-and-vm-transparent-bg.png">',id:"/Users/zavareze/projects/zavjsblog/src/pages/2019-02-02-what-is-a-container/index.md absPath of file >>> MarkdownRemark",frontmatter:{date:"Sa, 02/19",path:"/what-is-a-container",title:"Glossary: Containers",excerpt:"",tags:["container","linux","glossary"]}}],tagName:"glossary"}}}});
//# sourceMappingURL=path---tags-glossary-cd9cf1928930dcef0d3f.js.map