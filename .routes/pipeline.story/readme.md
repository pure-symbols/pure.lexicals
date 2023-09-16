## Funcs

At the first, by [*cs3110 here*](https://cs3110.github.io/textbook/chapters/hop/higher_order.html?highlight=pipe), I got a simple define of the `pipe` operator in OCaml:   
\________  
我最初从 CS3110 了解到 `pipe` 运算符的定义：

~~~ ocaml
let pipeline x f = f x ;;
let (|>) = pipeline ;;
let x = 5 |> fun x -> x + 3 ;;

(* val pipeline : 'a -> ('a -> 'b) -> 'b = <fun> *)
(* val ( |> ) : 'a -> ('a -> 'b) -> 'b = <fun> *)
(* val x : int = 8 *)
~~~

so I made:   
\________  
所以我也做了一个：

~~~ typescript
type pipe = <T,> (x: T) => <R,> (f: Fn<T, R>) => R ;
const pipe: pipe = <T,> (x: T) => <R,> (f: Fn<T, R>): R => f(x) ;
~~~

But it is not a middle operator, its usage will be like `pipe ( pipe ( pipe (5) (add (3) ) ) (add (4) ) ) (add (5) )`, its original written `add (5) (add (4) (add (3) (5) ) )` is much clear !!  
\________  
但它不是一个中缀运算符，所以用起来会是 `pipe ( pipe ( pipe (5) (add (3) ) ) (add (4) ) ) (add (5) )` 这样，它反而比原来的 `add (5) (add (4) (add (3) (5) ) )` 更繁琐！（虽说如此但这也是一小步）

I cannot make a middle operator in TS just like `let (|>) = pipeline` in OCaml ... then, I found that: If `add (1) (2)` got `3`, then `add (1)` **is just a function** right !? So can I make a pipeline function, but not return a result, we make it return a new function that can support us to give another one-parameter function to it ?  
\________  
我也没法在 TS 里像上面 OCaml 那样自定义一个中缀运算符。但，这时候，我就发现，柯里化带来了特殊的力量：当它没有完全被应用时，它就总是个单参函数（闭包）。所以，我是不是能做一个也返回这种闭包的管线呢？说干就干。

So I found this calling form:   
\________  
它用起来会是这样：

~~~ typescript
pipeline (5)
    (add (3) ) ()
    (add (4) ) ()
    (add (5) ) ()
    ...
~~~

so the define be like:   
\________  
我试着搞了搞它的定义：

~~~ typescript
const pipeline = <T,> (x: T) => pipework (x) ;
const pipework = <T,> (x: T) => <R,> (f: Fn<T, R>) => () => pipeline(f(x)) ;
~~~

only switch `f(x)` in `pipe` to `() => pipeline(f(x))`.  
\________  
其中只是替换了最后一小部分，并删掉了返回类型标注。

But ... how can I got the final value in such calling form ? There need a pair to store the result also ... then, the calling form shall be like:   
\________  
但这样我好像没有一个办法来取得结果，因为一直都是返回一个闭包。此时我又想到了元组，所以这里就用 Pair 来存放每一步的结果。那用的时候就得像这样：

~~~ typescript
pipeline (5)
    (add (3) ) .tail()
    (add (4) ) .tail()
    (add (5) ) .head() ; // get the result: 17
~~~

so the define be like:   
\________  
那么定义就得：

~~~ typescript
const pipeline = <T,> (x: T) => pipework (x) ;
const pipework = <T,> (x: T) => <R,> (f: Fn<T, R>) => Pair (f(x)) (() => pipeline(f(x))) ;
~~~

and here `pipeline` is same as `pipework` ... if you have knowledge about currying you will understand that ... so we just have:   
\________  
显而易见， `pipeline` 就是 `pipework` …… 如果你能明白柯里化（或者说闭包的效果）是什么，你就能明白我在说什么 …… 这是简化后的：

~~~ typescript
const pipeline = <T,> (x: T) => <R,> (f: Fn<T, R>) => Pair (f(x)) (() => pipeline(f(x))) ;
~~~

and, not all the `head` be needed, so change it be lack of evaluation (means lazy):   
\________  
也并非所有的中间值都是要取得的，我希望当用户需要的时候再计算（评估在这里要匮乏）（这也就是他们常说的惰性），所以：

~~~ typescript
const pipeline = <T,> (x: T) => <R,> (f: Fn<T, R>) => Pair (() => f(x)) (() => pipeline(f(x))) ;
~~~

That's OK.  
\________  
这就是我想要的定义了。接下来可以像上面那样的调用形式去使用了。

See all of them on [*playground*](https://www.typescriptlang.org/play?#code/PTAEBMFMAdIO3AZwLACg0BcCetQDE5QAeAFQBpQAlAPlAF5QAKADwC5QSBKe2y0Abkw5IoAAoBDAJYAnYgAlI48BRJSANrQYBvUAAtF4dgqUUM69qslrQAXwFo0AYwD2cRBjFTZDNEWPLaRn0lIwNuOlpfSzUyQLMrC3VONHYJGT8DFXVNSNRQfNA0AqYdYMM9TNB4tXZq225xRE90-yyrWkF0LodUEFBoSVg1STgRKAAzEcgnV3d+wchh0fpickC2DnDaIkpYpnH2AlIKGi3m2UZGM-GWTm5Ls4GhqcYb5jvuTrQ+xwBXaWkWBGAHNQO4sGoRONnNJ2C43B4lOAVoxxOw4L8ALYAI0g0go2PRWNx0jO4lAAGpQNj7Kh4XMkSi0aAMTi8WdGISWcT2TxQOSqTSvt1emBEM4Zm5nJCAHRqZzAtCMIoFJ6LKZMACsyTyxQKqPAyMYAGZuNwZdUriq9UxGYwACxm0AW9RW3U2g1G7Wgc1lN2cfigH6zaWQOUK0DOX4YdgARgA7D0+jC0GqliJGNrrbbDUxTT7nZadcVPUxHQWXVY3SW7QA2J2VtTV-X00Ph4G+gxXQPBqWy+WgqMx0CxgAcaCAA).  
\________  
可在 [Playground](https://tsplay.dev/WKKLyW) 查看完整代码及其验证。

## Types

If you want a type comment here, you shall see this `<T>(x: T) => <R>(f: Fn<T, R>) => Pair<() => R, () => <R>(f: Fn<R, R>) => Pair<() => R, () => <R>(f: Fn<R, R>) => Pair<() => R, () => <R>(f: Fn<R, R>) => Pair<() => R, () => <R>(f: Fn<...>) => Pair<...>>>>>` from `pipeline` function by your IDE.  
\________  
这时候，如果借助 IDE 看一下类型标记，你会看到 `pipeline` 函数有一个写不完的类型标记。

I simplified it by these three things:   
\________  
我用三个东西概括了它：

~~~ typescript
type Logik <Wert, Mehr> = { wert: () => Wert, mehr: () => Mehr } ;
type Pipeline <T> = <R> (f: Fn<T, R>) => Pipework<R> ;
type Pipework <T> = Logik<T, Pipeline<T> > ;
~~~

And, the type of this function can be this:   
\________  
那么函数的类型标记就被简化为了：

~~~ typescript
type pipeline = <T> (x: T) => Pipeline<T> ;
~~~

Here is something necessary:   
\________  
这些是必要的补充：

~~~ typescript
const pipe = <T,> (x: T) => <R,> (f: Fn<T, R>): R => f(x) ;

const Pair = 
<Head,> (head: Head) => 
<Tail,> (tail: Tail)
: Pair<Head, Tail> => 
    
    ({ head: head, tail: tail }) as Pair <Head, Tail> ;
~~~

And after the formats, we got this result (as you can see in [the code file](../../pure.ts/pure.ts)) finally:   
\________  
再格式化一下，这就是最终版本的了（就是你在 [相应代码文件](../../pure.ts/pure.ts) 里可以看到的）：

~~~ typescript
const Logik = 
<Wert, Mehr> ({ head, tail }: Pair <() => Wert, () => Mehr>)
: Logik<Wert, Mehr> => 
    
    ({ wert: head, mehr: tail }) as Logik <Wert, Mehr> ;

const Pipework = 
<T,> (head: () => T) => 
(tail: () => Pipeline<T>)
: Pipework<T> => 
    
    pipe (Pair (head) (tail)) (Logik) ;

export 
const Pipeline: pipeline = 
<T,> (x: T): Pipeline<T> => 
    
    <R,> (f: Fn<T, R>) => Pipework (() => pipe (x) (f)) (() => Pipeline (pipe (x) (f)) ) ;
~~~

That's all.  
\________  
搞定了。

The using of it be like:   
\________  
用起来会是这样：

~~~ typescript
const add = (a: number) => (b: number) => a + b ;

Pipeline (5)
    (add (3) ) .mehr()
    (add (4) ) .mehr()
    (add (7) ) .mehr()
    (console.log) .wert(); // console.log out: 19

// or

Pipeline (5)
    (x => x + 7) .mehr()
    (x => "x" + x) .mehr()
    (x => "?" + x) .mehr()
    (console.log) .wert(); // console.log out: "?x12"
~~~

The `Logik` is for limiting the scope of the type of elements in `Pair` here. `mehr` means more, `wert` means value.  
\________  
这里 `Logik` 的作用就是限定 `Pair` 中两个元素的类型范畴。 `mehr` 意为多出、余出， `wert` 意为意义、内容。

Thanks for the *lexical closure* feature. Without it, then here will be nothing.  
\________  
这一切多亏了有对 *词法闭包* 特性的支持。没有它，就做不了上面的事。

See also on [*playground*](https://www.typescriptlang.org/play?ssl=20&ssc=50&pln=20&pc=1#code/PTAEBMFMAdIO3AZwLACg0BcCetQDE5QAeAFQBpQAlAPlAF5QAKADwC5QSBKe2y0Abkw5IoAAoBDAJYAnYgAlI48BRJSANrQYBvUAAtF4dgqUUM69qslrQAXwFo0AYwD2cRBjFTZDNEWPLaRn0lIwNuOlpfSzUyQLMrC3VONHYJGT8DFXVNSNRQfNA0AqYdYMM9TNB4tXZq225xRE90-yyrWkF0LodUEFBoSVg1STgRKAAzEcgnV3d+wchh0fpickC2DnDaIkpYpnH2AlIKGi3m2UZGM-GWTm5Ls4GhqcYb5jvuTrQ+xwBXaWkWBGAHNQO4sGoRONnNJ2C43B4lOAVoxxOw4L8ALYAI0g0go2PRWNx0jO4lAAGpQNj7Kh4XMkSi0aAMTi8WdGISWcT2TxQOSqTSvt1emBEM4Zm5nJCAHRqZzAtCMIoFJ6LKZMACsyTyxQKqPAyMYAGZuNwZdUriq9UxGYwACxm0AW9RW3U2g1G7Wgc1lN2cfigH6zaWQOUK0DOX4YdgARgA7D0+jC0GqliJGNrrbbDUxTT7nZadcVPUxHQWXVY3SW7QA2J2VtTV-X00Ph4G+gxXQPBqWy+WgqMx0CxgAcPW+ICn05ns7n85nPWwuDVK2O6wsZx2e1ehzgxyo1DOfE69I8avYq4Y66YGy4fO3gQO+H35EPnHYfAioDenwnqGXEQABkFUkABrYgAHU8QwCgAFlIF0aRNFAHQAHcYPYK4+Wg6RYNATFENhJgzgQpDbFpQCxAWdNVhQnYnz3A9Tj5UQFjQmEwIYyjhGo2AOOkCDSBQkDgXAg82OeUZhNADohBXGiNWvEgN02VjFOklTaR6M9QFE8CVl8XD8LI5CSgqEwqnUWxUi8YhsO-YyKAc2hTKPFI9NArinNANy+WzbNGHQzCLOUAiiNqaybAaJp9O8mD4KIuSul0yTIAEiCfFQG8ggMLCznvb8lWqfL1KkyBhJ1VJ2M4mSivdQoGtXRg0guMp7mqO4mDiv8RVSjTIEvAbDOytZb03aryrq3JimzR99iYt8WO-NKMqYFz5lwW59i6h4yvVZZGGa94dqdYUemagAiedQAAQVzEhePnS77lbfsFQDHo0tozNi31O183NQikObfJSwdBtgekUGcyNeNIaImHGDesMB3NDC8O7IMwBR9tI2jOMAE5-x6IA).  
\________  
也见 [Playground](https://tsplay.dev/mpQJ6W) 。

## BTW | 多说一点

Actually, such pipeline form can be done with the `map` function of the language's own sequence type.  
\________  
其实这种形式用语言自己的序列类型的 `map` 功能就可以做到。

For Typescript, Array is that natived sequence. And while call the `map` method of it with parameter `console.log`, something more will messaged out, like:   
\________  
对于 Typescript ，原生的序列就是数组。它的数组的 `map` 在被传入 `console.log` 时会多输出一些信息，像这样：

~~~ ts
["xxx"].map(console.log); // "xxx",  0,  ["xxx"]

["ccc","aa","b",7].map(console.log); 
// "ccc",  0,  ["ccc", "aa", "b", 7]
// "aa",  1,  ["ccc", "aa", "b", 7]
// "b",  2,  ["ccc", "aa", "b", 7]
// 7,  3,  ["ccc", "aa", "b", 7]
~~~

Omit the more messages, it have no difference with just `console.log("xxx")`. The feature of these more message might happens while array's `map` or `forEach` act on the `console.log` function.  
\________  
除了多出来的信息，其余和直接 `console.log("xxx")` 没有区别。这应该是它和数组的 `map` 或 `forEach` 一起搭配时的特性。

And, for our case, we can play a pipe-like code like this:   
\________  
对于上面的示例，就是这样：

~~~ ts
[5]
    .map(x => x + 7)
    .map(x => "x" + x)
    .map(x => "?" + x)
    .map(console.log);

// console.log out: "?x12",  0,  ["?x12"]
~~~

Overall, it's actually a bit more elegant than my `pipeline` above. After all, even though it doesn't take up much more, my solution still holds some extra information (to save a result), whereas the array `map` does not.  
\________  
总的来说，它其实比我上面的 `pipeline` 要优雅一些的。虽然并不会多占用什么，但我毕竟也是额外保存了一些信息，而数组的 `map` 则并不会，所以后者其实更优雅。

But after all, what I'm going to be doing here is *relying almost solely on lexical closures to do almost everything*. That's why, I'm going to make a `pipeline` implementation myself (by *lexical closures*), even though I really only need to do a good job of currying to be able to pipeline programming by all means (such as this array's `map`).  
\________  
但毕竟，我要在这里做的事情就是 *几乎仅仅依靠词法闭包来做到几乎所有事情* 。这就是为什么，我要亲自做一个 `pipeline` 实现，即便我其实只需要做好柯里化，就能够用各种手段来实现管道化编程了。

See in [*playground*](https://www.typescriptlang.org/play?ssl=95&ssc=1&pln=90&pc=1#code/PTAEBMFMAdIO3AZwLACg0BcCetQDE5QAeAFQBpQAlAPlAF5QAKADwC5QSBKe2y0Abkw5IoAAoBDAJYAnYgAlI48BRJSANrQYBvUAAtF4dgqUUM69qslrQAXwFo0AYwD2cRBjFTZDNEWPLaRn0lIwNuOlpfSzUyQLMrC3VONHYJGT8DFXVNSNRQfNA0AqYdYMM9TNB4tXZq225xRE90-yyrWkF0LodUEFBoSVg1STgRKAAzEcgnV3d+wchh0fpickC2DnDaIkpYpnH2AlIKGi3m2UZGM-GWTm5Ls4GhqcYb5jvuTrQ+xwBXaWkWBGAHNQO4sGoRONnNJ2C43B4lOAVoxxOw4L8ALYAI0g0go2PRWNx0jO4lAAGpQNj7Kh4XMkSi0aAMTi8WdGISWcT2TxQOSqTSvt1emBEM4Zm5nJCAHRqZzAtCMIoFJ6LKZMACsyTyxQKqPAyMYAGZuNwZdUriq9UxGYwACxm0AW9RW3U2g1G7Wgc1lN2cfigH6zaWQOUK0DOX4YdgARgA7D0+jC0GqliJGNrrbbDUxTT7nZadcVPUxHQWXVY3SW7QA2J2VtTV-X00Ph4G+gxXQPBqWy+WgqMx0CxgAcPW+ICn05ns7n85nPWwuDVK2O6wsZx2e1ehzgxyo1DOfE69I8avYq4Y66YGy4fO3gQO+H35EPnHYfAioDenwnqGXEQABkFUkABrYgAHU8QwCgAFlIF0aRNFAHQAHcYPYK4+Wg6RYNATFENhJgzgQpDbFpQCxAWdNVhQnYnz3A9Tj5UQFjQmEwIYyjhGo2AOOkCDSBQkDgXAg82OeUZhNADohBXGiNWvEgN02VjFOklTaR6M9QFE8CVl8XD8LI5CSgqEwqnUWxUi8YhsO-YyKAc2hTKPFI9NArinNANy+WzbNGHQzCLOUAiiNqaybAaJp9O8mD4KIuSul0yTIAEiCfFQG8ggMLCznvb8lWqfL1KkyBhJ1VJ2M4mSivdQoGtXRg0guMp7mqO4mDiv8RVSjTIEvAbDOytZb03aryrq3JimzR99iYt8WO-NKMqYFz5lwW59i6h4yvVZZGGa94dqdYUemagAiedQAAQVzEhePnS77lbfsFQDHo0tozNi31O183NQikObfJSwdBtgekUGcyNeNIaImHGDesMB3NDC8O7IMwBR9tI2jOMAE4vuG37AuYPkKapeHnShpGKe-S7mEuylQBOmU6b+sGGdoS6AH4WapdnOcC3G0edDGMCx3txXewcCdAfnmFjAAmS6kwXTWte1kAegAbU1ABdbMOfEaAWEp1n4ZNzEzYtxnmdZ94bbtnnFYFp2udpu2xY+nscZDOX8eHJXVcuihQAABgjvXQ7V42ulj5hk8uw3TfN32O39xXk+ZiPo-yJOU4TtBY8ccvw8u8RxEr7Fw-jNPbYzwPUb9xq+ku8vHHD-IC9AMuK4oKua6HuuKAbydFernuRxjzvB6nkfFbH0AJ9FZeZ5Vueu574fd5Xte+njCPjW3he99Hnu1--NAgA).  
\________  
见 [Playground](https://tsplay.dev/w6VyEw) 。

## So, One more thing ...

One more elegant implementation. It's also a implement of the *CPS (Continuation Passing Style)*.  
\________  
还有一种更简洁的途径，即对于 CPS (Continuation Passing Style) 的实现。

> [*Continuations to programming are what Da Vinci Code is to human history: an amazing revelation of the greatest cover-up known to man. Well, may be not, but they're certainly revealing of deceit in the same sense as square roots of negative numbers.*](https://www.defmacro.org/2006/06/19/fp.html#Continuations)
> 

Such thing named *`Pipeyard`* is needed here:   
\________  
我们需要这样的效果：

~~~ ts
Pipeyard (5)
    (x => x + 7)
    (x => "x" + x)
    (x => "!?" + x)
    (console.log);
// want: console.log out: "?x12"
~~~

First, we need to type it:   
\________  
首先，归纳它的类型：

~~~ ts
type Pipeyard <T> = <R> (continuation: Fn<T, R>) => Pipeyard<R> ;
~~~

Then made it by change the *`pipeline`* codes.  
\________  
然后基于前面有的 *`Pipeline`* 更改一下实现。

And you might see, This code is okay:   
\________  
你会发现，这样就可以：

~~~ ts
const Pipeyard = 
<T,> (x: T)
: Pipeyard<T> => 
    
    (pipe (x)) as Pipeyard <T> ;
~~~

The `<R> (f: Fn<T, R>): R => pipe (x) (f)` is `pipe (x)`, obviously.  
\________  
因为 `<R> (f: Fn<T, R>): R => pipe (x) (f)` 显然就是 `pipe (x)` 。

And if you try the codes be aimed by us now, you will see no error by the *static type system*, but it's actually wrong and will out a runtime-error while you run it.  
\________  
这时如果尝试一下那个我们想要的效果，你会发现，静态类型分析根本不会认为有任何错误。但这样其实是有问题的，问题会在运行时体现出来。

Reason is simple. You can read such overly simple definition for the `Pipeyard` carefully, and you will know, all `Pipeyard (x)` in fact is just same as `pipe (x)`. So, that's why it is wrong, we didn't add any thing new here.  
\________  
其实理由很简单。根据上面那个过分简洁的 `Pipeyard` 的定义，所有的 `Pipeyard (x)` 都可被化简为 `pipe (x)` 。这个小家伙能确保的只是再多传一个参数，而我们也当然并未引入任何新的东西，所以该出错的地方当然要出错。

An accidental discovery of a cut between a static and a dynamic language system, right? So, let's change that overly simple definition.  
\________  
意外发现了一个静态语言系统与动态语言系统之间的割裂，不是吗？让我们继续。

It is simple to make the change. Just change `pipe (x)` to `<R> (continuation: Fn<T, R>): R => pipe (x) (continuation)` at first, then change the `: R` be `: Pipeyard<R>` and add recursion to `continuation(x)` so get a `Pipeyard(continuation(x))` (same as `pipe (continuation(x)) (Pipeyard)`), the static type system have no complain, then you get the result:   
\________  
要改掉原来的定义很容易。只需要把 `pipe (x)` 换回 `<R> (continuation: Fn<T, R>): R => pipe (x) (continuation)` ，然后把这部分的返回类型标记 `R` 改为正确的 `Pipeyard<R>` 得到 `<R> (continuation: Fn<T, R>): Pipeyard<R> => continuation(x)` ，然后对 `continuation(x)` 增加递归的要素 `Pipeyard(continuation(x))` ，看到静态类型分析没有问题，最终结果就有了：

~~~ ts
const Pipeyard = 
<T,> (head: T)
: Pipeyard<T> => 
    
    ( <R,> (continuation: Fn<T, R>)
    : Pipeyard<R> => 
        
        pipe (continuation(head)) (Pipeyard)
    
    ) as Pipeyard <T> ;
~~~

(The closure in JS/TS is not serious enough. Under the normal, we must write a recursion by Y-combinator or other similar things. While in OCaml, all function are closures (means it's none-named and first-classed function), that's why the recursion function define must be add a `rec` keywork, it shall add the necessary combinator codes while the parser parse your code as no-sugar code which is all only closures that helps you to write a recursion function easily .)  
\________  
（JS/TS 的闭包不是那么严格。正常情况下，闭包要做到递归，必须依靠 Y 组合子或其变体。 OCaml 中一切函数都是闭包，这也就是为何定义递归函数时需要加一个 `rec` 关键字，这会让编译器在将代码转换成闭包代码的时候帮你补上必要的组合子代码。）

Then you can run this:   
\________  
然后你就能这样干了：

~~~ ts
Pipeyard (5)
    (x => x + 7)
    (x => "x" + x)
    (x => "!?" + x)
    (console.log);
// console.log out: "!?x12"
~~~

The *Continuation Passing Style* Programming is just indicate a way to go for a value just like that `Pipeyard` use case. But, the `Pipeyard` is just a mork for the *CPS* cause it is not a value gives to a function actually.  
\________  
一般而言，续程（ *Continuations* ）风格的编程就是像这样在一个表达式或者值后面直接指定它的去处。上面的实现只是对这一风格的模拟，因为毕竟如果没有最后的 `(console.log)` 的话，也没太多方便的办法来看到在 `Pipeyard` 这个盒子里的值究竟变成啥了。

So, It's not really a pipeline. Even its definition or usage both much more concise than the `Pipeline`, and also elegant enough means won't do anything extra even it's just a little (the `Pipework` returns by `Pipeline` is a pair of value not a single). But, here's JS/TS, which have enough convenience with enough chaos, that ensure you can do some VERY un-elegant **chaos** and **crude** things (which means broke the pure functional principles) to get the value inside a `Pipeyard` box, and here is a sealed case to do that things:   
\________  
因而，它也不完全是个合适的管道。虽然用起来和实现起来都比之前的 `Pipeline` 要简洁得很，运行中也不会有什么多余的东西（指 `Pipeline` 返回的 `Pipework` 不是一个值而是一对值）。但，这里毕竟是便捷又混乱的 JS/TS ，你总是仍然可以用一种很**粗俗**的办法，来违背纯函数约定地拿到盒子里面的值。下面就是对这个粗糙方案的封装：

~~~ ts
Pipeyard.BROADCAST = 
<T,> (self: Pipeyard<T>)
: T => 
{
    let over: T = {} as T;
    self (x => over = x);
    return over ;
} ;
~~~

To be honest, this function is still a *pure* function, only not *purely* enough means its implementation also all pure that can only include clearly mathematical expressions.  
\________  
其实这个函数本身仍然算是纯的，只不过它在实现时用上了不纯的手法从而使得它的定义也就不再是简洁的数学表达式了。

You can use it like that to get the value inside our `Pipeyard` boxes:   
\________  
像这样去用它，就能够取出一个 `Pipeyard` 中的值了：

~~~ ts
console.log
( Pipeyard.BROADCAST 
( Pipeyard (5)
    (x => x + 7)
    (x => "x" + x)
    (x => "??" + x) ) 
); // console.log out: "??x12"
~~~

See full code in [*playground*](https://www.typescriptlang.org/play?#code/PTAEBMFMAdIO3AZwLACg0BcCetQDE5QAeAFQBpQAlAPlAF5QAKADwC5QSBKe2y0AbjSYckUNACWuBqTK0W7Lj2KVZTAGbsCMqtW51eAtAGMA9nEQYxkyOwlTi5OWw57aRFXI3442mp3Z8+qBqLNyC6KggUdExsXHxsUIRdqKMAETxoAAK1qAAmgCGAE7goPFp3Iym5iYANpAAdLUmAOac4cK4ObBYxaWktNIeTNUY4nAArgVjZpo+5Dqu2da9Je60HajVFss9ffSgaDJyABaQBeAKnGjs3ZCr4ANKaKCvh6hvTMqqVWZjk9NxLNvL5dC83rcVn11s8Pp83uD4VZcL84P8pjM4IwzhdOJU7g9uNwCohdvd9k9NiBQEUJnA0AT9owAKzXOGvFhKZigADUoAA7GzPpygmlmGleaBmEK3iLaGkAIQAfglfOliJGZkQdUazTa-DKYG2OqarVAJgmGHYaSVzAAjAAmNJJNApJgZOKgABClAA8gBBAAiAGF-QBlEiG2IVTU1eqm-VJRklBo+gMh8ORhhHRxMRCQWpeZOPEhg1AKWEAbw19UsJgAbpAihWGJWAL6gEkccKffOFpjcoINpsHaU9t5FSAYCZFQjDoqGVAdqlgWn0rZak16tCMZGiHdkh5MVkauVSyWC0+D+XiyXq9kDpQ2hWqqVE96MYupv1B0MRombK6uTpJkACyBTQGSUYxDGqLavGertEkADazIALoag0AC2EFntyfKXg+2G4deoBiq+96fMR0BnmkAB+FEyq81FwVurTtIaoDGghZoWlaZG2o6aQUKAAAMInITa9pOhhESScwClpGhLHcbq7EGtSYqKSJ4mvPJimyWgklGCZwlpAUBRmQARsJdqiXayk4TRqkJhxaCaSZRjCa8umgMZpkUOZlmBTZFB2Q57lgEF3mgHaElpJ53nRSF3nhbJmmha8DrxYlgUWUlmVpZFsX2SJADMOUBWR+UpWF9mGagQA).
\________  
完整代码见 [Playground](https://tsplay.dev/WGX1vw) 。



