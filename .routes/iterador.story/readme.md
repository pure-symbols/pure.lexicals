It's called `Iterator` at the first, but this name has already occupied by another thing, so I just translate this word to Spanish, called `Iterador`.  
\________  
它一开始是叫 `Iterator` 的，但这名字被占了，所以我搜来搜去，最后给它定了个西班牙语的名字 `Iterador` 。

Why I make it ? Because I want to know how to implement such structure from almost zero, and I've had enough on the mutable `iterator.next()` things.  
\________  
我整这个干啥呢，特别是既然已经有相应的功能已被语言提供了？一方面我想对这种结构的实现有一个自己的尽可能完全的理解，另一方面是我受够了类似于 `iterator.next()` 这样用的这种可变数据类型。它并不好用，还会产生令人难以理解的标志并不明确的行为。

This is also a test, a test for my envision, so I also can't stop to trying a make up for it. And, I successed.  
\________  
这也是个验证，因为我有个设想，对于这种数据结构。所以我有这个瘾头去搞它，然后，我也搞出来了，至少，初步地（至少最开始在 TS 上）。

Then I knew, a *lazy-infinited sequence* is just a special *pair*. That's **all**, we just need a structure and a function that can play with it, that's all, no complex or mysterious things !!  
\________  
所以，我就（无比确信地）知道了：一个所谓的 *惰性无限序列* ，它就只是一个 *Pair* 罢了！没什么神秘的，也一点都不复杂。**一个当前值，一个能让我取得下一个 *Pair* 的词法闭包，仅此而已。**

And I can also use such much clear things, to avoid the chaos from the mutable things.  
\________  
然后呢？也只需要一个能与它一起玩的函数就行了，不需要是难搞的动态函数，（普通的）纯的静态函数即可。然后呢？有了它，我也可以不用再去管那些难搞的基于可变数据模型设计出来的东西，我能用我简洁明了的东西就做到一切。就是这样。

--- Therefore, this is also a prove for that there is some *man-made difficult*, might be.  
\________  
—— 也因此，这同时也是对于一种 *人造难度* 的此在性的证明。或许。

I also like the *Pair*. I meet such thing at Erlang first, and it touch me, then I found that both all good design did like such way, but my java teacher who didn't know such things won't told me anyting about them -- at this time we students are forced to accept it without reflection.  
\________  
而且我也很喜欢 Pair 。一开始认识这种东西来自 Erlang ，那时我就被它的简洁明了感动了，后来才发现一切的聪明设计都这样做，而更早时候教我 Java 的老师却不知为何根本说不出个为何要用对子结构的所以然来 —— 那时候我们学生只能被迫不加反思地接受。

Later on, I learnt about the theory of ideology, and I was inspired by an amine called *"DURARARA!"* . I was fascinated by the pair of names `head` and `tail`. It fits in with a revelation of the truth about ideology: simply put, an ideology makes itself your *head* by making you feel that it is not an ideology.  
\________  
后来，我了解到意识形态相关的理论，又由 《DURARARA !!》 引发了自己的一些体验，就迷上了 `head` `tail` 这样一对名字的设计。它符合对于意识形态真相的一种揭示：简单说，一个意识形态通过让你觉得它不是一个意识形态来让它自己成为你的 *头* 。

... And, according to the dialectical understanding of the “true self”, unlike the self-deceiving interpretation of silly little Bourgeois, “one's true self” is not “the person who removes the mask”, but precisely the mask itself: the mask is still a mask when you take it off, but the one that can't be taken off in any case is the real you.  
\________  
…… 以及，根据辩证法对“本真自我”的理解，不同于愚蠢的小布尔乔亚的自欺欺人式解读，“一个人他真实的自己”并非是“取下面具后的这个人”，而恰恰就是那个面具本身：取下面具后还是面具，而那个无论如何都取不下来的就是真正的你自己了。

“The essence is the appearance of the appearance.” As in the case of a growing plant: the young shoots that constantly revolutionise the boundaries of the whole are the ones that really mediate (in scarcity) the essence of a plant. The trunk? That's just the trail it walks through and leaves behind. The seed does not lie in the root or the trunk, but in the growing point at the border of all the minutiae, which is the seed's true subsequent existence.  
\________  
“本质是表象的表象”。正如生长着的植物那样：不断革新整体之边界的幼芽部位，才是真正（在匮乏中）中介出一株植物之本相来的那样一个位置。树干？那只是它走过然后留下的痕迹罢了。种子不在于根部或者干部，而是一切细枝末节边界处的生长点上，这才是种子其真正的后继之存在。

And, well ... the `head` also means *wert* here, which means the *meanings*, the *valusble*, and so on. And the `tail` here also means *mehr* here, which means the *surplus*, the *more*, or *some thing that always appear out of the rule after all things been ruled*.  
\________  
以及 …… 此处的 `head` 即同样地意味着 *wert* ，即 *意义*、*价值* 等等。而这里的 `tail` 即同样地意味着 *mehr* ，即 *剩余*、*多出的* ，或者说 *在掌握一切后也总仍要再多出来那个不被掌握的* 。

This is, precisely, **isomorphic** to the data structure I need, now. So, what a usefully for the psychoanalysis and philosophy are !  
\________  
这，恰恰与我需要的数据结构，是**同构**的了。精神分析和哲学真有用。

