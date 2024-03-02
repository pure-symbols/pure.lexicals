
# 来咱看看 Lambda 演算是个啥 ☄️

这不是什么难事。 *可以先来从一个别致的风格开始。 🌝*

## 柯里化 (Currying)

所以，柯里化 (Currying) 是个啥？

### 🎨 很简单

*在一开始，你就把它当成一个像下面这样的特定语法风格就够了。 🙃*

一般来说，你定义一个加法功能，你是这样搞：

~~~ julia
add = (x, y) -> x + y
~~~

然后调用就会像这样：

~~~ julia
add(1,2)
~~~

结果是 `3` 。

**现在，来做出一些改变。**

这是新风格下你的加法定义：

~~~ julia
add = x -> y -> x + y
~~~

这相当于：

~~~ julia
add = x -> ( y -> x + y )
add = x -> ( y -> (x + y) )
~~~

然后对它的调用则应该像这样：

~~~ julia
add(1)(2)
~~~

仍然，结果是 `3` 。

**然后在这个风格下，你就又能做这样的事了：**

~~~ julia
add_three = add(3)
add_three(4) # ~> 7
add_three(5) # ~> 8
~~~

**这里的 `add_three = add(3)` 就相当于是：**

~~~ julia
add_three = y -> 3 + y
~~~

**或者下面的任何一行：**
- `add_three = x -> 3 + x`
- `add_three = z -> 3 + z`
- `add_three = foozzfii -> 3 + foozzfii`
- …… 等等

**上面这些之间，无论那两个，都是全然相同的东西。**

