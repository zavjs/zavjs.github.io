---
title: "Generating an SSH key"
pubDate: "2019-02-03"
heroImage: ""
description: "Passwords tend to be weak and predictable. People pick what's easy to remember, so passwords like 123456 and mickeymouse123 are everywhere."
---

Passwords tend to be weak and predictable. People pick what's easy to remember, so passwords like `123456` and `mickeymouse123` are everywhere. Worse, many people reuse one password across several sites. When one site's database leaks, attackers can use the stolen passwords to break into the same users' accounts on other sites.

### SSH

SSH solves this with public-key cryptography. We generate a matching pair of keys: a public key and a private key. We put the public key on the server, and every login has to prove it holds the matching private key.

No solution is perfect, and SSH brings risks of its own. Anyone who gets hold of the private key on your computer can get into your server. That's a topic for another post.

### Generate the keys somewhere safe

Here, "safe" means "hard to lose." If we set up key-based login and turn off password login, losing the private key locks us out of our own server.

In a terminal, go to the `~/.ssh` folder:

```bash
cd ~/.ssh
```

Then run:

```bash
ssh-keygen -t rsa
```

The `-t rsa` flag sets RSA as the key type.

`ssh-keygen` asks a few questions, starting with a name for the key file. Don't accept the default: you may already have a key with that name for other tools, so give it a new one.
