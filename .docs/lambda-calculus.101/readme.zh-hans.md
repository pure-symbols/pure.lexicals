
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
- `a -> a b` **不**是 个 *组合子*
- `a -> b -> a b` **是** 个 *组合子*
- `a -> b -> a` **是** 个 *组合子*
- `b -> a` **不**是 个 *组合子*
- `a -> b -> c -> c (x -> a)` **是** 个 *组合子*
- `a -> b -> c -> c (x -> y)` **不**是 个 *组合子*

*完啦。🌚*


### 🌪 名

<sup>最初，我们只是想要关联一个名称和一个概念（结构）。一个单纯只是描述「变易」（又可说 *映射* 或 *关系*）的结构。数学上，这叫「函数」。如此，任何这样的结构，我们需要默认它首先可以不具备名称，然后我们才可以自由地把它与某个名称绑定在一起。就是说，在这样的逻辑下，任何函数在一开始都是匿名的。比如，我们在数学里经常给某个函数设为 `a` `b` `c` `甲` `乙` `丙` 之类的名称，或者用一些惯用名称如 `f` `g` 之类的，在不同上下文里指代不同的函数（结构）。</sup>

<sup>这「函数」就是指明「变易」的结构。而在 *Lambda (λ) 演算* 里，则是所有的值皆为这样的函数。</sup>

<sup>在这里，唯一存在的事物就只是一个可以像值一样被对待的匿名的函数了。人们叫它 ***lambda (λ)*** …… 但，为什么要用 ***lambda (λ)*** 这个符号？</sup>

<sup>据我所知，它本来是 `ˆx.xx` ，也就是一个 `^` 形状的帽子在 `.` 左边的 `x` 上面。然后它变成了 `Ʌx.xx` ，再然后为方便打印变成了 `λx.xx` 。详细可以参见 [这里](https://zh.wikipedia.org/wiki/%CE%9B%E6%BC%94%E7%AE%97#%E5%8E%86%E5%8F%B2)：</sup>

> <sup>至于为何邱奇选择 `λ` 作为符号，连他本人的解释也互相矛盾：最初是在 1964 年的一封信中，他明确解释称这是来源于《数学原理》一书中的类抽象符号（脱字符），为了方便阅读，他首先将其换成逻辑与符号 `∧` 作为区分，然后又改成形状类似的 `λ` 。他在 1984 年又重申了这一点，但再后来他又表示选择 `λ` 纯粹是偶然（Cardon, Felice; Hindley, J. Roger. History of Lambda-calculus and Combinatory Logic. 2006.）。</sup>
> 

<sup>总之，这只是一个符号，它的来源甚至也是较为随便的 …… 大家如今也只是都已经在用它来称呼这一事物了。</sup>

<sup>而函数是有可能有 *[自由变量](https://zh.wikipedia.org/wiki/%E8%87%AA%E7%94%B1%E5%8F%98%E9%87%8F%E5%92%8C%E7%BA%A6%E6%9D%9F%E5%8F%98%E9%87%8F)* 在其函数体中的，那么如果你想把这种东西当作值来对待，你就必须要它能够确保它拥有为这些变量绑定上值的机制。我们需要这样的机制，而有这种机制的函数我们称之为 *闭包 (closure)* 。</sup>

<sup>有一个绑定自由变量的机制是在 **[*词法作用域*](https://zh.wikipedia.org/wiki/%E4%BD%9C%E7%94%A8%E5%9F%9F#%E9%9D%99%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E5%8A%A8%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F)** 下完成绑定，这又叫静态作用域的绑定，即是在其定义期即完成对自由变量的绑定。另一种相对的机制是在 *动态作用域* 下完成这个绑定，也即在运行期再去作这个绑定。早期 Lisp 和现在的 Bash 都是如此 —— 它们也因此会用起来令人感到混乱。这也是为什么只有早期的 Lisp 是这样、而后来的 Lisp 则都得是在词法作用域下绑定了。同样地，这也是为什么 *闭包 (closure)* 会干脆又叫 *词法闭包 (Lexical Closure)* ，因为几乎不会有任何语言的实现会把闭包做成动态作用域的自由变量绑定，基本所有实现中的闭包都是静态作用域即词法作用域绑定自由变量的闭包 —— 即 *词法闭包 (Lexical Closure)* 。</sup>



## 语法参考

这里是 *lambda calculate*, *Julia*, *ES6*, *Python*, 还有 *OCaml* 这些语法之间的对应关系。

| row | lambda calculate | Julia | ES6 | Python | OCaml |
| --- | ---------------- | ----- | --- | ------ | ----- |
|  1  | `λa.a` 或 `λx.x` | `a -> a` 或 `x -> x` | `a => a` 或 `x => x` | `lambda a: a` 或 `lambda x: x` | `fun a -> a` 或 `fun x -> x` |
|  2  | `λxy.x` 或 `λx.λy.x` 或 `λx.(λy.x)` | `x -> y -> x` 或 `x -> (y -> x)` | `x => y => x` 或 `x => (y => x)` | `lambda x: lambda y: x` 或 `lambda x: (lambda y: x)` | `fun x y -> x` 或 `fun x -> fun y -> x` 或 `fun x -> (fun y -> x)` |
|  3  | `λxf.fx` 或 `λxf.f x` 或 `λxf.(f x)` 或 `λx.λf.fx` 亦即 `λx.(λf.fx)` | `x -> f -> f(x)` 或 `x -> f -> (f)(x)` 亦即 `x -> (f -> f(x))` | `x => f => f(x)` 或 `x => f => (f) (x)` 亦即 `x => (f => f(x))` | `lambda x: lambda f: f(x)` 或 `lambda x: lambda f: (f) (x)` 亦即 `lambda x: (lambda f: f(x))` | `fun x f -> f x` 或 `fun x -> fun f -> f x` 或 `fun x -> fun f -> (f) (x)` 亦即 `fun x -> (fun f -> (f) (x))` |
|  4  | `λfgx.f(gx)` 或 `λf.λg.λx.f(gx)` 相当于 `λf.(λg.(λx.( (f) ((g) (x)) )))` | `f -> g -> x -> (f)((g)(x))` 相当于 `f -> (g -> (x -> ( (f)((g)(x)) )))` | `f => g => x => (f) ((g) (x))` 相当于 `f => (g => (x => ( (f) ((g) (x)) )))` | `lambda f: lambda g: lambda x: (f) ((g) (x))` 相当于 `lambda f: (lambda g: (lambda x: ( (f) ((g) (x)) )))` | `fun f g x -> f (g x)` 或 `fun f -> fun g -> fun x -> f (g x)` 相当于 `fun f -> (fun g -> (fun x -> ( (f) ((g) (x)) )))` |
|  5  | `λabf.fab` 或 `λa.λb.λf.(fa)b` 相当于 `λa.(λb.(λf.( ((f) (a)) (b) )))` | `a -> b -> f -> (f)(a)(b)` 相当于 `a -> (b -> (f -> ( ((f)(a))(b) )))` | `a => b => f => (f) (a) (b)` 相当于 `a => (b => (f => ( ((f) (a)) (b) )))` | `lambda a: lambda b: lambda f: (f) (a) (b)` 相当于 `lambda a: (lambda b: (lambda f: ( ((f) (a)) (b) )))` | `fun a b f -> f a b` 或 `fun a -> fun b -> fun f -> (f a) b` 相当于 `fun a -> (fun b -> (fun f -> ( ((f) (a)) (b) )))` |



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








