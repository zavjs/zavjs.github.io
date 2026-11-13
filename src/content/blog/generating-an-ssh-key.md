---
title: "Generating an SSH key"
pubDate: "2019-02-03"
heroImage: ""
---

<p>Passwords tend to be weak and predictable. That's because humans are lazy and end up choosing common passwords like <code class="language-text">123456</code> or <code class="language-text">mickeymouse123</code>. Furthermore, it's common for an user to use the same password in multiple different places. That creates problems. For instance, security breaches in one place, like a database, can generate breaches in several others as well.</p>
<h3>SSH</h3>
<p>SSH provides a solution to that, because of its cryptographic mechanism. We generate two counterparts: a public key and hash. The public key is specifically created to match that one hash. We place the public key in the server, and any attempts to connect necessarily require the hash.</p>
<p>Since nothing is perfect, SSH also introduces its own kinds of risks, like the fact that having the hash sitting in your computer means that anyone with access to it will have access to your server. That is topic for later discussions.</p>
<h4>Generate SSH files in a "safe" place</h4>
<p>The concept of safe here is intended to mean "not easily loseable". This is important because since we're talking of server access, if we configure SSH login and disable password access, that necessarily means if we lose the hash file, <em>we'll be locked out of our server</em>.</p>
<p>So, with the command line go to the <code class="language-text">~/.ssh</code> folder:</p>
<p><code class="language-text">cd ~/.ssh</code></p>
<p>Then run <code class="language-text">ssh-keygen -t rsa</code> (-t rsa indicates rsa as encryption type)</p>
<p>The prompt will show a series of questions like which name you want to give to your key. <strong>Important</strong> in the naming step, make sure not to use the default value, because it's likely you already have such file created for other applications in your system. So just provide another name.</p>
