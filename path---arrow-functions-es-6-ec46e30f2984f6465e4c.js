webpackJsonp([0xa8d60aa5df7f],{367:function(n,s){n.exports={data:{markdownRemark:{html:'<p><a href="/a-word-on-functions">This post</a> showed the different ways a function can be executed and the context implications of each. The keyword <code class="language-text">this</code> is source of a lot of confusion, even for seasoned developers. The arrow function showed up as a way to make our lives easier and is one of the most appreciated ES6 features.</p>\n<p>Shorter syntax:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">sum2</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> num <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// arrow counterpart</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">sum2</span> <span class="token operator">=</span> num <span class="token operator">=></span> num <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Notice we got rid of a few things: the function identifier, the return statement and in this particular case even the curly braces. Think of nested callbacks or even promises: no need for multiple repetitive function and return statements.</p>\n<p>Consistency in context with <code class="language-text">this</code>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">Animal<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">attack</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">"animal-key"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>key <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`/animals/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span> key <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><code class="language-text">this.id</code> will always be set to the caller\'s context (in this case the attack prototype function) and the arrow function cannot be coerced to treat it any differently (apply, bind).</p>',frontmatter:{title:"ES6 Arrow Functions",date:"February 03, 2019",path:"/arrow-functions-es6",tags:["javascript","es6"],excerpt:""}}},pathContext:{prev:{html:'<p>Passwords tend to be weak and predictable. That\'s because humans are lazy and end up choosing common passwords like <code class="language-text">123456</code> or <code class="language-text">mickeymouse123</code>. Furthermore, it\'s common for an user to use the same password in multiple different places. That creates problems. For instance, security breaches in one place, like a database, can generate breaches in several others as well.</p>\n<h3>SSH</h3>\n<p>SSH provides a solution to that, because of its cryptographic mechanism. We generate two counter-parts: a public key and hash. The public key is specifically created to match that one hash. We place the public key in the server, and any attempts to connect necessarily require the hash.</p>\n<p>Since nothing is perfect, SSH also introduces its own kinds of risks, like the fact that having the hash sitting in your computer means that anyone with access to it will have access to your server. That is topic for discussions in further topics.</p>\n<h4>Generate SSH files in a "safe" place</h4>\n<p>The concept of safe here is intended to mean "not easily loseable". This is important because since we\'re talking of server access, if we configure SSH login and disable password access, that necessarily means if we lose the hash file, <em>we\'ll be locked out of our server</em>.</p>\n<p>So, with the command line go to the <code class="language-text">~/.ssh</code> folder:</p>\n<p><code class="language-text">cd ~/.ssh</code></p>\n<p>Then run <code class="language-text">ssh-keygen -t rsa</code> (-t rsa indicates rsa as encryption type)</p>\n<p>The prompt will show a series of questions like which name you want to give to your key. <strong>Important</strong> in the naming step, make sure not to use the default value, because it\'s likely you already have such file created for other applications in your system. So just provide another name.</p>',id:"/Users/zavareze/projects/zavjsblog/src/pages/2019-02-03-generating-ssh-key/index.md absPath of file >>> MarkdownRemark",frontmatter:{date:"Su, 02/19",path:"/generating-an-ssh-key",title:"Generating an SSH key",excerpt:"Plain text password pose a series of security risks to server security. Using SSH is the best alternative to it. Let's learn how today",tags:["nginx","ssh"]}},next:null}}}});
//# sourceMappingURL=path---arrow-functions-es-6-ec46e30f2984f6465e4c.js.map