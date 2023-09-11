It's called `Iterator` at the first, but this name has already occupied by another thing, so I just translate this word to Spanish, called `Iterador`.

Why I make it ? Because I want to know how to implement such structure from almost zero, and I've had enough on the mutable `iterator.next()` things.

This is also a test, a test for my envision, so I also can't stop to trying a make up for it. And, I successed.

Then I knew, a *lazy-infinited sequence* is just a special *pair*. That's **all**, we just need a structure and a function that can play with it, that's all, no complex or mysterious things !!

And I can also use such much clear things, to avoid the chaos from the mutable things.

> > > > ----

它一开始是叫 `Iterator` 的，但这名字被占了，所以我搜来搜去，最后给它定了个西班牙语的名字 `Iterador` 。

我整这个干啥呢，特别是既然已经有相应的功能已被语言提供了？一方面我想对这种结构的实现有一个自己的尽可能完全的理解，另一方面是我受够了类似于 `iterator.next()` 这样用的这种可变数据类型。它并不好用，还会产生令人难以理解的标志并不明确的行为。

这也是个验证，因为我有个设想，对于这种数据结构。所以我有这个瘾头去搞它，然后，我也搞出来了，至少，初步地（至少最开始在 TS 上）。

所以，我就（无比确信地）知道了：一个所谓的 *惰性无限序列* ，它就只是一个 *Pair* 罢了！没什么神秘的，也一点都不复杂。**一个当前值，一个能让我取得下一个 *Pair* 的词法闭包，仅此而已。**

然后呢？也只需要一个能与它一起玩的函数就行了，不需要是难搞的动态函数，（普通的）纯的静态函数即可。然后呢？有了它，我也可以不用再去管那些难搞的基于可变数据模型设计出来的东西，我能用我简洁明了的东西就做到一切。就是这样。

—— 也因此，这同时也是对于一种 *人造难度* 的此在性的证明。或许。

而且我也很喜欢 Pair 。一开始认识这种东西来自 Erlang ，那时我就被它的简洁明了感动了，后来才发现一切的聪明设计都这样做，而更早时候教我 Java 的老师却不知为何根本说不出个为何要用对子结构的所以然来 —— 那时候我们学生只能被迫不加反思地接受。

后来，我了解到意识形态相关的理论，又由 《DURARARA !!》 引发了自己的一些体验，就迷上了 `head` `tail` 这样一对名字的设计。它符合对于意识形态真相的一种揭示：简单说，一个意识形态通过让你觉得它不是一个意识形态来让它自己成为你的 *头* 。

…… 以及，根据辩证法对“本真自我”的理解，不同于愚蠢的小布尔乔亚的自欺欺人式解读，“一个人他真实的自己”并非是“取下面具后的这个人”，而恰恰就是那个面具本身：取下面具后还是面具，而那个无论如何都取不下来的就是真正的你自己了。

“本质是表象的表象”。正如生长着的植物那样：不断革新整体之边界的幼芽部位，才是真正（在匮乏中）中介出一株植物之本相来的那样一个位置。树干？那只是它走过然后留下的痕迹罢了。种子不在于根部或者干部，而是一切细枝末节边界处的生长点上，这才是种子其真正的后继之存在。
