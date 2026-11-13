---
title: "Understading Automated Toolkits"
pubDate: "2018-01-10"
heroImage: ""
---

<p>If you're familiar with toolkits that aim automating repetitive tasks, like compressing css, or ugliflying js files (like Gulp), you might be wondering how does that work. Today, we'll understand these toolkits a little more, while creating a rudimentary copy of one of these tools, that aim to replicate similar functionalities.</p>
<p>This post aims to demonstrate a few Node modules, and a few development patterns that would help us replicate similar functionalities as that of Gulp, for example. It's not intended for actual use or to be taken other than a learning resource.</p>
<h2>Use Case</h2>
<p>The way I like to address challenges/issues is by using real world use cases as guiding parameters. For that purpose, I randomly choose "Droll" to be my module's name, and there are a handful of things I wish Droll would do:</p>
<ul>
<li>Creating tasks that would allow users to encapsulate functionality and execute it when we they see fit</li>
<li>Watch for changes in directories or files as a way to execute functionality when it happens</li>
<li>Target and allocate files/file contents into a temporary place that would allow users to modify it, without changing the original copy</li>
<li>Enable users the ability to modify these temporary files by applying functions and composing functionality</li>
<li>The ability to create end files based on composed functionality of temporary data</li>
</ul>
<p>For example, let's assume a simple task that involves watching for changes on a given directory or file, applying changes to a temporary copy of that file, and creating a new file with the modified contents.</p>
<p>More specifically, a very common development task: having CSS files compressed into a new file. Let's assume two folders, one named <code class="language-text">src</code>, and another named <code class="language-text">dist</code>. <code class="language-text">src</code> will contain the intact original css file whereas <code class="language-text">dist</code> will hold the newly created minified version:</p>
<div class="gatsby-highlight">
      <pre class="language-text"><code class="language-text">project
|   droll.js (library)
│   drollfile.js (implementation)
│
└───src
│   │   styles.css
│
└───dist
    │   styles.min.css</code></pre>
      </div>
