
## Why

Why did I use the currying ? Just because of cool ...  
\________  
我是怎么就用上柯里化了呢？只是因为一开始我觉得这样会很酷。。。

OCaml is cool, this is what I just feels while I knews that `a b c` same as `(((a) b) c)` on it. Means the implementation of its function just one-parameter function, this give the language a important simplicity.  
\________  
举个例子， OCaml 就让我觉得很酷，因为它的 `a b c` 就是简写化的 `(((a) b) c)` ，这意味着它的编译器解释器只需要理解一种函数：单参数函数，就行了，一切仍然能够顺利工作，而实现则变得简单且优雅（并且我还会在不久将来由此被赐予意料外的灵活性）。

So, I suggest myself to make every function become a only one parameter function. Then, a surprise gives to me: I can make a pure style *pipeline* so **I HAVE NO NECESSARY TO MAKE A NOT-STATIC FUNCTION ANYMORE !!**  
\________  
所以，我要求我自己把所有函数尽量都改成了柯里化的形式 —— 定义和调用 —— 然后，在这样做完了不久，我就发现，原本让我想要放弃全静态函数编程的想法已经不需要再存在了。借了柯里化的东风（确切说是词法闭包的），我能够以同样的纯函数的方式去定义一个（能够在 TS 中也可以自动类型推断的） Pipeline 功能。然后呢？然后我就不必再在意 *moonbit lang* 才有的那种好特性（即允许特定情况下 `b(a,c)` 写作 `a.b(c)` ），我也不需要把我的纯函数代码一个个改成难以看懂的面向对象的风格，它们只需要保持原样，不会有任何麻烦了，在 TS 里也可以像 Elixir/OCaml 或者 Racket/Clojure 那样优雅地使用类似管道的形式了。

And, thst is just only one cool thing will be gives I feel.  
\________  
而且，我不知之后还会不会有更多像这样由此被赋予的便利。

## How

How does the currying works ?  
\________  
柯里化是如何工作的？

First you can just understand such equivalence:   
\________  
其实你可以先做一下下面的这个等同：

~~~ js
const add = (a, b) => a + b ;
add (1,2) ; // 3
~~~

~~~ js
const add = (a) => (b) => a + b ;
add (1) (2) ; // 3
~~~

Means, change the `,` to `) => (` at the define and change `,` to `) (` while calling, and, the effect won't have any change.  
\________  
就是说，把参数列表中的逗号全换成括号边界、把调用时候的逗号也换成括号边界，结果呢？效果完全一样。

But, there is one more ability the currying style would have: (in part extent) have a equivalence to the *partial application* of the mathematical function.  
\________  
但是，后者比前者多了个能力：（在一定程度上）模拟数学上的 *函数部分应用* 。

For the `add` definition which is `(a) => (b) => a + b`, you'll just get a new function same as `(b) => 4 + b` by calling `add (4)`.  
\________  
对于上面的 `(a) => (b) => a + b` 定义而言，执行 `add (4)` 时，返回的只是一个相当于 `(b) => 4 + b` 定义的新的函数。仅此而已。

And, this is all about the *curring*. That's all.  
\________  
这就是柯里化。仅此而已。

But for that to happen, the mechanism called *lexical closures* must exist.  
\________  
但要做到这些，必须要有 *词法闭包* 的机制存在。

Means, for a closure function, the information it included is not only the definition but also all values this definition depends on.  
\________  
就是说，对于一个闭包函数而言，它里面的信息不仅仅包括函数定义中的，还有函数完成其计算必要依赖的值（当然这个值也可以是另一个闭包）。

This   
\________  
这有点像你手动把你的程序和它的依赖统统封入一个 OCI 容器镜像，只不过闭包函数是被词法闭包机制自动装好了的、且仅仅只包含必要的依赖内容的，不像 OCI 容器（我一直认为有理由相信 OCI/Docker 容器的一部分启示来源其实就是闭包（另一部分可能是画图软件🙃））。

  
\________  
对于 `(a) => (b) => a + b` 这个定义，我可以刻意地写得繁琐一些，这样或许可以帮你看得更清楚它为什么也有“把外部需要的值与函数定义封在一起”这种事情：

~~~ js
(a) =>
{
    const a_ = a ;
    return (b) => a_ + b ;
} ;
~~~

  
\________  
这个定义中的 `a_` ，就是那个与 `(b) => a_ + b` 这个函数定义一起构成闭包的，在该函数定义**以外**的一个值。

  
\________  
而 …… 很显然，它和 `(a) => (b) => a + b` 完全等价。这时候，你其实应该可以意识到：所谓“形参”其实就是“变量”或者说“因变量”，而“实参”发生在调用，它完全等价于一个“赋值符号”的作用，比如很多 C 系风格语法的语言里的 `=` 。在 Lambda 演算中，甚至没有“赋值符号”。想要赋值，就是调用。这在 OCaml 中的 `let` 其实就是 IIFE 写法的语法糖这一特性上也能体现。想要一个值被赋值然后用在两个地方，只需要 `((a) => (b) => (c) => a(c) + b(c) ) (vala) (valb) (valc)` 即可，它相当于 `() => { let (a, b, c) = (vala, valb, valc) ; a(c) + b(c) }` 的效果。

  
\________  
所以说，柯里化，要基于词法闭包。（为了避免不必要的口舌以后可以尽管就把所谓的“形式参数”直接理解为数学上的“变量”、并把调用中的“传实参值”就理解为“在一个局部上下文里赋值”即可。）


  
\________  
就这么简单。









