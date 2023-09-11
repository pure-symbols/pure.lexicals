
How can I use curry ? Just because of cool ...

OCaml is cool, this is what I just feels while I knews that `a b c` same as `(((a) b) c)` on it. Means the implementation of its function just one-parameter function, this give the language a important simplicity.

So, I suggest myself to make every function become a only one parameter function. Then, a surprise gives to me: I can make a pure style *pipeline* so **I HAVE NO NECESSARY TO MAKE A NOT-STATIC FUNCTION ANYMORE !!**

And, thst is just only one cool thing will be gives I feel.

> > > > ----

我是怎么用上柯里化的呢？只是因为一开始我觉得这样会很酷。。。

举个例子， OCaml 就让我觉得很酷，因为它的 `a b c` 就是简写化的 `(((a) b) c)` ，这意味着它的编译器解释器只需要理解一种函数：单参数函数，就行了，一切仍然能够顺利工作，而实现则变得简单且优雅（并且我还会在不久将来由此被赐予意料外的灵活性）。

所以，我要求我自己把所有函数尽量都改成了柯里化的形式 —— 定义和调用 —— 然后，在这样做完了不久，我就发现，原本让我想要放弃全静态函数编程的想法已经不需要再存在了。借了柯里化的东风（确切说是词法闭包的），我能够以同样的纯函数的方式去定义一个（能够在 TS 中也可以自动类型推断的） Pipeline 功能。然后呢？然后我就不必再在意 *moonbit lang* 才有的那种好特性（即允许特定情况下 `b(a,c)` 写作 `a.b(c)` ），我也不需要把我的纯函数代码一个个改成难以看懂的面向对象的风格，它们只需要保持原样，不会有任何麻烦了，在 TS 里也可以像 Elixir/OCaml 或者 Racket/Clojure 那样优雅地使用类似管道的形式了。

而且，我不知之后还会不会有更多像这样由此被赋予的便利。