<p>-</p>
<p>The following would be how I want things to work:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">//drollfile.js</span>
<span class="token keyword">const</span> droll <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"droll"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//create a droll task of name 'watch:css'</span>
<span class="token comment">//assign the task a function to be executed whenever we decide to run it</span>
droll<span class="token punctuation">.</span><span class="token function">task</span><span class="token punctuation">(</span><span class="token string">"watch:css"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">//watch for changes on a specific file</span>
  droll<span class="token punctuation">.</span><span class="token function">watch</span><span class="token punctuation">(</span><span class="token string">"./src/styles.css"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">//get file contents</span>
    droll
      <span class="token punctuation">.</span><span class="token function">src</span><span class="token punctuation">(</span><span class="token string">"./src/styles.css"</span><span class="token punctuation">)</span>
      <span class="token comment">//provide functions to modify the temporary data, composing if needed</span>
      <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>doSomething<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>doSomethingElse<span class="token punctuation">)</span>
      <span class="token comment">//create a final file with the modified content</span>
      <span class="token punctuation">.</span><span class="token function">dist</span><span class="token punctuation">(</span><span class="token string">"./dist/styles.min.css"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//arbitrarily deciding to run the task</span>
<span class="token comment">//for now a javascript line, which later</span>
<span class="token comment">//can be replaced for a command line like `droll watch:css`, for example</span>
droll<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">"watch:css"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>-</p>
<h2>The Node.js File System Module</h2>
<p>The main star for tonight has to be Node's File System Module, as it contains all of the file managing functionalities we need to create Droll.</p>
<p>See, whenever we wish to read from a file (<code class="language-text">./src/styles.css</code>, for example), we should use <code class="language-text">fs.readFile</code>, or even <code class="language-text">fs.readFileSync</code>. To write, we use <code class="language-text">fs.writeFile</code>, or <code class="language-text">fs.writeFileSync</code>. The difference between each of the items in both pairs is asynchronicity - that is, whether you want to block runtime while attempting to read the file or not.</p>
<p>Since we don't expect the user (or any other users for that matter) to be doing concurrent operations (like it would happen if we were to create a Node.js Web server, for example), we will <strong>explicitly</strong> and <strong>intentionally</strong> be using the synchronous versions of these methods.</p>
<p>Keep in mind however, that using synchronous methods is not recomended when you're expected to serve responsive applications in which the main thread is expected to be shared by multiple concurrent operations. You don't want user A to be blocked waiting for user's B long synchronous operation to finish executing.</p>
<p>See the module example below:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span><span class="token string">"myfile.txt"</span><span class="token punctuation">,</span> <span class="token string">"utf-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//file contents</span>
fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span><span class="token string">"mynewfile.txt"</span><span class="token punctuation">,</span> <span class="token string">"my new file is aweseom"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//file written</span></code></pre>
      </div>
<p>-</p>
<p>Additionally, the FS module has another very important method called 'watch'. Watch will, ehrm, well... <em>watch</em> a given directory or filename and enable users the ability to execute functionality when that file is changed.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js">fs<span class="token punctuation">.</span><span class="token function">watch</span><span class="token punctuation">(</span><span class="token string">"myfile.txt"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>eventType<span class="token punctuation">,</span> filename<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>eventType<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'rename', if file created or deleted</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>eventType<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'change', if file changed</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>-</p>
<h2>The Fluent Pattern</h2>
<p>Another key feature for our library is the ability to chain methods together for a more fluid architecture. This pattern is seen in many JavaScript libraries like jQuery, for example:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">// jQuery prefers this:</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">".special-div"</span><span class="token punctuation">)</span>
  <span class="token comment">//assign the color blue to special div</span>
  <span class="token punctuation">.</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token string">"color"</span><span class="token punctuation">,</span> <span class="token string">"blue"</span><span class="token punctuation">)</span>
  <span class="token comment">//target special-div's immediate parent</span>
  <span class="token punctuation">.</span><span class="token function">parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">//hide it</span>
  <span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// instead of this:</span>
<span class="token keyword">var</span> div <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">".special-div"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token string">"color"</span><span class="token punctuation">,</span> <span class="token string">"blue"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> parent <span class="token operator">=</span> div<span class="token punctuation">.</span><span class="token function">parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
parent<span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>-</p>
<p>It's important to notice however that, when we execute any given object's method, that object doesn't return itself. It returns whatever the method should be returning:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  abc<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token number">1</span><span class="token punctuation">;</span>
  def<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/* not going to working, as it's going to try to execute the def method
for the value 1 (which doesn't exist), instead of the object itself. */</span>
obj<span class="token punctuation">.</span><span class="token function">abc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">def</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>-</p>
<p>The way to make Droll provide the ability to chain its methods is simple: we should return the Droll's context upon every method execution.</p>
<p>A little earlier we have already defined a few desired methods for our library, so let's sketch them here. Also, taking in consideration the aforementioned use case, note that the only methods chaining together are <code class="language-text">src</code>, and <code class="language-text">pipe</code>, so we'll go with that for now.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">//node module, module.exports automatically exports the desired object</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  task<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  watch<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  src<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">//1. does something</span>
    <span class="token comment">//...</span>

    <span class="token comment">//2. return itself</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  pipe<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">//1. does something</span>
    <span class="token comment">//...</span>

    <span class="token comment">//2. return itself</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  dist<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  execute<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>-</p>
<h3>Task</h3>
<p>In order for us to control when a specific functionality will be executed, we should hold that functionality encapsulated while naming it for later reference. We'll just create an internal property within Droll to associate a given task name to a given function:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  _tasks<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  task<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>taskname<span class="token punctuation">,</span> cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//this._tasks['watch:js']</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_tasks<span class="token punctuation">[</span>taskname<span class="token punctuation">]</span> <span class="token operator">=</span> cb<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>-</p>
<h3>Execute</h3>
<p>We must specify a method to explicitly execute a given task when desired. It's simple, let's just receive a name, and go inside the internal <code class="language-text">_tasks</code> property to execute the associated function:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  _tasks<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  execute<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>taskName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_tasks<span class="token punctuation">[</span>taskName<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  task<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* collapsed */</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>-</p>
<p>So, for example, we can specify when a task will be executed like this:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">// this is just a simple registering</span>
droll<span class="token punctuation">.</span><span class="token function">task</span><span class="token punctuation">(</span><span class="token string">"mytask"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">anon</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"when executed, please log this"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// here is where the 'anon' function will be executed effectively</span>
droll<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">"mytask"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>-</p>
<h3>Watch</h3>
<p>To watch for a specific file or directory, let's make our Droll's <code class="language-text">watch</code> method receive a path to be watched as the first parameter, and also a callback function to be executed when changes happen, as a second parameter. Let's use Node's File System module to handle the dirty work:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  _tasks<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  execute<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/**/</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  task<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/**/</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  watch<span class="token punctuation">:</span> <span class="token punctuation">(</span>path<span class="token punctuation">,</span> cb<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    fs<span class="token punctuation">.</span><span class="token function">watch</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> eventType <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>eventType <span class="token operator">===</span> <span class="token string">"change"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">cb</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>-</p>
<h3>Source</h3>
<p>The source method is ideal for getting file contents. With it, we'll specify a file and get it's contents with <code class="language-text">fs.readFileSync</code>. We'll create a property inside Droll to hold the file contents:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  _curVal<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  _tasks<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  execute<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/**/</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  task<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/**/</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  watch<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/**/</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  src<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_curVal <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>Since we're not specifying encoding, Node.js will create a Buffer object and assign it to the <code class="language-text">_curVal</code> property.</p>
<h3>Pipe</h3>
<p>Pipe is a good way to compose functionality. Since we're trying to minify a css file, let's agree that <code class="language-text">pipe</code> should accept a function, and execute that function over the temporary value allocated inside Droll's object. We'll mutate the previously created value to become something new:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  _tasks<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  _curVal<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  execute<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/**/</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  task<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/**/</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  watch<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/**/</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  pipe<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_curVal <span class="token operator">=</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_curVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>Since <code class="language-text">_curVal</code> is being stored as a Buffer object, our goal is to apply the function to a stringified version of that Buffer, and not the Buffer instance itself. After applying mutations, we'll transform it back to a Buffer object with <code class="language-text">Buffer.from()</code>.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token punctuation">{</span>
  pipe<span class="token punctuation">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>func<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_curVal <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token keyword">from</span><span class="token punctuation">(</span><span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_curVal<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
      </div>
<p>-</p>
<h3>Dist</h3>
<p>Dist will simply create a file with the previously set temporary values inside of it. The dist function will only receive one argument, the file name. The file content will be automatically inferred from Droll's property.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token punctuation">{</span>
  dist<span class="token punctuation">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>filename<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_curVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
      </div>
<p>-</p>
<h2>Final Product</h2>
<p>The final product will look like this:</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token comment">//droll.js</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  _tasks<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  _curVal<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  src<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_curVal <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  dist<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_curVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  task<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>taskName<span class="token punctuation">,</span> cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_tasks<span class="token punctuation">[</span>taskName<span class="token punctuation">]</span> <span class="token operator">=</span> cb<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  execute<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>taskName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_tasks<span class="token punctuation">[</span>taskName<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  pipe<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_curVal <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token keyword">from</span><span class="token punctuation">(</span><span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_curVal<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  watch<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>location<span class="token punctuation">,</span> cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fs<span class="token punctuation">.</span><span class="token function">watch</span><span class="token punctuation">(</span>location<span class="token punctuation">,</span> <span class="token punctuation">(</span>eventType<span class="token punctuation">,</span> filename<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>eventType <span class="token operator">===</span> <span class="token string">"change"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">cb</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>-</p>
<p>The intended functionality designed at the beginning should work properly, now.
For educational purposes let's use an actual function inside the pipe method, that would simulate minifying a css file.</p>
<div class="gatsby-highlight">
      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> droll <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"./droll"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// use path module to specify the appropriate file location</span>
<span class="token keyword">const</span> <span class="token function-variable function">toPath</span> <span class="token operator">=</span> filepath <span class="token operator">=></span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> filepath<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// simply remove spaces to simulate minifying</span>
<span class="token keyword">const</span> <span class="token function-variable function">minify</span> <span class="token operator">=</span> content <span class="token operator">=></span> content<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex">/\s/g</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

droll<span class="token punctuation">.</span><span class="token function">task</span><span class="token punctuation">(</span><span class="token string">"watch:css"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  droll<span class="token punctuation">.</span><span class="token function">watch</span><span class="token punctuation">(</span><span class="token function">toPath</span><span class="token punctuation">(</span><span class="token string">"./src/styles.css"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    droll
      <span class="token punctuation">.</span><span class="token function">src</span><span class="token punctuation">(</span><span class="token function">toPath</span><span class="token punctuation">(</span><span class="token string">"./src/styles.css"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>minify<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">dist</span><span class="token punctuation">(</span><span class="token function">toPath</span><span class="token punctuation">(</span><span class="token string">"./dist/styles.min.css"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
      </div>
<p>The final minified css file will be created inside the destination folder. Be sure to test with an actual uncompressed css file and see it being converted into minified css.</p>
<h2>Improvements</h2>
<p>This toolkit can be improved in a variety of ways, for example:</p>
<ul>
<li>Targeting multiple files, instead of only one, by providing an array of files, instead of a string</li>
<li>Targeting files by extension, by providing wildcard values such as 'src/*<em>/</em>.js', in case we wish to target all js or css files inside a given folder</li>
</ul>
<p>Checkout the <a href="https://github.com/zavjs/drolljs">github repository</a>.</p>