*(上面那些代码全都是 Julia 的语法 (syntax) 。你可以在 [这个 Julia web repl](https://keno.github.io/julia-wasm/website/repl.htm) 验证它们。 ✨)*

好的，这就是全部了。你已经接触过 *Lambda 演算* 的所有要点了。有意思吧？*来看看上面这些都接触到了些啥。🌜*

> [!TIP]
> 
> 这里的 `add(3)` 会得出（或者说返回）一个闭包 (closure) ，而这，如果你了解面 *向对象编程 (OOP)* ，你就可以吧它对应于对于一个对象的创建（即通过 *new* 来做的那件事），只不过这个被创建的对象可以像函数一般被调用罢了。
> 
> 有的语言 (language) 里，闭包 (closure) 就被实现为一类特别的对象。但仍然是有的语言 (language) 里，任何形式的函数定义语法也都只是定义闭包的语法糖而已。
> 



### 🏹 Lambda 演算

*我会告诉你在 lambda 演算中的三个转换或评估（应该都是归约）的要点（或者更多），但仍然只是通过介绍一些 **词法闭包 (lexical closure)** 的例子来完成对它们的介绍。🧪*

[规约 | λ 演算 | 维基百科]: https://zh.wikipedia.org/wiki/%CE%9B%E6%BC%94%E7%AE%97#%E6%AD%B8%E7%B4%84 "规约 | λ 演算 | 维基百科"

#### *0*

在这个里面：

~~~ julia
add = x -> y -> x + y
~~~

1. 闭包 `y -> x + y` 中 `+` 右边的 `y` 是一个 *绑定变量 (bound variables)* ，因为你在这个闭包的 `->` 标志的左边能看到一个 `y` 。
2. 闭包 `y -> x + y` 中 `+` 左边的 `x` 是一个 *自由变量 (free variables)* ，因为你在这个闭包的 `->` 标志的左边看不到一个 `y` 。
3. 所以，解释器 (interpreter) 如何知道这 `x` 是啥呢？这取决于在 `y -> x + y` 出现（即被定义）的地方 —— 即 *作用域 (scope)* —— 里， `x` 是啥。这种绑定自由变量的规则也叫 *[词法作用域 (lexical scoping)](https://zh.wikipedia.org/wiki/%E4%BD%9C%E7%94%A8%E5%9F%9F#%E9%9D%99%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E5%8A%A8%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F)* 。
4. 所以 …… 这里，由于 `y -> x + y` 就是个 `x -> y -> x + y` 的返回值，那么，兹是 `x -> x` 里 `->` 右边的 `x` 会是个啥、 `x -> y -> x + y` 里 `->` 右边的 `x` 就会是啥。


#### *1*

**这意味着，在有 `add = x -> y -> x + y` 的前提下，像这样一个** 

~~~ julia
add_one = add(1)
~~~

**就相当于是** 

~~~ julia
add_one = y -> 1 + y
~~~

*这也就是一个闭包（词法闭包）的定义会做（比一个函数/功能定义多做）的事情：相应的自由变量会被替换为其定义时所在作用域相应名称的变量的值。* 而这在 *[Lambda 演算 (Lambda Calculus)][规约 | λ 演算 | 维基百科]* 中，就叫作 ***η (eta) 规约 (η-reduction)*** （或者说 *η 变换* ）：

> ***η 规约**: 捕获外延概念*

#### *2*

同样地，对于：

~~~ julia
pipe = x -> f -> f(x)
~~~

像这样的

~~~ julia
pipe_four = pipe(4)
~~~

就相当于这样

~~~ julia
pipe_four = f -> f(4)
~~~

#### *3*

这也是为什么

~~~ julia
pipe(4)(add(1))
~~~

相当于就是

~~~ julia
( f -> f(4) )( x -> 1 + x )
~~~

也即 

~~~ julia
pipe_four(add_one)
~~~

而结果也就应当是：

~~~ julia
( f -> f(4) )( x -> 1 + x )
( x -> 1 + x )(4)
1 + 4
~~~

即 `5` 。

#### *4*

而这个规约演算步骤

~~~ julia
( f -> f(4) )( x -> 1 + x )
( x -> 1 + x )(4)
1 + 4
~~~

它就是 *[Lambda 演算 (Lambda Calculus)][规约 | λ 演算 | 维基百科]* 中被称为 ***β (beta) 归约 (β-reduction)*** 的规则：

> ***β 归约**: 函数作用于其参数*

#### *5*

以及，显而易见，下面这些之间都是（完完全全地）等价的：

~~~ julia
( f -> f(4) )( x -> 1 + x )
( x -> x(4) )( y -> 1 + y )
( j -> j(4) )( a -> 1 + a )
( k -> k(4) )( i -> 1 + i )
~~~

上面的转换步骤在 *[Lambda 演算 (Lambda Calculus)][规约 | λ 演算 | 维基百科]* 中就叫作 ***α (alpha) 转换 (α-conversion)*** ：

> ***α 转换**: 变更绑定变量的符号*

你也可以将它们之间的关系叫作 *[α 等价 (α-equivalence)](https://zh.wikipedia.org/wiki/%CE%9B%E6%BC%94%E7%AE%97#%CE%B1-%E7%AD%89%E5%83%B9)* 。

#### *6*

又以及，如果在该一语言中存在一个 *类型系统 (type system)* ，那么对于

~~~ julia
( f -> f(4) )( x -> 1 + x )
~~~

其中 `x -> 1 + x` 的类型是可被自动的推断的。

这是由于 `f` 在 `f -> f(4)` 中已被事先地指明过要像 `f(4)` 这样去应用了。

在 `f -> f(4)` 中 `->` 左边的 `f` 的类型可被 `->` 右边 `f(4)` 位置的 `f` 确定，因为 `4` 即是一个数字类型的值，这代表 `f` 的参数的类型必须也得是数字。

#### *7*

目前位置在所有完整的定义里我们都没有写像 `a -> a b` 这样的东西，我们写的都是类似于 `a -> b -> a b` 这样的。

对于一个**单独的** `b -> b a` 之形式，它是一个 *lambda* ，但它之中存在一个 *未绑定变量 (unbound variable)* `a` （或者叫 *自由变量 (free variable)* 也行）。

但对于 `a -> b -> b a` 这一形式，它也是一个 *lambda* ，但由于所有变量都是 *绑定变量 (bound variables)* ，在此情况下的东西我们也可以管它叫作 *组合子 (Combinator)* 。

例如：

- `a -> a` **是** 个 *组合子*
- `a -> a b` is **不是** 个 *组合子*
- `a -> b -> a b` **是** 个 *组合子*
- `a -> b -> a` **是** 个 *组合子*
- `b -> a` is **不是** 个 *组合子*
- `a -> b -> c -> c (x -> a)` **是** 个 *组合子*
- `a -> b -> c -> c (x -> y)` is **不是** 个 *组合子*

*完啦。🌚*


## 语法参考

这里是 *lambda calculate*, *Julia*, *ES6*, *Python*, 还有 *OCaml* 这些语法之间的对应关系。

| row | lambda calculate | Julia | ES6 | Python | OCaml |
| --- | ---------------- | ----- | --- | ------ | ----- |
|  1  | `λa.a` 或 `λx.x` | `a -> a` 或 `x -> x` | `a => a` 或 `x => x` | `lambda a: a` 或 `lambda x: x` | `fun a -> a` 或 `fun x -> x` |
|  2  | `λxy.x` 或 `λx.λy.x` 或 `λx.(λy.x)` | `x -> y -> x` 或 `x -> (y -> x)` | `x => y => x` 或 `x => (y => x)` | `lambda x: lambda y: x` 或 `lambda x: (lambda y: x)` | `fun x y -> x` 或 `fun x -> fun y -> x` 或 `fun x -> (fun y -> x)` |
|  3  | `λxf.fx` 或 `λxf.f x` 或 `λxf.(f x)` 或 `λx.λf.fx` means `λx.(λf.fx)` | `x -> f -> f(x)` 或 `x -> f -> (f)(x)` means `x -> (f -> f(x))` | `x => f => f(x)` 或 `x => f => (f) (x)` means `x => (f => f(x))` | `lambda x: lambda f: f(x)` 或 `lambda x: lambda f: (f) (x)` means `lambda x: (lambda f: f(x))` | `fun x f -> f x` 或 `fun x -> fun f -> f x` 或 `fun x -> fun f -> (f) (x)` means `fun x -> (fun f -> (f) (x))` |
|  4  | `λfgx.f(gx)` 或 `λf.λg.λx.f(gx)` same as `λf.(λg.(λx.( (f) ((g) (x)) )))` | `f -> g -> x -> (f)((g)(x))` same as `f -> (g -> (x -> ( (f)((g)(x)) )))` | `f => g => x => (f) ((g) (x))` same as `f => (g => (x => ( (f) ((g) (x)) )))` | `lambda f: lambda g: lambda x: (f) ((g) (x))` same as `lambda f: (lambda g: (lambda x: ( (f) ((g) (x)) )))` | `fun f g x -> f (g x)` 或 `fun f -> fun g -> fun x -> f (g x)` same as `fun f -> (fun g -> (fun x -> ( (f) ((g) (x)) )))` |
|  5  | `λabf.fab` 或 `λa.λb.λf.(fa)b` same as `λa.(λb.(λf.( ((f) (a)) (b) )))` | `a -> b -> f -> (f)(a)(b)` same as `a -> (b -> (f -> ( ((f)(a))(b) )))` | `a => b => f => (f) (a) (b)` same as `a => (b => (f => ( ((f) (a)) (b) )))` | `lambda a: lambda b: lambda f: (f) (a) (b)` same as `lambda a: (lambda b: (lambda f: ( ((f) (a)) (b) )))` | `fun a b f -> f a b` 或 `fun a -> fun b -> fun f -> (f a) b` same as `fun a -> (fun b -> (fun f -> ( ((f) (a)) (b) )))` |



## 组合子逻辑

*啊！我刚刚是不是提到了 **组合子 (Combinators)** ？这里有些有意思的东西！ 🌛*

这是一种名为 *[组合子逻辑 (Combinatory Logic)](https://zh.wikipedia.org/wiki/%E7%BB%84%E5%90%88%E5%AD%90%E9%80%BB%E8%BE%91)* 的 *Lambda 演算法* 。

### 🛶 *模仿一只知更鸟 (To Mock a Mockingbird)*

这是一本书，作者是 *Raymond Merrill Smullyan* 。他和 *Haskell Brooks Curry* 都对鸟类观察很感兴趣，本书中也把所有其提到的 *组合子* 类比为 *鸟类 (Birds)* 。

### 🕊️ Birds

| Bird Name (名称) | Bird Symbol (代号) | Lambda Syntax (Lambda 演算语法) | OCaml Syntax (OCaml 语法) | ES6 Syntax (ES6 语法) |
| --------- | ----------- | ------------- | ------------ | ---------- |
| *Identity Bird (aka Idiot)* | `I` | `λa.a` | `fun x -> x` | `x => x` |
| *Mockingbird* | `M` | `λa.aa` | `fun x -> x x` | `x => x (x)` |
| *Kestrel (True)* | `K` | `λab.a` | `fun x y -> x` | `x => y => x` |
| *Kite (False)* | `KI` | `λab.b` | `fun x y -> y` | `x => y => y` |
| *Thrush* | `T` | `λab.ba` | `fun x f -> f x` | `x => f => f (x)` |
| *Starling* | `S` | `λabc.(ac)(bc)` | `fun a b c -> a c (b c)` | `a => b => c => a (c) (b (c))` |

这里的 `K` 在 *Lambda 演算* 中可被当作布尔值 `true` 使用，另一个布尔值 `false` 则是 `KI` ，它可以只是通过化简 `K I` 来得到：

~~~ lambda
KI = (λxy.y) ;
K I = (λxy.x) (λa.a)
    = (λx.λy.x) (λa.a)
    = (λy.λa.a)
    = (λx.λy.y)
    = (λxy.y) = KI .
~~~

并且，所有的一切都已被证明可以通过仅使用了 `S` `K` `I` 三者所组成的表达式来求得 …… 或者应该说是只使用 `S` 和 `K` 即足矣，因为 `I` 也相当于只是 `SKK` 即 `(((S)(K))(K))` 即可求得的结果。

这是我从 [一个网站](https://www.angelfire.com/tx4/cus/combinator/birds.html) 找到的有关于此的完整（大概吧）表格：

| Bird | Symbol | Function Abstraction | Combinator | SK Combinator |
| ---- | ------ | -------------------- | ---------- | ------------- |
| *Bluebird* | `B` | `λabc.a(bc)` | `S(KS)K` | `((S(KS))K)` |
| *Blackbird* | `B1` | `λabcd.a(bcd)` | `BBB` | `((S(K((S(KS))K)))((S(KS))K))` |
| *Bunting* | `B2` | `λabcde.a(bcde)` | `B(BBB)B` | `((S(K((S(K((S(KS))K)))((S(KS))K))))((S(KS))K))` |
| *Becard* | `B3` | `λabcd.a(b(cd))` | `B(BB)B` | `((S(K((S(K((S(KS))K)))((S(KS))K))))((S(KS))K))` |
| *Cardinal* | `C` | `λabc.acb` | `S(BBS)(KK)` | `((S((S(K((S(KS))K)))S))(KK))` |
| *Dove* | `D` | `λabcd.ab(cd)` | `BB` | `(S(K((S(KS))K)))` |
| *Dickcissel* | `D1` | `λabcde.abc(de)` | `B(BB)` | `(S(K(S(K((S(KS))K)))))` |
| *Dovekies* | `D2` | `λabcde.a(bc)(de)` | `BB(BB)` | `((S(K((S(KS))K)))(S(K((S(KS))K))))` |
| *Eagle* | `E` | `λabcde.ab(cde)` | `B(BBB)` | `(S(K((S(K((S(KS))K)))((S(KS))K))))` |
| *Bald Eagle* | `Ê` | `λabcdefg.a(bcd)(efg)` | `B(BBB)(B(BBB))` | `((S(K((S(K((S(KS))K)))((S(KS))K))))(S(K((S(K((S(KS))K)))((S(KS))K)))))` |
| *Finch* | `F` | `λabc.cba` | `ETTET` | `((S(K((S((SK)K))(K((S(K(S((SK)K))))K)))))((S(K((S(K((S(KS))K)))((S(KS))K))))((S(K(S((SK)K))))K)))` |
| *Goldfinch* | `G` | `λabcd.ad(bc)` | `BBC` | `((S(K((S(KS))K)))((S((S(K((S(KS))K)))S))(KK)))` |
| *Hummingbird* | `H` | `λabc.abcb` | `BW(BC)` | `((S(K((S(K(S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))))K)))(S(K((S((S(K((S(KS))K)))S))(KK)))))` |
| *Identity Bird (aka Idiot)* | `I` | `λa.a` | `SKK` | `((SK)K)` |
| *Jay* | `J` | `λabcd.ab(adc)` | `B(BC)(W(BC(B(BBB))))` | `((S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))((S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))(K((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S(K((S(KS))K)))((S(KS))K))))))))` |
| *Kestrel (True)* | `K` | `λab.a` | `K` | `K` |
| *Lark* | `L` | `λab.a(bb)` | `CBM` | `((S((S(KS))K))(K((S((SK)K))((SK)K))))` |
| *Mockingbird* | `M` | `λa.aa` | `SII` | `((S((SK)K))((SK)K))` |
| *Double Mockingbird* | `M2` | `λab.ab(ab)` | `BM` | `(S(K((S((SK)K))((SK)K))))` |
| *Owl* | `O` | `λab.b(ab)` | `SI` | `(S((SK)K))` |
| *Queer Bird* | `Q` | `λabc.b(ac)` | `CB` | `((S(K(S((S(KS))K))))K)` |
| *Quixotic Bird* | `Q1` | `λabc.a(cb)` | `BCB` | `((S(K((S((S(K((S(KS))K)))S))(KK))))((S(KS))K))` |
| *Quizzical Bird* | `Q2` | `λabc.b(ca)` | `C(BCB)` | `((S(K(S((S(K((S((S(K((S(KS))K)))S))(KK))))((S(KS))K)))))K)` |
| *Quirky Bird* | `Q3` | `λabc.c(ab)` | `BT` | `(S(K((S(K(S((SK)K))))K)))` |
| *Quacky Bird* | `Q4` | `λabc.c(ba)` | `F*B` | `((S(K((S((S(K((S(KS))K)))S))(KK))))((S(K(S((S(K((S((S(K((S(KS))K)))S))(KK))))((S(KS))K)))))K))` |
| *Robin* | `R` | `λabc.bca` | `BBT` | `((S(K((S(KS))K)))((S(K(S((SK)K))))K))` |
| *Starling* | `S` | `λabc.ac(bc)` | `S` | `S` |
| *Thrush* | `T` | `λab.ba` | `CI` | `((S(K(S((SK)K))))K)` |
| *Turing* | `U` | `λab.b(aab)` | `LO` | `((S(K(S((SK)K))))((S((SK)K))((SK)K)))` |
| *Vireo (aka Pairing)* | `V` | `λabc.cab` | `BCT` | `((S(K((S((S(K((S(KS))K)))S))(KK))))((S(K(S((SK)K))))K))` |
| *Warbler* | `W` | `λab.abb` | `C(BMR)` | `((S(K(S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))))K)` |
| *Converse Warbler* | `W1` | `λab.baa` | `CW` | `((S(K(S((S(K(S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))))K))))K)` |
| *Why Bird (aka Sage Bird)* | `Y` | `λa.a(λa)` | `SLL` | `(((SS)K)((S(K((SS)(S((SS)K)))))K))` |
| *Identity Bird Once Removed* | `I*` | `λab.ab` | `S(SK)` | `(S(SK))` |
| *Warbler Once Removed* | `W*` | `λabc.abcc` | `BW` | `(S(K((S(K(S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))))K)))` |
| *Cardinal Once Removed* | `C*` | `λabcd.abdc` | `BC` | `(S(K((S((S(K((S(KS))K)))S))(KK))))` |
| *Robin Once Removed* | `R*` | `λabcd.acdb` | `C*C*` | `((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK)))))` |
| *Finch Once Removed* | `F*` | `λabcd.adcb` | `BC*R*` | `((S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK))))))` |
| *Vireo Once Removed* | `V*` | `λabcd.acbd` | `C*F*` | `((S(K((S((S(K((S(KS))K)))S))(KK))))((S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK)))))))` |
| *Identity Bird Twice Removed* | `I**` | `λabc.abc` | ` ` | ` ` |
| *Warbler Twice Removed* | `W**` | `λabcd.abcdd` | `B(BW)` | `(S(K(S(K((S(K(S((S(K((S((SK)K))((SK)K))))((S(K((S(KS))K)))((S(K(S((SK)K))))K))))))K)))))` |
| *Cardinal Twice Removed* | `C**` | `λabcde.abced` | `BC*` | `(S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))` |
| *Robin Twice Removed* | `R**` | `λabcde.abdec` | `BR*` | `(S(K((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK)))))))` |
| *Finch Twice Removed* | `F**` | `λabcde.abedc` | `BF*` | `(S(K((S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK))))))))` |
| *Vireo Twice Removed* | `V**` | `λabcde.abecd` | `BV*` | `(S(K((S(K((S((S(K((S(KS))K)))S))(KK))))((S(K(S(K((S((S(K((S(KS))K)))S))(KK))))))((S(K((S((S(K((S(KS))K)))S))(KK))))(S(K((S((S(K((S(KS))K)))S))(KK)))))))))` |
| *Kite (False)* | `KI` | `λab.b` | `KI` | `(K((SK)K))` |
| *Omega* | `Ω` | `λ` | `MM` | `(((S((SK)K))((SK)K))((S((SK)K))((SK)K)))` |
| *Konstant Mocker* | `KM` | `λab.bb` | `KM` | `(K((S((SK)K))((SK)K)))` |
| *Crossed Konstant Mocker* | `C(KM)` | `λab.aa` | `C(KM)` | `((S(K(S(K((S((SK)K))((SK)K))))))K)` |
| *Theta* | `Θ` | `λ` | `YO` | `(((SS)K)((S(K((SS)(S((SS)K)))))K)(S((SK)K)))` |

这是一个 [*SK 编译器 (SK Compiler)*](https://crypto.stanford.edu/~blynn/lambda/sk.html) 和 [*某种别的编译器*](https://crypto.stanford.edu/~blynn/lambda/logski.html) ，它们或许能帮你验证一些事情。

以及 ……

> 如果我们能用函数替换所有代码、用组合子取代所有函数、再用 S 和 K 替换所有组合子 ——
> 
> 那么我们就可以用 S 和 K 替换所有代码。
> 

> If we can replace all code by functions, Replace all functions by combinators, And replace all combinators by S and K ;
> 
> Then we can replace all code by S and K.
> 

*酷吧？ 🌞*

这是更多关于 [*组合子逻辑 (combinatory logic)*](https://ncatlab.org/nlab/show/combinatory+logic) 和 [*partial combinatory algebra*](https://ncatlab.org/nlab/show/partial+combinatory+algebra) 之详情的资料，以及一些有关于 [*不动点组合子 (fixed-point combinator)*](https://ncatlab.org/nlab/show/fixed-point+combinator#combinatory_logic) 的你大概会感兴趣它的组合子逻辑的资料。 *(嗯，我只是在 [这里的问答](https://math.stackexchange.com/questions/4330664/is-sk-s-i-iss-k-ssk-kik-s-i-i-really-a-fixed-point-combinato) 中找到的它们。你也可以看我为此而写的另一个 [文档](../fixed-point-things) 。 🙃)*


### 🪐 More

(未来这个位置打算放有关组合子的一些笔记的链接 ...)








